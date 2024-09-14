import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { getBooks } from "../../services/books";
import { postFavorite } from "../../services/favorite";
import Input from "../Input";

import HeartWhite from "../../images/heart-white.svg";
import HeartRed from "../../images/heart-red.svg";

const SearchContainer = styled.section`
  background-color: #fff;
  color: #000;
  text-align: center;
  padding: 85px 0;
  width: 100%;
  min-height: 300px;
`;

const Title = styled.h2`
  color: #000;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const Subtitle = styled.h3`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Result = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  p {
    width: 200px;
    color: #000;
  }
  img {
    width: 110px;
    transition: transform 0.3s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1);
  }
  &:hover {
    border: 1px solid white;
  }

  &:hover button {
    opacity: 1;
  }
`;

const AboutButton = styled.button`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 16px;
  background-color: #4280d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 24px;
  &:focus {
    outline: none;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

const Button = styled.button`
  background-color: #4280d8;
  color: #fff;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 10px;
  &:hover {
    background-color: #4280c8;
  }
`;

const Message = styled.p`
  color: green;
  margin-top: 20px;
  font-size: 16px;
`;

const AboutContainer = styled.div`
  text-align: start;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: slideIn 0.5s ease-in-out;

  h3 {
    text-align: center;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function Search() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    fetchBooks();

    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setSelectedBook(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function fetchBooks() {
    try {
      const booksFromAPI = await getBooks();
      setBooks(booksFromAPI);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Error fetching books. Check the console for details.");
    }
  }

  async function addToFavorites(id) {
    try {
      await postFavorite(id);
      setFavorites([...favorites, id]);
      setMessage(`Book added to favorites!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Error adding to favorites. Check the console for details.");
    }
  }

  const handleSearch = () => {
    const searchResult = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedBooks(searchResult);
  };

  const isFavorited = (id) => favorites.includes(id);

  const handleAboutClick = (book) => {
    setSelectedBook(book);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <Title>Ready to start?</Title>
      <Subtitle>Find your next read in our collection.</Subtitle>
      <Input
        placeholder="Search by book name or author"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>Search</Button>
      {message && <Message>{message}</Message>}
      {selectedBook && (
        <AboutContainer ref={aboutRef}>
          <h3>{selectedBook.name}</h3>
          <p>{selectedBook.about}</p>
        </AboutContainer>
      )}
      <ResultContainer>
        {searchedBooks.map((book) => (
          <Result key={book.id}>
            <p>
              <strong>{book.name}</strong>
              <br></br>by {book.author}
            </p>
            <img
              src={`http://localhost:8000${book.image}`}
              alt={`Cover of the book ${book.name}`}
            />
            <AboutButton onClick={() => handleAboutClick(book)}>
              Learn more
            </AboutButton>
            <HeartButton onClick={() => addToFavorites(book.id)}>
              <img
                src={isFavorited(book.id) ? HeartRed : HeartWhite}
                alt={`Heart icon for ${book.name}`}
              />
            </HeartButton>
          </Result>
        ))}
      </ResultContainer>
    </SearchContainer>
  );
}

export default Search;
