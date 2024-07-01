import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";

import { FormikSelectField } from "../../../../../../../components";
import { get } from "../../../../../../../utils/api";
import { initialValuesActionContact } from "../../../../../constants";

export const SelectAction = () => {
  const { setFieldValue, resetForm } = useFormikContext();

  const { data: actions, isLoading } = useQuery({
    queryKey: ["actions"],
    queryFn: () => get("/acao/listar?somenteAtivo=true"),
  });

  const handleChangeAction = event => {
    resetForm({
      values: initialValuesActionContact,
    });
    setFieldValue("acaoId", event.target.value);
  };

  return (
    <Field
      name="acaoId"
      component={FormikSelectField}
      label="Selecione o tipo de ação"
      onChange={handleChangeAction}
      options={actions}
      isLoading={isLoading}
    />
  );
};
