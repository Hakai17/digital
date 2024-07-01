import { Button } from "@mui/material";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useSnackbar } from "notistack";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBackdrop } from "../../contexts/BackdropContext";
import { api } from "../../utils/api";
import { Box, Container, Form, TextField, Title } from "./styles";

const initialValues = {
  usuario: "",
  senha: "",
};

const validationSchema = Yup.object({
  usuario: Yup.string().required("Email é obrigatório!"),
  senha: Yup.string().required("Senha é obrigatória!"),
});

export const PagesLogin = () => {
  const { open, close } = useBackdrop();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async values => {
    try {
      open();

      const { data } = await api.post("/Login/FazerLogin", values);
      login(data);

      if (data) navigate("/home");
    } catch (err) {
      enqueueSnackbar("E-mail ou senha incorretos!", { variant: "error" });
    } finally {
      close();
    }
  };

  return (
    <Container container>
      <Box item xs={3}>
        <img
          src="/assets/images/Logo.png"
          alt="Logo"
          style={{ maxWidth: 300, maxHeight: 82 }}
        />
        <Title variant="h5">Login</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <Field name="usuario" label="Usuario" component={TextField} />
              <Field
                name="senha"
                label="Senha"
                type="password"
                component={TextField}
              />
              <Button type="submit">Entrar</Button>
              <Button>Esqueci a senha</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
