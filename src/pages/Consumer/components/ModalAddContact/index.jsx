import { UserPlus } from "@phosphor-icons/react";
import { Field, Formik } from "formik";
import {
  FormikSelectField,
  FormikTextField,
  IconButton,
  Modal,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from "../../../../components";
import { Button } from "../../../../components/_UI/Button/Button";
import { StyledForm, StyledModalContent, Title } from "./styles";

const initialValues = {
  cep: "",
  tipoEndereco: "",
  endereco: "",
  complemento: "",
  bairro: "",
  pais: "",
  estado: "",
  cidade: "",
  principal: false,
};

const options = [{ id: 1, descricao: "TESTE" }];

export const ModalAddContact = ({ open, onOpenChange }) => {
  return (
    <Modal open={open !== undefined ? open : false} onOpenChange={onOpenChange}>
      {open === undefined ? (
        <ModalTrigger asChild>
          <IconButton>
            <UserPlus size={22} weight="fill" />
          </IconButton>
        </ModalTrigger>
      ) : null}

      <ModalPortal>
        <ModalOverlay />
        <StyledModalContent>
          <Title>Contato</Title>
          <Formik initialValues={initialValues}>
            {() => (
              <StyledForm>
                <Field
                  fullWidth
                  name="nome"
                  component={FormikTextField}
                  label="Nome"
                />
                <Field
                  fullWidth
                  name="telefone"
                  component={FormikTextField}
                  label="Telefone"
                />
                <Field
                  fullWidth
                  name="celular"
                  component={FormikTextField}
                  label="Celular"
                />
                <Field
                  fullWidth
                  name="ramal"
                  component={FormikTextField}
                  label="Ramal"
                />
                <Field
                  fullWidth
                  name="email"
                  component={FormikTextField}
                  label="E-mail"
                />
                <Field
                  fullWidth
                  name="hobby"
                  component={FormikTextField}
                  label="Hobby"
                />
                <Field
                  fullWidth
                  name="nascimento"
                  component={FormikTextField}
                  label="Nascimento"
                />
                <Field
                  fullWidth
                  name="departamento"
                  component={FormikSelectField}
                  options={options}
                  label="Departamento"
                />
                <Field
                  fullWidth
                  name="cargo"
                  component={FormikSelectField}
                  options={options}
                  label="Cargo"
                />
                <Field
                  fullWidth
                  name="grau"
                  component={FormikSelectField}
                  options={options}
                  label="Grau de Decisão"
                />
                <Button>Salvar</Button>
              </StyledForm>
            )}
          </Formik>
          {/* <ModalClose asChild>
            <StyledIconButton>
              <X size={32} />
            </StyledIconButton>
          </ModalClose> */}
        </StyledModalContent>
      </ModalPortal>
    </Modal>
  );
};
