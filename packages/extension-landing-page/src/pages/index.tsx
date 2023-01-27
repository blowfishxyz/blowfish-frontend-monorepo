import styled from "styled-components";
import { Footer } from "../components/footer";
import { Stats } from "../components/stats";
import { Hero } from "../components/hero";

const Main = styled.main`
  max-width: 1280px;
  margin: auto;
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
