import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Form as FormikForm } from "formik";
import { TextField as TextFieldFormik } from "formik-mui";
import img from "/assets/images/Background.jpeg";

export const Container = styled(Grid)({
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${img})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const Box = styled(Grid)({
  height: "25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: "10px",
});

export const Form = styled(FormikForm)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1rem",
});

export const TextField = styled(TextFieldFormik)({
  marginBottom: "1rem",
});

export const Title = styled(Typography)({
  marginBottom: "1rem",
});
