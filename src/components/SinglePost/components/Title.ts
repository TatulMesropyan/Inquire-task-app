import styled, {StyledComponent} from "@emotion/styled";

export const Title: StyledComponent<any> = styled.h3`
  display: flex;
  font-weight: 700;
  border: 2px solid inherit;
  font-family: Consolas, monaco, monospace;
  background-color: #f2f2f2;
  color: darkslategray;
  padding: 2rem;
  align-items: normal;
  align-self: center;
  text-align: left;
  position: sticky;
  position: -webkit-sticky;
  top: 5px;
  z-index: 1;
`