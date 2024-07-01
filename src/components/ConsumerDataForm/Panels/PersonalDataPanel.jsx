import { Field, useFormikContext } from "formik";
import { useState } from "react";

import { TabPanel } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { TIPO_SEXO } from "../../../pages/Consumer/constants";
import { get } from "../../../utils/api";
import {
  ApplyMaskCnpj,
  ApplyMaskCpf,
  OnlyNumber,
} from "../../../utils/functionHelper";
import { FormikSelectField } from "../../_UI/FormikTextField/FormikSelectField";
import {
  FormikTextField,
  FormikTextFieldSmall,
} from "../../_UI/FormikTextField/FormikTextField";
import { DateTextField, HalfSelectField, RadioContainer } from "../styles";

export function PersonalDataPanel({ ...props }) {
  const [profissaoId, setProfissaoId] = useState(0);
  const [typePerson, setTypePerson] = useState("fisica");
  const { values, setFieldValue } = useFormikContext();

  const { data: consumerTypes, isLoading: isLoadingConsumerType } = useQuery({
    queryKey: ["consumerType"],
    queryFn: () => get("/tipoConsumidor/listar?somenteAtivo=true"),
  });
  const { data: occupationArea, isLoading: isLoadingOccupationArea } = useQuery(
    {
      queryKey: ["occupationArea"],
      queryFn: () => get("/areaAtuacao/listarAreaAtuacao?somenteAtivo=true"),
    }
  );
  const { data: typeOfArea, isLoading: isLoadingTypeOfArea } = useQuery({
    queryKey: ["typeOfArea"],
    queryFn: () => get("/areaAtuacao/listarTipoAreaAtuacao?somenteAtivo=true"),
  });
  const { data: maritalStatus, isLoading: isLoadingMaritalStatus } = useQuery({
    queryKey: ["maritalStatus"],
    queryFn: () => get("/estadoCivil/listar?somenteAtivo=true"),
  });
  const { data: occupation, isLoading: isLoadingOccupation } = useQuery({
    queryKey: ["occupation"],
    queryFn: () => get("/profissao/listarProfissao?somenteAtivo=true"),
  });
  const { data: specialty, isLoading: isLoadingSpeciality } = useQuery({
    queryKey: ["specialty", profissaoId],
    queryFn: () =>
      get(
        `/profissao/listarEspecialidade?somenteAtivo=true&profissaoId=${profissaoId}`
      ),
  });

  return (
    <TabPanel {...props}>
      <Field
        name="id"
        component={FormikTextFieldSmall}
        size="small"
        label="Código Consumidor"
        disabled
      />
      <Field
        name="nome"
        component={FormikTextField}
        fullWidth
        label="Nome"
        required
      />
      <Field
        name="tipoId"
        component={FormikSelectField}
        fullWidth
        label="Tipo de Consumidor"
        isLoading={isLoadingConsumerType}
        options={consumerTypes}
      />
      <Field
        name="areaAtuacaoId"
        component={HalfSelectField}
        label="Área de Atuação"
        isLoading={isLoadingOccupationArea}
        options={occupationArea}
      />
      <Field
        name="tipoAreaAtuacaoId"
        component={HalfSelectField}
        label="Tipo de Área de Atuação"
        isLoading={isLoadingTypeOfArea}
        options={typeOfArea}
      />

      <Field
        label="Representante"
        type="checkbox"
        name="representante"
        control={<Checkbox />}
        as={FormControlLabel}
      />
      <Field
        label="SMS"
        type="checkbox"
        name="receberSMS"
        control={<Checkbox />}
        as={FormControlLabel}
      />
      <Field
        label="Marketing"
        type="checkbox"
        name="receberNewsletter"
        control={<Checkbox />}
        as={FormControlLabel}
      />
      <Field
        label="Prospect"
        type="checkbox"
        name="prospect"
        control={<Checkbox />}
        as={FormControlLabel}
      />

      <RadioContainer>
        <Typography>Tipo de Pessoa:</Typography>
        <RadioGroup
          row
          value={typePerson}
          onChange={e => {
            setTypePerson(e.target.value);
            setFieldValue(
              "sexo",
              e.target.value === "fisica"
                ? TIPO_SEXO.NAO_INFORMADO
                : TIPO_SEXO.JURIDICO
            );
          }}
        >
          <FormControlLabel value="fisica" control={<Radio />} label="Física" />
          <FormControlLabel
            value="juridica"
            control={<Radio />}
            label="Jurídica"
          />
        </RadioGroup>
      </RadioContainer>
      {typePerson === "fisica" ? (
        <>
          <RadioContainer>
            <Typography>Sexo:</Typography>
            <RadioGroup
              row
              value={values.sexo}
              onChange={e => setFieldValue("sexo", e.target.value)}
            >
              <FormControlLabel
                value={TIPO_SEXO.MASCULINO}
                control={<Radio />}
                label="Masculino"
              />
              <FormControlLabel
                value={TIPO_SEXO.FEMININO}
                control={<Radio />}
                label="Feminino"
              />
              <FormControlLabel
                value={TIPO_SEXO.NAO_INFORMADO}
                control={<Radio />}
                label="Não informado"
              />
            </RadioGroup>
          </RadioContainer>
          <DatePicker
            name="nascimento"
            fullWidth
            label="Data de nascimento"
            onChange={value => setFieldValue("nascimento", value)}
            value={values.nascimento !== "" ? values.nascimento : null}
            renderInput={props => <DateTextField {...props} fullWidth />}
          />
          <Field
            name="estadoCivilId"
            component={FormikSelectField}
            fullWidth
            label="Estado Civil"
            isLoading={isLoadingMaritalStatus}
            options={maritalStatus}
          />
          <Field
            name="profissaoId"
            component={FormikSelectField}
            fullWidth
            label="Profissão"
            onChange={e => {
              setProfissaoId(e.target.value);
              setFieldValue("profissaoId", e.target.value);
              setFieldValue("especialidadeId", 0);
            }}
            isLoading={isLoadingOccupation}
            options={occupation}
          />
          <Field
            name="especialidadeId"
            component={FormikSelectField}
            fullWidth
            label="Especialidade"
            isLoading={isLoadingSpeciality}
            options={specialty}
          />
          <Field
            name="rG"
            component={FormikTextField}
            fullWidth
            label="RG"
            onChange={value =>
              setFieldValue("rG", OnlyNumber(value.target.value.toString()))
            }
          />
          <Field
            name="cPF"
            component={FormikTextField}
            fullWidth
            label="CPF"
            onChange={value =>
              setFieldValue("cPF", ApplyMaskCpf(value.target.value.toString()))
            }
          />
        </>
      ) : (
        <>
          <Field
            name="nomeFantasia"
            component={FormikTextField}
            fullWidth
            label="Fantasia"
            inputProps={{ maxLength: 60 }}
          />
          <Field
            name="cnpj"
            component={FormikTextField}
            fullWidth
            label="CNPJ"
            onChange={value =>
              setFieldValue(
                "cnpj",
                ApplyMaskCnpj(value.target.value.toString())
              )
            }
          />
          <Field
            name="inscricaoEstadual"
            component={FormikTextField}
            fullWidth
            label="Inscrição Estadual"
            inputProps={{ maxLength: 20 }}
          />
          <Field
            name="inscricaoMunicipal"
            component={FormikTextField}
            fullWidth
            label="Inscrição Municipal"
            inputProps={{ maxLength: 20 }}
          />
        </>
      )}
    </TabPanel>
  );
}
