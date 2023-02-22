import styled, {StyledComponent} from "@emotion/styled";

export const Title: StyledComponent<any> = styled.h3`
  font-weight: 700;
  border: 2px solid inherit;
  background-color: #f2f2f2;
  color: darkslategray;
  padding: 1rem 2rem;
  align-items: normal;
  align-self: center;
  text-align: left;
  position: sticky;
  top: 5px;
  z-index: 1;
`