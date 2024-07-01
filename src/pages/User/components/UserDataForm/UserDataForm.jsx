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
import { api, get, post } from "../../../../utils/api";
import { initialValuesUser } from "../../constants";
import { ContainerButtons, Flex, StyledForm, StyledFormik } from "./styles";

export const UserDataForm = ({ userId, handleCancel, onSave }) => {
  const isAddMode = !userId;
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useBackdrop();

  const { data: contact, isLoading: isLoadingContact } = useQuery({
    queryKey: ["contact"],
    queryFn: () => post("/cadastroAtendimento/listarTipoContato"),
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => get(`/usuario/buscar?id=${userId}`),
    enabled: !!userId,
  });

  const initialValues = useMemo(() => {
    if (!user) return initialValuesUser;

    const data = { ...user };

    data.tipoContatoId = user.tipoContato.id;
    return data;
  }, [user]);

  const handleSubmit = async valuesForm => {
    try {
      open();

      if (!userId && !valuesForm.senha) {
        throw new Error("Senha é obrigatória");
      }

      if (!userId && valuesForm.senha !== valuesForm.confirmacaoSenha) {
        throw new Error("As senhas devem coincidir");
      }

      var { data } = await api.post("/usuario/salvar", valuesForm);
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Usuário adicionado com sucesso!"
          : "Usuário editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message || "Erro ao salvar usuário", {
        variant: "error",
      });
    } finally {
      close();
    }
  };

  if (userId && isLoadingUser) {
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
            label="Nome"
            required
          />
          <Field
            name="email"
            component={FormikTextField}
            fullWidth
            label="E-mail"
          />
          <Field
            name="login"
            component={FormikTextField}
            fullWidth
            label="Usuário"
          />
          {!userId && (
            <>
              <Field
                name="senha"
                component={FormikTextField}
                fullWidth
                label="Senha"
                type="password"
                required
              />
              <Field
                name="confirmacaoSenha"
                component={FormikTextField}
                fullWidth
                label="Confirmar Senha"
                type="password"
                required
              />
            </>
          )}
          <Field
            name="senhaEmail"
            component={FormikTextField}
            fullWidth
            label="Senha do E-mail"
            type="password"
          />
          <Field
            name="tipoContatoId"
            component={FormikSelectField}
            fullWidth
            label="Contato"
            isLoading={isLoadingContact}
            options={contact}
          />
          <Field
            label="Representante"
            type="checkbox"
            name="representante"
            control={<Checkbox />}
            as={FormControlLabel}
          />
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
