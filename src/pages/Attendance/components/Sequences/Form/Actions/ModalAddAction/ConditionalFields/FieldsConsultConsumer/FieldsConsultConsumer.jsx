import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import { post } from "../../../../../../../../../utils/api";
import { StyledSelectActionReference } from "../styles";

export const FieldsConsultConsumer = () => {
  const { setFieldValue } = useFormikContext();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => post("/usuario/listar"),
  });

  return (
    <StyledSelectActionReference
      label="Usuários"
      options={users}
      isLoading={isLoading}
      onChange={e => {
        setFieldValue("referenciaAcao", e.target.value);
        setFieldValue("usuarioRecebimento", e.target.value);
      }}
    />
  );
};
