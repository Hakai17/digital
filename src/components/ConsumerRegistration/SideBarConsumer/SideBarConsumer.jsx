import { Button, Toolbar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { convertPayloadKeys } from "payload-transformer";
import { useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  FilterConsumerSideBar,
} from "../..";
import { useBackdrop } from "../../../contexts/BackdropContext";
import { post } from "../../../utils/api";
import {
  Box,
  Container,
  ContainerButtons,
  Content,
  StyledButton,
  TypographyTitle,
} from "./styles";

const initialValues = {
  id: "",
  ddd: "",
  telefone: "",
  pessoaContato: false,
  codigoCrm: "",
  nome: "",
  cep: "",
  cnpj: "",
  cpf: "",
  dataCadastro: "",
  dataNascimento: "",
  tipoConsumidorId: 0,
  rg: "",
  email: "",
};

export const SideBarConsumer = ({ onSearch, setEditarAdicionar }) => {
  const { open, close } = useBackdrop();
  const {
    data: consumers,
    mutate,
    isLoading,
  } = useMutation({
    mutationFn: async filters => {
      try {
        open();
        const data = await post("/consumidor/listarPeloAtendimento", filters);
        return convertPayloadKeys(data, "camelCase");
      } finally {
        close();
      }
    },
  });

  useEffect(() => {
    if (consumers) onSearch(consumers);
  }, [consumers]);

  return (
    <Container
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: {
          position: "absolute",
        },
      }}
    >
      <Toolbar />

      <Box>
        <Formik initialValues={initialValues} onSubmit={mutate}>
          {({ resetForm, submitForm }) => (
            <Form>
              <TypographyTitle>Consumidores</TypographyTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item1">
                  <AccordionHeader>
                    <AccordionTrigger>Opções de busca</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Content container spacing={2}>
                      <FilterConsumerSideBar isLoading={isLoading} />
                    </Content>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item2">
                  <AccordionHeader>
                    <AccordionTrigger>Buscar por período</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Content container spacing={2}>
                      <FilterConsumerSideBar
                        isLoading={isLoading}
                        typeFilter={"dataNascimento"}
                      />
                    </Content>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item3">
                  <AccordionHeader>
                    <AccordionTrigger>Dados adicionais</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Content container spacing={2}>
                      <FilterConsumerSideBar
                        isLoading={isLoading}
                        typeFilter={"dataCadastro"}
                      />
                    </Content>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <StyledButton
                type="button"
                onClick={() => setEditarAdicionar(true)}
              >
                Incluir novo
              </StyledButton>
              <ContainerButtons>
                <Button color="error" onClick={() => resetForm()}>
                  Limpar
                </Button>
                <Button onClick={() => submitForm()}>Buscar</Button>
              </ContainerButtons>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
