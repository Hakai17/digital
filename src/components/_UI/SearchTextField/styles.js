import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  border: "1px solid rgba(0,0,0,0.2)",
  padding: "2px 4px",
  borderRadius: "4px",

  "&:hover": {
    border: "1px solid",
  },
});

export const Input = styled(InputBase)({
  ml: 1,
  flex: 1,
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
