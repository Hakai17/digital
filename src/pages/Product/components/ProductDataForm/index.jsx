import {
  CircularProgress,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { Field } from "formik";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormikTextField,
  FormikSelectField,
} from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get, post } from "../../../../utils/api";
import { initialValuesProduct } from "../../constants";
import {
  Flex,
  StyledForm,
  StyledFormik,
  Container,
  IndicatorsContainer,
  Section,
  ContainerButtons,
} from "./styles";

export const ProductDataForm = ({ productId, handleCancel, onSave }) => {
  const isAddMode = !productId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      get(`produto/BuscarProdutoIndicadores?produtoId=${productId}`),
  });

  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ["grupoProdutoId"],
    queryFn: () => get("/produto/listarGRP?somenteAtivo=true"),
  });
  const { data: indicadores1, isLoading: isLoadingIndicadores1 } = useQuery({
    queryKey: ["codigoId1"],
    queryFn: () => get("/produto/listarID1?somenteAtivo=true"),
  });
  const { data: indicadores2, isLoading: isLoadingIndicadores2 } = useQuery({
    queryKey: ["codigoId2"],
    queryFn: () => get("/produto/listarID2?somenteAtivo=true"),
  });
  const { data: indicadores3, isLoading: isLoadingIndicadores3 } = useQuery({
    queryKey: ["codigoId3"],
    queryFn: () => get("/produto/listarID3?somenteAtivo=true"),
  });
  const { data: indicadores4, isLoading: isLoadingIndicadores4 } = useQuery({
    queryKey: ["codigoId4"],
    queryFn: () => get("/produto/listarID4?somenteAtivo=true"),
  });
  const { data: indicadores5, isLoading: isLoadingIndicadores5 } = useQuery({
    queryKey: ["codigoId5"],
    queryFn: () => get("/produto/listarID5?somenteAtivo=true"),
  });

  const initialValues = useMemo(() => {
    if (!product) return initialValuesProduct;

    const data = { ...product };

    data.grupoProdutoId = product.gRP.id;
    data.codigoId1 = product.iD1.id;
    data.codigoId2 = product.iD2.id;
    data.codigoId3 = product.iD3.id;
    data.codigoId4 = product.iD4.id;
    data.codigoId5 = product.iD5.id;
    data.obs = product.observacao;
    return data;
  }, [product]);

  const [isDescontinuado, setIsDescontinuado] = useState(
    Boolean(initialValues.descontinuado)
  );

  const handleSubmit = async valuesForm => {
    try {
      open();

      if (valuesForm.descontinuado) {
        valuesForm.dataDescontinuado = new Date().toISOString();
      }

      var { data } = await post("/produto/salvar", valuesForm);
      if (data && valuesForm.id) {
        enqueueSnackbar(
          isAddMode
            ? "Produto adicionado com sucesso!"
            : "Produto editado com sucesso!",
          { variant: "success" }
        );
        onSave && onSave(valuesForm);
      } else {
        enqueueSnackbar({ variant: "error" });
      }
    } finally {
      close();
    }
  };

  if (productId && isLoadingProduct) {
    return (
      <Flex>
        <CircularProgress />
      </Flex>
    );
  }

  return (
    <StyledFormik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty, setFieldValue }) => (
        <StyledForm>
          <Field
            name="id"
            component={FormikTextField}
            fullWidth
            label="Código"
            required
          />
          <Field
            name="descricao"
            component={FormikTextField}
            fullWidth
            label="Descrição"
          />
          <Container container direction="column">
            <Typography variant="h5">Composição Produto</Typography>
            <Section item>
              <IndicatorsContainer container spacing={2}>
                <Grid item xs={5}>
                  <Field
                    name="grupoProdutoId"
                    component={FormikSelectField}
                    fullWidth
                    label="Grupo"
                    isLoading={isLoadingGroups}
                    options={groups}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name="codigoId1"
                    component={FormikSelectField}
                    fullWidth
                    label="Linha"
                    isLoading={isLoadingIndicadores1}
                    options={indicadores1}
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    name="codigoId2"
                    component={FormikSelectField}
                    fullWidth
                    label="Marca"
                    isLoading={isLoadingIndicadores2}
                    options={indicadores2}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name="codigoId3"
                    component={FormikSelectField}
                    fullWidth
                    label="Categoria"
                    isLoading={isLoadingIndicadores3}
                    options={indicadores3}
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    name="codigoId4"
                    component={FormikSelectField}
                    fullWidth
                    label="Embalagem"
                    isLoading={isLoadingIndicadores4}
                    options={indicadores4}
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    name="codigoId5"
                    component={FormikSelectField}
                    fullWidth
                    label="Indicador 5"
                    isLoading={isLoadingIndicadores5}
                    options={indicadores5}
                  />
                </Grid>
              </IndicatorsContainer>
            </Section>
          </Container>
          {productId && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDescontinuado}
                  onChange={e => {
                    setIsDescontinuado(e.target.checked);
                    setFieldValue(
                      "descontinuado",
                      e.target.checked ? true : false
                    );
                  }}
                />
              }
              label="Descontinuado"
            />
          )}
          {isDescontinuado ? (
            <Field
              name="obsDescontinuacao"
              component={FormikTextField}
              fullWidth
              label="Observação - Descontinuado"
              multiline
              rows={4}
              inputProps={{ maxLength: 4000 }}
            />
          ) : (
            <Field
              name="obs"
              component={FormikTextField}
              fullWidth
              label="Observações"
              multiline
              rows={4}
              inputProps={{ maxLength: 4000 }}
            />
          )}
          <ContainerButtons>
            <Button onClick={() => handleCancel()}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={!dirty}>
              Salvar
            </Button>
          </ContainerButtons>
        </StyledForm>
      )}
    </StyledFormik>
  );
};
