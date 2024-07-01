import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FormikSelectField } from "../../../../components";
import { get } from "../../../../utils/api";

export const SelectManifestation = () => {
  const { setFieldValue } = useFormikContext();

  const { data: manifestations, isLoading } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  const handleChangeManifestation = event => {
    setFieldValue("manifestacaoId", event.target.value);
  };

  const activesManifestations = useMemo(
    () => manifestations?.filter(m => m.ativo),
    [manifestations]
  );

  return (
    <>
      <Field
        name={"manifestacaoId"}
        label="Código"
        component={FormikSelectField}
        options={activesManifestations}
        onChange={handleChangeManifestation}
        isLoading={isLoading}
        size="small"
      />
      <Field
        name={"manifestacaoId"}
        label="Descrição"
        component={FormikSelectField}
        options={activesManifestations}
        onChange={handleChangeManifestation}
        isLoading={isLoading}
        size="small"
      />
    </>
  );
};

SelectManifestation.propTypes = {
  index: PropTypes.number,
};
