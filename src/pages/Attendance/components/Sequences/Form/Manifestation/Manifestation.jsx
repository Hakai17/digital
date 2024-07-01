import { Grid } from "@mui/material";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";

import { useQuery } from "@tanstack/react-query";
import { FormikSelectField } from "../../../../../../components";
import { get } from "../../../../../../utils/api";
import { SelectComplemento } from "./SelectComplemento";
import { SelectManifestation } from "./SelectManifestation";
import { Container } from "./styles";

export const Manifestation = ({ index }) => {
  const { values } = useFormikContext();

  const { data: complements, isLoading: isLoadingComplements } = useQuery({
    queryKey: [
      "manifestationComplement",
      values.sequencias[index].manifestacaoId,
    ],
    queryFn: () =>
      get(
        `/manifestacao/listarCompManifestacao?manifestacaoId=${values.sequencias[index].manifestacaoId}&somenteAtivo=true`
      ),
    enabled: !!values.sequencias[index].manifestacaoId,
  });

  const { data: subComplements, isLoading: isLoadingSubComplements } = useQuery(
    {
      queryKey: [
        "manifestationSubComplement",
        values.sequencias[index].manifestacaoId,
        values.sequencias[index].compManifestacaoId,
      ],
      queryFn: () =>
        get(
          `/manifestacao/listarSubCompManifestacao?manifestacaoId=${values.sequencias[index].manifestacaoId}&compManifestacaoId=${values.sequencias[index].compManifestacaoId}&somenteAtivo=true`
        ),
      enabled:
        !!values.sequencias[index].manifestacaoId &&
        !!values.sequencias[index].compManifestacaoId,
    }
  );

  return (
    <Container container spacing={2} wrap="nowrap">
      <Grid item xs={3}>
        <SelectManifestation index={index} />
      </Grid>

      {!!values.sequencias[index].manifestacaoId && !!complements?.length && (
        <Grid item xs={3}>
          <SelectComplemento
            index={index}
            options={complements}
            isLoading={isLoadingComplements}
          />
        </Grid>
      )}

      {!!values.sequencias[index].manifestacaoId &&
        !!values.sequencias[index].compManifestacaoId &&
        !!subComplements?.length && (
          <Grid item xs={3}>
            <Field
              name={`sequencias.${index}.subCompManifestacaoId`}
              label="Sub-Complemento"
              component={FormikSelectField}
              options={subComplements}
              isLoading={isLoadingSubComplements}
            />
          </Grid>
        )}
    </Container>
  );
};

Manifestation.propTypes = {
  index: PropTypes.number,
};
