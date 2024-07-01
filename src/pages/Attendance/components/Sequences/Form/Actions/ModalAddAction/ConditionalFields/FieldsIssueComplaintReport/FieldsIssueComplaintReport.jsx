import { Field } from "formik";
import { TextField } from "./styles";

export const FieldsIssueComplaintReport = ({ actionName }) => {
  return (
    <Field
      name="observacaoAcaoContato"
      multiline
      label={actionName || ""}
      component={TextField}
      rows={4}
    />
  );
};
