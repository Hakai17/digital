import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import { Field } from "formik";

export const FieldsSearchManifestation = () => {
  return (
    <>
      <Field
        component={FormikTextFieldSmall}
        size="small"
        label="Descricao"
        name="descricao"
      />
    </>
  );
};
