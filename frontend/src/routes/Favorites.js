import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFavorites, deleteFavorite } from "../../src/services/favorite";

import HeartRed from "../images/heart-red.svg";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Result = styled.div`
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
    width: 100px;
    transition: transform 0.3s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1);
  }
  &:hover {
    border: 1px solid white;
  }
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

const Title = styled.h2`
  color: #000;
  font-size: 36px;
  text-align: center;
  width: 100%;
  padding-top: 35px;
`;

const Message = styled.p`
  color: green;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchFavorites() {
    try {
      const favoritesFromAPI = await getFavorites();
      setFavorites(favoritesFromAPI);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      alert("Error fetching favorites. Check the console for details.");
    }
  }

  async function handleDeleteFavorite(id) {
    try {
      await deleteFavorite(id);
      setMessage(`Book deleted from your favorites!`);
      fetchFavorites();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting favorite:", error);
      alert("Error deleting favorite. Check the console for details.");
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <AppContainer>
      <Title>Here are your favorite books:</Title>
      {message && <Message>{message}</Message>}
      <ResultContainer>
        {favorites.length !== 0 ? (
          favorites.map((favorite) => (
            <Result key={favorite.id}>
              <p>{favorite.name}</p>
              <img
                src={`http://localhost:8000${favorite.image}`}
                alt={`Cover of the book ${favorite.name}`}
              />
              <p>{favorite.author}</p>
              <HeartButton onClick={() => handleDeleteFavorite(favorite.id)}>
                <img
                  src={HeartRed}
                  alt={`Heart icon to remove ${favorite.name} from favorites`}
                />
              </HeartButton>
            </Result>
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </ResultContainer>
    </AppContainer>
  );
}

export default Favorites;
