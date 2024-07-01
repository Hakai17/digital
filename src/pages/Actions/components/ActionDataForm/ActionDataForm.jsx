import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

import {
  Button,
  FormikSelectField,
  FormikTextField,
} from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesAction } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const ActionDataForm = ({ actionId, onCancel, onSave }) => {
  const isAddMode = !actionId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: routine, isLoading: isLoadingRoutine } = useQuery({
    queryKey: ["routines"],
    queryFn: () => get("/cadastroAtendimento/listarRotina"),
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["users"],
    queryFn: () => get("/cadastroAtendimento/listarUsuario"),
  });

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
          ? "Ação adicionado com sucesso!"
          : "Ação editado com sucesso!",
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
      {({ dirty, values, setFieldValue }) => (
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
          <Field
            name="rotinaId"
            component={FormikSelectField}
            fullWidth
            label="Rotina"
            isLoading={isLoadingRoutine}
            options={routine}
          />
          <Field
            name="usuarioId"
            component={FormikSelectField}
            fullWidth
            label="Usuário"
            isLoading={isLoadingUser}
            options={user}
          />
          {actionId && (
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
