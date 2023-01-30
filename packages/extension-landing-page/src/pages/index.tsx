import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Stats } from "../components/Stats";
import { Hero } from "../components/Hero";

const Main = styled.main`
  max-width: 1280px;
  margin: auto;
  padding: 0 24px;
`;

const Home = () => {
  return (
    <>
      <Main>
        <Hero />
        <Stats />
        <Footer />
      </Main>
    </>
  );
};

export default Home;
