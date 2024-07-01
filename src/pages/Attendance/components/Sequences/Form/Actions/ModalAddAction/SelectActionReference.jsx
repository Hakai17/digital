import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { FormikSelectField } from "../../../../../../../components";
import { validateField } from "../../../../../useAttendance";

export const SelectActionReference = ({ label, options, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = e => {
    const value = e.target.value;
    const descricaoValue = options?.find(
      option => String(option.id) === value
    )?.descricao;

    setFieldValue("referenciaAcao", value);
    setFieldValue("nomeReferencia", descricaoValue);
  };

  return (
    <Field
      required
      name="referenciaAcao"
      label={label}
      component={FormikSelectField}
      options={options}
      onChange={handleChange}
      validate={validateField}
      {...props}
    />
  );
};

SelectActionReference.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};
