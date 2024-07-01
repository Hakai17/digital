import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { FormikSelectField, SelectField } from "../../../../../../components";
import { DEFAULT_VALUE_STRING } from "../../../../../../components/constans";
import { get } from "../../../../../../utils/api";
import { Container, IndicatorsContainer, Section } from "./styles";

export const Product = ({ index }) => {
  const { setFieldValue, values } = useFormikContext();
  const [productId, setProductId] = useState(
    values.sequencias[index].codigoProduto
  );

  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ["groups"],
    queryFn: () => get("/produto/listarGRP?somenteAtivo=true"),
  });
  const { data: indicadores1, isLoading: isLoadingIndicadores1 } = useQuery({
    queryKey: ["indicators1"],
    queryFn: () => get("/produto/listarID1?somenteAtivo=true"),
  });
  const { data: indicadores2, isLoading: isLoadingIndicadores2 } = useQuery({
    queryKey: ["indicators2"],
    queryFn: () => get("/produto/listarID2?somenteAtivo=true"),
  });
  const { data: indicadores3, isLoading: isLoadingIndicadores3 } = useQuery({
    queryKey: ["indicators3"],
    queryFn: () => get("/produto/listarID3?somenteAtivo=true"),
  });
  const { data: indicadores4, isLoading: isLoadingIndicadores4 } = useQuery({
    queryKey: ["indicators4"],
    queryFn: () => get("/produto/listarID4?somenteAtivo=true"),
  });
  const { data: indicadores5, isLoading: isLoadingIndicadores5 } = useQuery({
    queryKey: ["indicators5"],
    queryFn: () => get("/produto/listarID5?somenteAtivo=true"),
  });
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => get("/produto/listar?somenteAtivo=true"),
  });

  const { data: indicadores } = useQuery({
    queryKey: ["indicadores", productId],
    queryFn: () =>
      get(`/produto/BuscarProdutoIndicadores?produtoId=${productId}`),
    enabled: productId != DEFAULT_VALUE_STRING,
  });

  const preencherIndicadores = () => {
    if (productId != DEFAULT_VALUE_STRING) {
      setFieldValue(`sequencias.${index}.grupoProdutoId`, indicadores?.gRP.id);
      setFieldValue(`sequencias.${index}.indicador1Id`, indicadores?.iD1.id);
      setFieldValue(`sequencias.${index}.indicador2Id`, indicadores?.iD2.id);
      setFieldValue(`sequencias.${index}.indicador3Id`, indicadores?.iD3.id);
      setFieldValue(`sequencias.${index}.indicador4Id`, indicadores?.iD4.id);
      setFieldValue(`sequencias.${index}.indicador5Id`, indicadores?.iD5.id);
    } else {
      setFieldValue(`sequencias.${index}.grupoProdutoId`, DEFAULT_VALUE_STRING);
      setFieldValue(`sequencias.${index}.indicador1Id`, DEFAULT_VALUE_STRING);
      setFieldValue(`sequencias.${index}.indicador2Id`, DEFAULT_VALUE_STRING);
      setFieldValue(`sequencias.${index}.indicador3Id`, DEFAULT_VALUE_STRING);
      setFieldValue(`sequencias.${index}.indicador4Id`, DEFAULT_VALUE_STRING);
      setFieldValue(`sequencias.${index}.indicador5Id`, DEFAULT_VALUE_STRING);
    }
  };

  useEffect(() => {
    if (productId !== DEFAULT_VALUE_STRING)
      setFieldValue(`sequencias.${index}.codigoProduto`, productId);
    else setProductId(values.sequencias[index].codigoProduto);
  }, [productId]);

  useEffect(() => {
    preencherIndicadores();
  }, [indicadores]);

  useEffect(() => {
    setProductId(values.sequencias[index].codigoProduto);
  }, [values.sequencias[index].contatoId]);

  return (
    <Container container direction="column">
      <Typography variant="h5">Produto</Typography>

      <Section item>
        <IndicatorsContainer container spacing={2}>
          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={groups}
              name={`sequencias.${index}.grupoProdutoId`}
              label="Grupo"
              isLoading={isLoadingGroups}
            />
          </Grid>

          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={indicadores1}
              name={`sequencias.${index}.indicador1Id`}
              label="Linha"
              isLoading={isLoadingIndicadores1}
            />
          </Grid>

          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={indicadores2}
              name={`sequencias.${index}.indicador2Id`}
              label="Marca"
              isLoading={isLoadingIndicadores2}
            />
          </Grid>

          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={indicadores3}
              name={`sequencias.${index}.indicador3Id`}
              label="Categoria"
              isLoading={isLoadingIndicadores3}
            />
          </Grid>

          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={indicadores4}
              name={`sequencias.${index}.indicador4Id`}
              label="Embalagem"
              isLoading={isLoadingIndicadores4}
            />
          </Grid>

          <Grid item xs={5}>
            <Field
              component={FormikSelectField}
              options={indicadores5}
              name={`sequencias.${index}.indicador5Id`}
              label="Indicador 5"
              isLoading={isLoadingIndicadores5}
            />
          </Grid>
        </IndicatorsContainer>
      </Section>

      <Section item>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={2}>
            <SelectField
              fullWidth
              options={products}
              getDescription={item => item.id}
              value={productId}
              onChange={e => setProductId(e.target.value)}
              label="Código Produto"
            />
          </Grid>

          <Grid item xs={12}>
            <SelectField
              fullWidth
              options={products}
              value={productId}
              onChange={e => setProductId(e.target.value)}
              label="Nome Produto"
            />
          </Grid>
        </Grid>
      </Section>
    </Container>
  );
};
Product.propTypes = {
  index: PropTypes.number.isRequired,
};
