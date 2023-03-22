import styled from "styled-components";
import theme from "../../utils/theme";

export const SBoardList = styled.div`
  display: flex;
  column-gap: 2rem;
`;

export const SBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background: ${theme.palette.secondary};
  border-radius: ${theme.borderRadius.default};
  padding: 1rem;
  width: 20rem;
  height: fit-content;
  color: ${theme.palette.text.dark};
`;

export const SBoardItemEmpty = styled(SBoardItem)`
`;

export const SBoardItemTitle = styled.h2`
  font-weight: bold;
`;
