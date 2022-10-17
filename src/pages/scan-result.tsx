import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

const ResultContainer = styled.div``;

const ScanResult: React.FC = () => {
  return <ResultContainer>ScanResult</ResultContainer>;
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<ScanResult />);
