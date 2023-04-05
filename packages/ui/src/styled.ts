import * as styledImport from "styled-components";

const defaultStyled =
  typeof styledImport === "function" ? styledImport : styledImport.default;

export { defaultStyled };
