import Search from '../components/Search';
import LatestReleases from '../components/LatestReleases';
import styled from 'styled-components';

const AppContainer = styled.div` 
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #002F52 35%, #326589);
`;

function Home() {
  return (
    <AppContainer>
      <Search />
      <LatestReleases />
    </AppContainer>
  );
}

export default Home;
