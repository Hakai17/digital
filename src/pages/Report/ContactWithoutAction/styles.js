import styled from "styled-components";
import { THEME } from "../../../theme";
import { Field as FieldFormik } from "formik";
import { DatePicker as DatePickerCustom } from "@mui/x-date-pickers";

export const Container = styled.div`
  max-width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 5rem;
  margin-left: 1rem;
`;

export const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FlexTitle = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Fields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
`;

export const Field = styled(FieldFormik)`
  margin-bottom: 0px !important;
  width: 20% !important;
`;

export const DatePicker = styled(DatePickerCustom)`
  width: 15% !important;
`;

export const Title = styled.h1`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
  margin-bottom: 0.3rem; /* Adiciona um espaço abaixo do título */
`;
