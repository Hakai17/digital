import { Formik } from "formik";
import { SelectManifestation } from "../../FieldsSearchManifestation/SelectManifestation";
import * as Yup from "yup";
import {
  ChatHistoryContainer,
  ContactName,
  Content,
  ContentButton,
  Header,
  Message,
  StyledButton,
  StyledForm,
} from "./styles";
import { IconButton } from "../../_UI/IconButton/IconButton";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { THEME } from "../../../theme";
import { post } from "../../../utils/api";
import { useSnackbar } from "notistack";

function ChatContact({
  consumerName,
  handleBack,
  consumidorId,
  telefoneConsumidor,
  usuarioId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    manifestacaoId: Yup.string()
      .matches(/[1-9]/, "Selecione uma manifestação")
      .required("Manifestação é obrigatória"),
  });

  const container = {
    initial: {
      opacity: 0,
      padding: 0,
    },
    opened: {
      opacity: 1,
      padding: "1rem",
      transition: {
        delayChildren: 2,
        staggerDirection: 0.5,
      },
    },
    close: {
      transform: "translate(100%)",
      opacity: 0,
    },
  };

  const handleSubmit = async values => {
    try {
      const json = {
        telefoneConsumidor,
        consumidorId,
        manifestacaoId: values.manifestacaoId,
        usuarioId,
      };

      await post("/atendimento/gerarAtendimentoViaWpp", json);

      handleBack();
    } catch (error) {
      enqueueSnackbar(error.response.data, { variant: "error" });
    }
  };

  return (
    <Formik
      initialValues={{ manifestacaoId: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ dirty, isSubmitting }) => (
        <StyledForm>
          <ChatHistoryContainer
            initial="initial"
            animate={"opened"}
            variants={container}
          >
            <Header>
              <IconButton onClick={handleBack}>
                <ArrowCircleLeft size={30} color={THEME.COLORS.PRIMARY} />
              </IconButton>
              <ContactName>{consumerName}</ContactName>
            </Header>
            <Content>
              <Message>
                Selecione a manifestação e clique em Salvar para gerar um novo
                atendimento para este chat e vincular automaticamente as
                mensagens sem atendimento.
              </Message>
              <SelectManifestation />

              <ContentButton>
                <StyledButton type="submit" disabled={!dirty || isSubmitting}>
                  Salvar
                </StyledButton>
              </ContentButton>
            </Content>
          </ChatHistoryContainer>
        </StyledForm>
      )}
    </Formik>
  );
}

export default ChatContact;
