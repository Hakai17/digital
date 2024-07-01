import { styled } from "@mui/system";

import { FormControlLabel } from "@mui/material";
import {
  FormikSelectField,
  SelectField as MUISelectField,
} from "../../../../../../../../components";
import { SelectActionReference } from "../SelectActionReference";

export const StyledSelectActionReference = styled(SelectActionReference)({
  marginTop: "1rem",
});

export const SelectField = styled(FormikSelectField)({
  marginTop: "1rem",
});

export const SelectFieldWithoutFormik = styled(MUISelectField)({
  marginTop: "1rem",
});

export const ControlLabel = styled(FormControlLabel)({
  marginTop: "1rem",
});
