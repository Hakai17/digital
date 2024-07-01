import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";

import { FormikSelectField } from "../../../../../../components";
import { get } from "../../../../../../utils/api";

export const SelectContactPerson = ({ index }) => {
  const { values, setFieldValue } = useFormikContext();
  const { data: personsContact, isLoading } = useQuery({
    queryKey: ["personsContact", values.consumidorId],
    queryFn: () =>
      get(
        `/pessoaContato/listar?consumidorId=${values.consumidorId}&somenteAtivo=true`
      ),
    enabled: !!values.consumidorId,
  });

  const handleChangeContactPerson = event => {
    const address = personsContact.find(
      person => person.id === Number(event.target.value)
    ).value;

    setFieldValue(`sequencias.${index}.pessoaContatoId`, event.target.value);
    setFieldValue(`sequencias.${index}.enderecoId`, address);
  };

  return (
    <Field
      name={`sequencias.${index}.pessoaContatoId`}
      component={FormikSelectField}
      label="Pessoa do contato"
      options={personsContact}
      onChange={handleChangeContactPerson}
      disabled={!personsContact?.length}
      isLoading={isLoading}
    />
  );
};

SelectContactPerson.propTypes = {
  index: PropTypes.number,
};
