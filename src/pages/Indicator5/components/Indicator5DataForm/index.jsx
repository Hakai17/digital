import { useSnackbar } from "notistack";

import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import { useMemo } from "react";
import { Button, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesIndicator5 } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const Indicator5DataForm = ({ indicatorId, handleCancel, onSave }) => {
  const isAddMode = !indicatorId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: indicator5, isLoading: isLoadingIndicator5 } = useQuery({
    queryKey: ["indicator5", indicatorId],
    queryFn: () => get(`/produto/buscarId5?codigo=${indicatorId}`),
  });

  const initialValues = useMemo(() => {
    if (isAddMode) {
      return initialValuesIndicator5;
    } else {
      return {
        ...indicator5,
        Indicador: "ID5",
      };
    }
  }, [isAddMode, indicator5]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post("/produto/salvarIndicador", valuesForm);
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Indicador 5 adicionado com sucesso!"
          : "Indicador 5 editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  if (indicatorId && isLoadingIndicator5) {
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
