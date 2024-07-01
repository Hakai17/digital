import { useSnackbar } from "notistack";

import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import { useMemo } from "react";
import { Button, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesIndicator3 } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const Indicator3DataForm = ({ indicatorId, handleCancel, onSave }) => {
  const isAddMode = !indicatorId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: indicator3, isLoading: isLoadingIndicator3 } = useQuery({
    queryKey: ["indicator3", indicatorId],
    queryFn: () => get(`/produto/buscarId3?codigo=${indicatorId}`),
  });

  const initialValues = useMemo(() => {
    if (isAddMode) {
      return initialValuesIndicator3;
    } else {
      return {
        ...indicator3,
        Indicador: "ID3",
      };
    }
  }, [isAddMode, indicator3]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post("/produto/salvarIndicador", valuesForm);
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Categoria adicionado com sucesso!"
          : "Categoria editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  if (indicatorId && isLoadingIndicator3) {
    return (
      <Flex>
        <CircularProgress />
      </Flex>
    );
  }

  return (
    <StyledFormik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty, values, setFieldValue }) => (
        <StyledForm>
          <Field
            name="codigo"
            component={FormikTextField}
            fullWidth
            label="Código"
          />
          <Field
            name="descricao"
            component={FormikTextField}
            fullWidth
            label="Descrição"
          />
          {indicatorId && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.situacao === 1}
                  onChange={e =>
                    setFieldValue("situacao", e.target.checked ? 1 : 2)
                  }
                />
              }
              label="Ativo"
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
