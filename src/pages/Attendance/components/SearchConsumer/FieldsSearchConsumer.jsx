import { Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { ModalSearchConsumer } from "../../../../components";
import { get } from "../../../../utils/api";
import { Container, Content, ContentToAlign } from "./styles";
import { FormikNumberField } from "../../../../components/_UI/FormikTextField/FormikTextField";

export const FieldsSearchConsumer = ({ handleConsumidorId, disabled }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const { values, setFieldValue, isSubmitting } = useFormikContext();

  const { data: consumer, refetch } = useQuery({
    queryKey: ["consumer"],
    queryFn: () =>
      get(`/consumidor/buscarPorId/${values.consumidorId}?somenteAtivo=true`),
    enabled: false,
  });

  const searchConsumer = useCallback(async () => {
    try {
      if (values.consumidorId) {
        await refetch();
        return;
      }
    } catch (err) {
      enqueueSnackbar(`Erro ao buscar consumidor: ${err}`, {
        variant: "error",
      });
    }
  }, [values.consumidorId]);

  useEffect(() => {
    searchConsumer();
  }, []);

  useEffect(() => {
    if (consumer && consumer.id === Number(values.consumidorId)) {
      setName(consumer.descricao);
      handleConsumidorId(values.consumidorId);
      return;
    } else if (!values.consumidorId) {
      setName("");
    }
  }, [consumer, values.consumidorId]);

  const onClickCallback = callbackValues => {
    setName(callbackValues.nome);
    setFieldValue("consumidorId", callbackValues.id);
    handleConsumidorId(callbackValues.id);
  };

  const handleSearchConsumer = async e => {
    if (e.key === "Enter") {
      await searchConsumer();
    }
  };

  return (
    <Container>
      <Content container spacing={2} wrap="nowrap">
        <Grid item xs={3}>
          <Field
            fullWidth
            component={FormikNumberField}
            label="Código Consumidor"
            name="consumidorId"
            inputProps={{ onKeyDown: handleSearchConsumer }}
            disabled={disabled}
            type="number"
          />
        </Grid>
        <Grid item xs={10}>
          <ContentToAlign container>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Nome do Consumidor"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={disabled}
              />
            </Grid>
            <Grid item>
              <ModalSearchConsumer
                code={values.consumidorId}
                name={name}
                onClickCallback={onClickCallback}
                isDisabled={isSubmitting || disabled}
              />
            </Grid>
          </ContentToAlign>
        </Grid>
      </Content>
    </Container>
  );
};
