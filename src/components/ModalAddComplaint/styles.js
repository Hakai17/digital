import {
  Box,
  DialogActions,
  Grid,
  List,
  ListItemText,
  TextField as MUITextField,
} from "@mui/material";
import { styled as styledMUI } from "@mui/system";
import styled from "styled-components";

import { Dropzone } from "../../components";

export const StyledDialogActions = styled(DialogActions)`
  display: flex;
  align-items: left;
  justify-content: space-between;
  text-align: start;
`;
export const TabContent = styled(Box)`
  width: 100%;
`;
export const TextField = styled(MUITextField)({
  marginBottom: "1rem",
});

export const Container = styledMUI(Grid)({
  width: "100%",
  alignItems: "start",
  justifyContent: "start",
});

export const StyledDropzone = styledMUI(Dropzone)({
  width: "23rem",
  height: "5rem",
});

export const StyledList = styledMUI(List)({
  width: "100%",
  maxHeight: "18.75rem",
  overflow: "auto",
});

export const TextList = styledMUI(ListItemText)({
  display: "inline",
});

export const CircularProgressCell = styledMUI(Grid)({
  alignItems: "center",
  justifyContent: "end",
});
