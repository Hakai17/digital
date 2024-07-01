import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FormikSelectField } from "../../../../../../components";
import { get } from "../../../../../../utils/api";

export const SelectManifestation = ({ index }) => {
  const { setFieldValue, values } = useFormikContext();

  const { data: manifestations, isLoading } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  const handleChangeManifestation = event => {
    setFieldValue(`sequencias.${index}.manifestacaoId`, event.target.value);
    setFieldValue(`sequencias.${index}.compManifestacaoId`, 0);
    setFieldValue(`sequencias.${index}.subCompManifestacaoId`, 0);
  };

  const activesManifestations = useMemo(
    () => manifestations?.filter(m => m.ativo),
    [manifestations]
  );

  return (
    <Field
      required
      value={values.sequencias[index].manifestacaoId}
      name={`sequencias.${index}.manifestacaoId`}
      label="Manifestação"
      component={FormikSelectField}
      options={activesManifestations}
      onChange={handleChangeManifestation}
      isLoading={isLoading}
    />
  );
};

SelectManifestation.propTypes = {
  index: PropTypes.number,
};
