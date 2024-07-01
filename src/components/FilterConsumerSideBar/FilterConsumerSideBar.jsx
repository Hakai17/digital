import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { get } from "../../utils/api";
import { FormikSelectField } from "../_UI/FormikTextField/FormikSelectField";
import {
  FormikNumberField,
  FormikTextFieldSmall,
} from "../_UI/FormikTextField/FormikTextField";

export const FilterConsumerSideBar = ({ typeFilter }) => {
  const { values, setFieldValue } = useFormikContext();
  const { data: consumerTypes } = useQuery({
    queryKey: ["consumerTypes"],
    queryFn: () => get("/tipoConsumidor/listar?somenteAtivo=true"),
  });

  return (
    <>
      {typeFilter === "dataNascimento" && (
        <>
          <DatePicker
            label="Data de nascimento"
            value={values.dataNascimento !== "" ? values.dataNascimento : null}
            onChange={value => setFieldValue("dataNascimento", value)}
            renderInput={props => <TextField {...props} size="small" />}
          />
        </>
      )}
      {typeFilter === "dataCadastro" && (
        <>
          <DatePicker
            label="Data do cadastro"
            value={values.dataCadastro !== "" ? values.dataCadastro : null}
            onChange={value => setFieldValue("dataCadastro", value)}
            renderInput={props => <TextField {...props} size="small" />}
          />
        </>
      )}
      {typeFilter !== "dataCadastro" && typeFilter !== "dataNascimento" && (
        <>
          <Field
            component={FormikNumberField}
            size="small"
            label="Código Consumidor"
            name="id"
            type="number"
          />
          <Field
            component={FormikTextFieldSmall}
            size="small"
            label="Nome"
            name="nome"
          />
          <Field
            component={FormikNumberField}
            size="small"
            label="DDD"
            name="ddd"
            type="number"
          />
          <Field
            component={FormikNumberField}
            size="small"
            label="Telefone"
            name="telefone"
            type="number"
          />
          <Field
            component={FormikTextFieldSmall}
            size="small"
            label="Código CRM"
            name="codigoCrm"
          />
          <Field
            component={FormikNumberField}
            size="small"
            label="CEP"
            name="cep"
            type="number"
          />
          <Field
            component={FormikNumberField}
            size="small"
            label="CNPJ"
            name="cnpj"
            type="number"
          />

          <Field
            component={FormikNumberField}
            size="small"
            label="CPF"
            name="cpf"
            type="number"
          />
          <Field
            component={FormikNumberField}
            size="small"
            label="RG"
            name="rg"
            type="number"
          />

          <Field
            component={FormikTextFieldSmall}
            size="small"
            label="E-mail"
            name="email"
            type="email"
          />

          <Field
            component={FormikSelectField}
            size="small"
            label="Tipo de Consumidor"
            name="tipoConsumidorId"
            options={consumerTypes}
          />
        </>
      )}
    </>
  );
};
