import { Box } from "@mui/material";
import { Formik } from "formik";
import styled from "styled-components";

export const StyledFormik = styled(Formik)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1rem;
  padding: 1rem;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 1rem;
`;

export const TabContent = styled(Box)`
  width: 100%;
`;
