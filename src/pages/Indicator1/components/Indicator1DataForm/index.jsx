import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { Field } from "formik";
import { useSnackbar } from "notistack";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Button, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesIndicator1 } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const Indicator1DataForm = ({ indicatorId, handleCancel, onSave }) => {
  const isAddMode = !indicatorId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: indicator1, isLoading: isLoadingIndicator1 } = useQuery({
    queryKey: ["indicator1", indicatorId],
    queryFn: () => get(`/produto/buscarId1?codigo=${indicatorId}`),
  });

  const initialValues = useMemo(() => {
    if (isAddMode) {
      return initialValuesIndicator1;
    } else {
      return {
        ...indicator1,
        Indicador: "ID1",
      };
    }
  }, [isAddMode, indicator1]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post("/produto/salvarIndicador", valuesForm);
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Linha adicionado com sucesso!"
          : "Linha editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  if (indicatorId && isLoadingIndicator1) {
    return (
      <Flex>
        <CircularProgress />
      </Flex>
    );
  }

  return (
    <StyledFormik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty, setFieldValue, values }) => (
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
