import { Form } from "formik";
import styled from "styled-components";
import { IconButton } from "../_UI/IconButton/IconButton";
import { ModalContent } from "../_UI/Modal/Modal";

export const StyledModalContent = styled(ModalContent)`
  min-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StyledIconButton = styled(IconButton)`
  top: 1rem;
  right: 1rem;
`;
