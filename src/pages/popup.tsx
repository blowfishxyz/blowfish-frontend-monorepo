import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ResultContainer = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Popup: React.FC = () => {
  return (
    <ResultContainer>
      <H1>🐡 Blowfish 🐡</H1>
      <CenterContainer>
        <P>Blowfish protection enabled</P>
      </CenterContainer>
    </ResultContainer>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<Popup />);
