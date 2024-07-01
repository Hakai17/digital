import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { FormikSelectField } from "../../components";

export const SelectComplemento = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChangeComplemento = event => {
    setFieldValue("compManifestacaoId", event.target.value);
    setFieldValue("subCompManifestacaoId", 0);
  };

  return (
    <Field
      name={"compManifestacaoId"}
      label="Complemento"
      component={FormikSelectField}
      onChange={handleChangeComplemento}
      size="small"
      {...props}
    />
  );
};

SelectComplemento.propTypes = {
  index: PropTypes.number,
};
