import React from 'react';
import styled from "styled-components";

const InputComponent = React.forwardRef<HTMLInputElement, { error?: boolean; fontSize?: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ error, fontSize, ...props }, ref) => (
    <input ref={ref} {...props} />
  )
);

export const Input = styled(InputComponent)`
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
  width: calc(100% - 32px);
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
