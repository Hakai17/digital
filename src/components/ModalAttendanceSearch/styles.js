import styled from "styled-components";
import { ModalContent } from "../_UI/Modal/Modal";

export const StyledModalContent = styled(ModalContent)`
  min-height: 40rem;
  min-width: 60rem;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  padding: 1rem;
  max-height: 70vh;
  overflow: auto;
`;
