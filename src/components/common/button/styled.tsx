import styled from "styled-components";
import theme from "../../../utils/theme";

export const SButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
  transition: 0.2s;

  :hover {
    opacity: 80%;
  }

  :disabled {
    opacity: 50%;
    cursor: default;
  }
`;

export const SDefaultButton = styled(SButton)`
  color: ${theme.palette.text.dark};
`;

export const SPrimaryButton = styled(SButton)`
  border: 1px solid ${theme.palette.primary};
  background: ${theme.palette.primary};
  color: ${theme.palette.text.light};
`;

export const SSuccessButton = styled(SButton)`
  border: 1px solid ${theme.palette.success};
  background: ${theme.palette.success};
  color: ${theme.palette.text.light};
`;

export const SErrorButton = styled(SButton)`
  border: 1px solid ${theme.palette.error};
  color: ${theme.palette.error};

  :hover {
    background: ${theme.palette.error};
    color: ${theme.palette.text.light};
  }
`;

export const SIconButton = styled(SButton)`
  padding: 0.25rem;
  border-radius: ${theme.borderRadius.sm};
  opacity: 80%;
  transition: 0.1s;

  :hover {
    opacity: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
