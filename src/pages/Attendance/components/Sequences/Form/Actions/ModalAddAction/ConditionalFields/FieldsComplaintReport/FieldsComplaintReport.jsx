import { Field } from "formik";

import { validateField } from "../../../../../../../useAttendance";
import { TextField } from "./styles";

export const FieldsIssueComplaintReport = () => {
  return (
    <Field
      required
      name="observacaoAcaoContato"
      multiline
      label="Relatório"
      component={TextField}
      rows={4}
      validate={validateField}
    />
  );
};
