import { Button, InputAdornment } from "@mui/material";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Field, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FormikTextField, IconButton } from "..";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBackdrop } from "../../contexts/BackdropContext";
import { useTimerContext } from "../../contexts/TimerContext";
import { initialValuesSenha } from "../../pages/Consumer/constants";
import { post } from "../../utils/api";
import { Form } from "./styles";

const validationSchema = Yup.object().shape({
  senhaAntiga: Yup.string().required("Informe a senha antiga"),
  senhaNova: Yup.string()
    .required("Informe a nova senha")
    .min(6, "Senha muito curta"),
  senhaNovaConfirmacao: Yup.string()
    .oneOf([Yup.ref("senhaNova")], "Senhas devem ser iguais")
    .required("Informe a confirmação da nova senha")
    .min(6, "Senha muito curta"),
});

export const FieldsAlterarSenha = ({ handleChangeOpen }) => {
  const { open, close } = useBackdrop();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState({
    antiga: false,
    nova: false,
    confirmacao: false,
  });
  const { user, logout } = useAuthContext();
  const { stopTimer } = useTimerContext();
  const navigate = useNavigate();

  const handleClickShowPassword = fieldName => {
    setShowPassword(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleSubmit = async valuesForm => {
    event.preventDefault();

    try {
      open();
      valuesForm.usuarioId = user.id;
      await post("/Usuario/AlterarSenha", valuesForm);
      enqueueSnackbar("Senha alterada com sucesso!", { variant: "success" });
      handleChangeOpen();
      logout({ callback: () => navigate("/login") });
      stopTimer();
    } catch (err) {
      enqueueSnackbar(err.response.data, { variant: "error" });
    } finally {
      close();
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValuesSenha}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, submitForm, isValid }) => {
          return (
            <Form>
              <Field
                name="senhaAntiga"
                component={FormikTextField}
                label="Senha antiga"
                type={showPassword?.antiga ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("antiga")}
                      >
                        {showPassword?.antiga ? <EyeSlash /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Field
                name="senhaNova"
                component={FormikTextField}
                label="Senha nova"
                type={showPassword?.nova ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("nova")}
                      >
                        {showPassword?.nova ? <EyeSlash /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Field
                name="senhaNovaConfirmacao"
                component={FormikTextField}
                label="Confirmação senha nova"
                type={showPassword?.confirmacao ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("confirmacao")}
                      >
                        {showPassword?.confirmacao ? <EyeSlash /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={() => submitForm()}
                disabled={!(dirty && isValid)}
              >
                Salvar
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
