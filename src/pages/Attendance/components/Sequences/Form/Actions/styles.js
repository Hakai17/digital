import {
  Paper,
  TableRow as MUITableRow,
  TableContainer as MUITableContainer,
  Grid,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Paper)({
  width: "100%",
  overflow: "hidden",
  borderRadius: "10px",
});

export const TableContainer = styled(MUITableContainer)({
  maxHeight: "27.5rem",
});

export const RowActions = styled(TableCell)({
  display: "flex",
  height: "100%",
  position: "absolute",
  justifyContent: "flex-end",
  alignItems: "center",
  right: 4,
  backgroundColor: "#FFFFFF",
  visibility: "hidden",
  transition: "visibility 0s, background-color 0.2s linear",
});

export const TableRow = styled(MUITableRow)({
  position: "relative",
  transition: "background-color 0.2s linear",

  "&:hover": {
    "& .MuiTableCell-root:last-child": {
      visibility: "visible",
      backgroundColor: "#F5F5F5",
    },
  },
});

export const TableActions = styled(Grid)({
  justifyContent: "center",
  marginTop: "1rem",
});
