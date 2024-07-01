import { Form, Formik } from "formik";
import styled from "styled-components";

export const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: column;
  padding: 2rem;
`;

export const StyledFormik = styled(Formik)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  max-width: 60rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;
