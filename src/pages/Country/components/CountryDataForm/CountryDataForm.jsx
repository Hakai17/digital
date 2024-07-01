import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

import { Button, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesAction } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const CountryDataForm = ({ actionId, onCancel, onSave }) => {
  const isAddMode = !actionId;
  const { enqueueSnackbar } = useSnackbar();

  const { open, close } = useBackdrop();

  const { data: action, isLoading: isLoadingAction } = useQuery({
    queryKey: ["action", actionId],
    queryFn: () => get(`/cadastroAtendimento/buscarAcao?id=${actionId}`),
    enabled: !!actionId,
  });

  const initialValues = useMemo(() => action || initialValuesAction, [action]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post(
        "/cadastroAtendimento/salvarAcao",
        valuesForm
      );
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "País adicionado com sucesso!"
          : "País editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  if (actionId && isLoadingAction) {
    return (
      <Flex>
        <CircularProgress />
      </Flex>
    );
  }

  return (
    <StyledFormik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <StyledForm>
          <Field
            name="id"
            component={FormikTextField}
            fullWidth
            label="Código"
            disabled
          />
          <Field
            name="descricao"
            component={FormikTextField}
            fullWidth
            label="Descrição"
          />
          <ContainerButtons>
            <Button onClick={() => onCancel()}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={!dirty}>
              Salvar
            </Button>
          </ContainerButtons>
        </StyledForm>
      )}
    </StyledFormik>
  );
};
