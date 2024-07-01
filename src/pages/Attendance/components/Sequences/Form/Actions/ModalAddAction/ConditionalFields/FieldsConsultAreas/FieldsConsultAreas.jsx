import { useQuery } from "@tanstack/react-query";

import { get } from "../../../../../../../../../utils/api";
import { StyledSelectActionReference } from "../styles";

export const FieldsConsultAreas = () => {
  const { data: areas, isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: () => get("/area/listar"),
  });

  return (
    <StyledSelectActionReference
      label="Áreas"
      options={areas}
      isLoading={isLoading}
    />
  );
};
