import { Avatar, Grid, List, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

import { Dropzone } from "../../../../../../components";
import { THEME } from "../../../../../../theme";

export const Container = styled(Grid)({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledDropzone = styled(Dropzone)({
  width: "23rem",
  height: "5rem",
});

export const StyledList = styled(List)({
  width: "100%",
  maxHeight: "18.75rem",
  overflow: "auto",
});

export const TextList = styled(ListItemText)({
  display: "inline",
  cursor: "pointer",
});

export const CircularProgressCell = styled(Grid)({
  alignItems: "center",
  justifyContent: "end",
});

export const StyledAvatar = styled(Avatar)({
  backgroundColor: THEME.COLORS.PRIMARY,
});
