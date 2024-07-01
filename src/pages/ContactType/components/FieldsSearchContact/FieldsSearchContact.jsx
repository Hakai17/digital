import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import { Field } from "formik";

export const FieldsSearchContact = () => {
  return (
    <>
      <Field
        component={FormikTextFieldSmall}
        size="small"
        label="Código"
        name="id"
      />
      <Field
        component={FormikTextFieldSmall}
        size="small"
        label="Descricao"
        name="descricao"
      />
    </>
  );
};
