import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import { FormikSelectField } from "../../../../components/_UI/FormikTextField/FormikSelectField";
import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import { get } from "../../../../utils/api";

export const FieldsSearchManifestation = () => {
  const { data: manifestations, isLoading } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  return (
    <>
      <Field
        component={FormikTextFieldSmall}
        size="small"
        label="Descricao"
        name="descricao"
      />
      <Field
        name="manifestacaoId"
        label="Manifestação"
        component={FormikSelectField}
        options={manifestations}
        isLoading={isLoading}
        size="small"
      />
    </>
  );
};
