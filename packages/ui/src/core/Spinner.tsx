import React from "react";
import { keyframes, styled } from "styled-components";

export const Spinner = React.memo(() => {
  return <Base />;
});

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Base = styled.div`
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: ${rotate} 1s linear infinite;
`;
