import type {StyledComponent} from "@emotion/styled";

import styled from "@emotion/styled"

export const PersonalInfo: StyledComponent<any> = styled.h5`
  display: flex;
  flex-direction: column;
  gap:5px;
  Font-family: Consolas, monaco, monospace;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 1.5rem;
  background-color: #f2f2f2;
  align-items: center;
  align-self: center;
`