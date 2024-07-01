import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { Field } from "formik";
import { useSnackbar } from "notistack";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Button, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api, get } from "../../../../utils/api";
import { initialValuesGroup } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const GroupDataForm = ({ groupId, handleCancel, onSave }) => {
  const isAddMode = !groupId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => get(`/produto/buscarGrupoProdutoPorId?codigo=${groupId}`),
  });

  const initialValues = useMemo(() => group || initialValuesGroup, [group]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post("/produto/salvarGrupoProduto", valuesForm);
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Grupo adicionado com sucesso!"
          : "Grupo editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  if (groupId && isLoadingGroup) {
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
          {groupId && (
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
