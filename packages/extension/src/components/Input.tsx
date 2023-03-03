import styled from "styled-components";

export const Input = styled.input<{ error?: boolean; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || "16px"};
  outline: none;
  flex: 1 1 auto;
  background-color: white;
  transition: color 300ms ${({ error }) => (error ? "step-end" : "step-start")};
  color: ${({ theme }) => theme.palette.black};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.palette.red : theme.palette.gray)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  padding: 0px;
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
