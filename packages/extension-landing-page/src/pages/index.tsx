import styled from "styled-components";

const Main = styled.main``;
const H1 = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const Home = () => {
  return (
    <>
      <Main>
        <H1>Hello world</H1>
      </Main>
    </>
  );
};

export default Home;
