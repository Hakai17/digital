import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { SelectComplemento } from "../../../../components/FieldsSearchManifestation/SelectComplemento";
import { SelectManifestation } from "../../../../components/FieldsSearchManifestation/SelectManifestation";
import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import { get } from "../../../../utils/api";
import { Container } from "./styles";

export const FieldsSearchManifestation = () => {
  const { values } = useFormikContext();

  const { data: complements, isLoading: isLoadingComplements } = useQuery({
    queryKey: ["manifestationComplement", values.manifestacaoId],
    queryFn: () =>
      get(
        `/manifestacao/listarCompManifestacao?manifestacaoId=${values.manifestacaoId}&somenteAtivo=true`
      ),
    enabled: !!values.manifestacaoId,
  });

  return (
    <Container>
      <Field
        component={FormikTextFieldSmall}
        size="small"
        label="Descricao"
        name="descricao"
      />
      <SelectManifestation />

      {!!values.manifestacaoId && !!complements?.length && (
        <SelectComplemento
          options={complements}
          isLoading={isLoadingComplements}
        />
      )}
    </Container>
  );
};
