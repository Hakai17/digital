import { Box, Grid } from "@mui/material";
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
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1rem;
  padding: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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

export const Container = styled(Grid)({
  alignItems: "center",
  marginTop: "2rem",
  backgroundColor: "#D0DCEE",
  borderRadius: "10px",
  padding: "1rem",
});

export const Section = styled(Grid)({
  width: "100%",
  marginTop: "1rem",
});

export const IndicatorsContainer = styled(Grid)({
  justifyContent: "space-between",
});

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;
