import {
  Box,
  TableBody,
  TableContainer as TableContainerMUI,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

export const Container = styled(Box)`
  width: 100%;
  border: 1px solid ${grey[300]};
  border-radius: 10;
`;

export const TableContainer = styled(TableContainerMUI)`
  max-height: 92vh;
`;

export const ActionRow = styled(TableRow)`
  cursor: pointer;
  height: 10%;
`;

export const Body = styled(TableBody)`
  min-height: 20rem;
  overflow-y: auto;
`;
