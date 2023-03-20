import styled from "styled-components";

export const Input = styled.input<{ error?: boolean; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || "16px"};
  outline: none;
  flex: 1 1 auto;
  background-color: white;
  color: ${({ theme }) => theme.palette.black};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.palette.red : theme.palette.border)};
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  padding: 0 16px;
  width: 100%;
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
