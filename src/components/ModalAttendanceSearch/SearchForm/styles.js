import { RadioGroup } from "@mui/material";
import styled from "styled-components";

export const RadiosContainer = styled(RadioGroup)`
  display: flex;
  flex-direction: row !important;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const QuestionContainer = styled.div`
  margin-bottom: 1rem;
`;
