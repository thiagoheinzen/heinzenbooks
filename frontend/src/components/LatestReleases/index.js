import { books } from "./latestReleasesData";
import { Title } from "../Title";
import RecommendCard from "../RecommendCard";
import bookImage from "../../images/book9.jpg";
import styled from "styled-components";

const LatestReleasesContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  background-color: #fff;
`;

const NewBooksContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  gap: 10px;
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
`;

function LatestReleases() {
  return (
    <LatestReleasesContainer>
      <Title color="#4280d8" fontSize="36px">
        LATEST RELEASES
      </Title>
      <NewBooksContainer>
        {books.map((book) => (
          <img src={book.src} alt="Book" key={book.id} />
        ))}
      </NewBooksContainer>
      <RecommendCard
        title="You Might Be Interested In"
        subtitle="The Colossus of Maroussi"
        description="A vibrant narrative by Henry Miller about his travels in Greece, full of reflections and cultural observations."
        img={bookImage}
      />
    </LatestReleasesContainer>
  );
}

export default LatestReleases;
