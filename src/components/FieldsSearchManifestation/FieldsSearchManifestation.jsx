import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { FormikSelectField } from "../../components";
import { get } from "../../utils/api";
import { SelectComplemento } from "./SelectComplemento";
import { SelectManifestation } from "./SelectManifestation";
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

  const { data: subComplements, isLoading: isLoadingSubComplements } = useQuery(
    {
      queryKey: [
        "manifestationSubComplement",
        values.manifestacaoId,
        values.compManifestacaoId,
      ],
      queryFn: () =>
        get(
          `/manifestacao/listarSubCompManifestacao?manifestacaoId=${values.manifestacaoId}&subCompManifestacaoId=${values.compManifestacaoId}&somenteAtivo=true`
        ),
      enabled: !!values.manifestacaoId && !!values.compManifestacaoId,
    }
  );

  return (
    <Container>
      <SelectManifestation />

      {!!values.manifestacaoId && !!complements?.length && (
        <SelectComplemento
          options={complements}
          isLoading={isLoadingComplements}
        />
      )}

      {!!values.manifestacaoId &&
        !!values.compManifestacaoId &&
        !!subComplements?.length && (
          <Field
            name={"subCompManifestacaoId"}
            label="Sub-Complemento"
            component={FormikSelectField}
            options={subComplements}
            isLoading={isLoadingSubComplements}
            size="small"
          />
        )}
    </Container>
  );
};
