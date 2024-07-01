import { useQuery } from "@tanstack/react-query";

import { get } from "../../../../../../../../../utils/api";
import { StyledSelectActionReference } from "../styles";

export const FieldsConsultProfessional = () => {
  const { data: professionals, isLoading } = useQuery({
    queryKey: ["professionals"],
    queryFn: () => get("/profissional/listar"),
  });

  return (
    <StyledSelectActionReference
      label="Selecionar profissional"
      options={professionals}
      isLoading={isLoading}
    />
  );
};
