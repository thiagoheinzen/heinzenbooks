import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { genres } from "./data";
import { getBooks } from "../../services/books";
import { postFavorite } from "../../services/favorite";
import HeartWhite from "../../images/heart-white.svg";
import HeartRed from "../../images/heart-red.svg";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h2`
  color: #000;
  font-size: 36px;
  padding-top: 20px;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

const GenreButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #d0d0d0;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2%;
  margin: 2%;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  position: relative;

  p {
    width: 200px;
    color: #000;
    margin: 8px;
  }

  img {
    width: 100px;
    transition: transform 0.3s ease-in-out;
  }

  &:hover img {
    transform: scale(1.1);
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

function Categories() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const aboutRef = useRef(null);
  const [books, setBooks] = useState([]);

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

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    const filtered = books.filter((book) => book.genre === genre);
    setFilteredBooks(filtered);
  };

  const addToFavorites = async (book) => {
    try {
      if (!favorites.includes(book.id)) {
        await postFavorite(book.id);
        setFavorites([...favorites, book.id]);
        setMessage(`Book added to favorites!`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      setMessage("Error adding to favorites.");
    }
  };

  const isFavorited = (id) => favorites.includes(id);

  const handleAboutClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <AppContainer>
      <Title>Select a category:</Title>
      <Genres>
        {genres.map((genre) => (
          <GenreButton key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </GenreButton>
        ))}
      </Genres>
      {selectedBook && (
        <AboutContainer ref={aboutRef}>
          <h3>{selectedBook.name}</h3>
          <p>{selectedBook.about}</p>
        </AboutContainer>
      )}
      {message && <p>{message}</p>}
      <ResultContainer>
        {filteredBooks.length > 0
          ? filteredBooks.map((book) => (
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
                <HeartButton onClick={() => addToFavorites(book)}>
                  <img
                    src={isFavorited(book.id) ? HeartRed : HeartWhite}
                    alt={`Heart icon for ${book.name}`}
                  />
                </HeartButton>
              </Result>
            ))
          : selectedGenre && <p>No books found for {selectedGenre}</p>}
      </ResultContainer>
    </AppContainer>
  );
}

export default Categories;
