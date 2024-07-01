import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import { FormikSelectField } from "../../../../../../components";

export const SelectComplemento = ({ index, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChangeComplemento = event => {
    setFieldValue(`sequencias.${index}.compManifestacaoId`, event.target.value);
    setFieldValue(`sequencias.${index}.subCompManifestacaoId`, 0);
  };

  return (
    <Field
      name={`sequencias.${index}.compManifestacaoId`}
      label="Complemento"
      component={FormikSelectField}
      onChange={handleChangeComplemento}
      {...props}
    />
  );
};

SelectComplemento.propTypes = {
  index: PropTypes.number,
};
