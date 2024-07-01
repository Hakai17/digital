import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { convertPayloadKeys } from "payload-transformer";
import { useEffect } from "react";

import { get } from "../../utils/api";
import { ApplyMaskCep } from "../../utils/functionHelper";
import { Button } from "../_UI/Button/Button";
import { FormikSelectField } from "../_UI/FormikTextField/FormikSelectField";
import { FormikTextField } from "../_UI/FormikTextField/FormikTextField";
import { StyledForm } from "./styles";

const addressType = [
  { id: 0, descricao: "*" },
  { id: 1, descricao: "Residencial" },
  { id: 2, descricao: "Comercial" },
  { id: 3, descricao: "Cobrança" },
];

export const Form = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { values, dirty, setFieldValue } = useFormikContext();

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => get("/endereco/listarPais?somenteAtivos=true"),
  });
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: ["states", values.pais?.id],
    queryFn: () =>
      get(`/endereco/listarEstado?somenteAtivos=true&pais=${values.pais?.id}`),
    enabled: !!values.pais?.id,
  });
  const { data: cities } = useQuery({
    queryKey: ["cities", values.unidadeFederativa?.id],
    queryFn: () =>
      get(
        `/endereco/listarCidade?somenteAtivos=true&pais=${values.pais?.id}&estado=${values.unidadeFederativa?.id}`
      ),
    enabled: !!values.unidadeFederativa?.id,
  });

  const {
    data: endereco,
    mutate,
    isLoading,
  } = useMutation({
    mutationFn: async () => {
      const data = await get(`/endereco/buscarLogradouro?cep=${values.cep}`);
      return convertPayloadKeys(data, "camelCase");
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (endereco) {
        const country = { id: endereco.paisId, descricao: endereco.pais };
        setFieldValue("paisId", endereco.paisId);
        setFieldValue("pais", country);
        setFieldValue("bairro", endereco.bairro ?? "");
        setFieldValue(
          "endereco",
          endereco.rua ? `${endereco.tipoLogradouro} ${endereco.rua}` : ""
        );
      } else {
        enqueueSnackbar("CEP não encontrado!");
        setFieldValue("paisId", null);
        setFieldValue("pais", {});
        setFieldValue("bairro", "");
        setFieldValue("endereco", "");
      }
    }
  }, [endereco]);

  useEffect(() => {
    if (endereco) {
      const state = { id: endereco.estadoId, descricao: endereco.estado };
      setFieldValue("unidadeFederativaId", endereco.estadoId);
      setFieldValue("unidadeFederativa", state);
    } else {
      setFieldValue("unidadeFederativaId", null);
      setFieldValue("unidadeFederativa", {});
    }
  }, [states]);

  useEffect(() => {
    if (endereco) {
      const city = { id: endereco.cidadeId, descricao: endereco.cidade };
      setFieldValue("cidadeId", endereco.cidadeId);
      setFieldValue("cidade", city);
    } else {
      setFieldValue("unidadeFederativaId", null);
      setFieldValue("unidadeFederativa", {});
    }
  }, [cities]);

  const onKeyDown = e => {
    if (e.key === "Enter") {
      mutate();
    }
  };

  return (
    <StyledForm>
      <Field
        fullWidth
        name="tipoEnderecoId"
        component={FormikSelectField}
        options={addressType}
        label="Tipo de endereço"
      />
      <Field
        fullWidth
        name="cep"
        component={FormikTextField}
        label="CEP"
        onChange={e =>
          setFieldValue("cep", ApplyMaskCep(e.target.value.toString()))
        }
        onBlur={mutate}
        inputProps={{ maxLength: 8, onKeyDown: onKeyDown }}
      />
      <Field
        required
        fullWidth
        name="endereco"
        component={FormikTextField}
        label="Endereço"
        inputProps={{ maxLength: 200 }}
      />
      <Field
        fullWidth
        name="complemento"
        component={FormikTextField}
        label="Complemento"
        inputProps={{ maxLength: 60 }}
      />
      <Field
        fullWidth
        name="bairro"
        component={FormikTextField}
        label="Bairro"
        inputProps={{ maxLength: 100 }}
      />
      <Field
        required
        fullWidth
        name="pais"
        value={values.pais.id}
        component={FormikSelectField}
        options={countries}
        onChange={e => {
          const country = countries.find(p => p.id === e.target.value);
          setFieldValue("pais", country);
          setFieldValue("paisId", country.id);
        }}
        isLoading={isLoadingCountries}
        label="País"
      />
      <Field
        required
        fullWidth
        name="unidadeFederativa"
        value={values.unidadeFederativa.id}
        component={FormikSelectField}
        options={states}
        onChange={ev => {
          const state = states.find(e => e.id === ev.target.value);
          setFieldValue("unidadeFederativa", state);
          setFieldValue("unidadeFederativaId", state.id);
        }}
        isLoading={isLoadingStates && !!values.pais}
        label="Estado"
      />
      <Field
        required
        fullWidth
        name="cidade"
        value={values.cidade.id}
        component={FormikSelectField}
        options={cities}
        onChange={e => {
          const city = cities.find(c => c.id === parseInt(e.target.value));
          setFieldValue("cidade", city);
          setFieldValue("cidadeId", city?.id);
        }}
        label="Cidade"
        inputProps={{ maxLength: 100 }}
      />
      <Button type="submit" disabled={!dirty}>
        Salvar
      </Button>
    </StyledForm>
  );
};
