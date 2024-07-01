import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";

import { get } from "../../../../../../../../../utils/api";
import { StyledSelectActionReference } from "../styles";
import { TextField } from "./styles";

export const FieldsTriggerAgency = () => {
  const { data: agencies, isLoading } = useQuery({
    queryKey: ["agency"],
    queryFn: () => get("/agencia/listar"),
  });

  return (
    <>
      <StyledSelectActionReference
        label="Agências"
        options={agencies}
        isLoading={isLoading}
      />

      <Field
        name="observacaoAcaoContato"
        multiline
        label="Ficha Ressarcimento"
        component={TextField}
        rows={4}
      />
    </>
  );
};
