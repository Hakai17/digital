import { Box, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import styled from "styled-components";
import {
  Accordion,
  FormikSelectField,
  FormikTextField,
} from "../../../../components";
import { THEME } from "../../../../theme";

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

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
`;

export const TableContainer = styled.div`
  height: 20rem;
  width: 100%;
`;

export const TabContent = styled(Box)`
  width: 100%;
`;

export const TabFooter = styled(Box)`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 1rem;
`;

export const HalfSelectField = styled(FormikSelectField)`
  width: 50%;
`;

export const DateTextField = styled(TextField)`
  margin-bottom: 8px;
`;

export const SmallTextField = styled(FormikTextField)`
  width: 10% !important;
`;

export const AlmostLargeTextField = styled(FormikTextField)`
  width: 90% !important;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;
