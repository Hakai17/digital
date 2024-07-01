import { styled } from "@mui/system";
import { TextField } from "formik-mui";

export const FormikTextField = styled(TextField)({
  width: "100%",
  marginBottom: "8px",
});
export const FormikNumberField = styled(TextField)({
  width: "100%",
  marginBottom: "8px",
  "& input[type=number]": {
    "-moz-appearance": "textfield",
    appearance: "textfield",
    width: "100%",
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      appearance: "none",
      margin: 0,
    },
  },
});
export const FormikTextFieldSmall = styled(TextField)({
  width: "100%",
  marginBottom: "3px",
});
