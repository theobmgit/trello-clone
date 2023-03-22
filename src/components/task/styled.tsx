import styled from "styled-components";
import theme from "../../utils/theme";

export const STaskItemBase = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  width: 100%;
  color: ${theme.palette.text.dark};
`;

export const STaskItem = styled(STaskItemBase)`
  border-radius: ${theme.borderRadius.default};
  background: ${theme.palette.default};
  padding: 1rem;
  cursor: pointer;
`;

export const STaskList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const STaskItemToolBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const STaskTitle = styled.span`
  width: 100%;
  word-break: break-word;
`;
