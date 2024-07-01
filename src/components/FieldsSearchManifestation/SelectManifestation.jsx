import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FormikSelectField } from "../../components";
import { get } from "../../utils/api";

export const SelectManifestation = () => {
  const { setFieldValue } = useFormikContext();

  const { data: manifestations, isLoading } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  const handleChangeManifestation = event => {
    setFieldValue("manifestacaoId", event.target.value);
    setFieldValue("compManifestacaoId", 0);
    setFieldValue("subCompManifestacaoId", 0);
  };

  const activesManifestations = useMemo(
    () => manifestations?.filter(m => m.ativo),
    [manifestations]
  );

  return (
    <Field
      required
      name={"manifestacaoId"}
      label="Manifestação"
      component={FormikSelectField}
      options={activesManifestations}
      onChange={handleChangeManifestation}
      isLoading={isLoading}
      size="small"
    />
  );
};

SelectManifestation.propTypes = {
  index: PropTypes.number,
};
