import { Button, TextField, Toolbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { convertPayloadKeys } from "payload-transformer";
import { useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  FieldsSearchManifestation,
  FormikSelectField,
  SidebarContainer,
} from "../../../../components";
import {
  FormikNumberField,
  FormikTextFieldSmall,
} from "../../../../components/_UI/FormikTextField/FormikTextField";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get, post } from "../../../../utils/api";
import { FieldsSearchProduct } from "../FieldsSearchProduct";
import {
  Box,
  ContainerButtons,
  ContentContainer,
  ContentSideBar,
  TypographyTitle,
} from "../History/styles";

// const DEFAULT_TIME = 0;

const initialValues = {
  tipoContatoId: "",
  consumidorId: "",
  cpf: "",
  cnpj: "",
  dataInicial: "",
  dataFinal: "",
  manifestacaoId: "",
  complementoId: "",
  subComplementoId: "",
  origemId: "",
  urgenciaId: "",
  usuarioId: "",
  pesquisaId: "",
  produtoId: "",
};

export function FilterSidebar({ setAtendimentos /* setVerDetalhes */ }) {
  let controlSubmit = null;
  const { open, close } = useBackdrop();

  const { data: atendimentos, mutate } = useMutation({
    mutationFn: async filters => {
      try {
        open();
        const data = await post("/atendimento/ListarHistorico", filters);
        return convertPayloadKeys(data, "camelCase");
      } finally {
        controlSubmit(false);
        close();
      }
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => post("/usuario/listar"),
  });
  const { data: urgencies } = useQuery({
    queryKey: ["urgencies"],
    queryFn: () => get("/urgencia/listar"),
  });
  const { data: sources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => get("origem/listar"),
  });
  const { data: contactTypes } = useQuery({
    queryKey: ["contactTypes"],
    queryFn: () => get("tipoContato/listar"),
  });
  const { data: searches } = useQuery({
    queryKey: ["searches"],
    queryFn: () => get("pesquisa/listar"),
  });

  useEffect(() => {
    if (atendimentos) setAtendimentos(atendimentos);
  }, [atendimentos]);

  return (
    <SidebarContainer>
      <ContentContainer
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
            {({
              resetForm,
              submitForm,
              setSubmitting,
              setFieldValue,
              values,
            }) => (
              <Form>
                <TypographyTitle>Histórico de Atendimentos</TypographyTitle>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item1">
                    <AccordionHeader>
                      <AccordionTrigger>Busca por Código</AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                      <ContentSideBar container spacing={2}>
                        <Field
                          component={FormikNumberField}
                          size="small"
                          label="Contato"
                          name="contatoId"
                          type="number"
                        />
                      </ContentSideBar>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item2">
                    <AccordionHeader>
                      <AccordionTrigger>Busca por Consumidor</AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                      <ContentSideBar container spacing={2}>
                        <Field
                          component={FormikTextFieldSmall}
                          size="small"
                          label="Código Consumidor"
                          name="consumidorId"
                          value={values.consumidorId}
                        />

                        <Field
                          component={FormikTextFieldSmall}
                          size="small"
                          label="CNPJ"
                          name="cnpj"
                          value={values.cnpj}
                        />

                        <Field
                          component={FormikTextFieldSmall}
                          size="small"
                          label="CPF"
                          name="cpf"
                          value={values.cpf}
                        />
                      </ContentSideBar>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item3" type="multiple">
                    <AccordionHeader>
                      <AccordionTrigger>Busca Avançada</AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                      <ContentSideBar container spacing={2}>
                        Período:
                        <DatePicker
                          label="Inicial"
                          value={
                            values.dataInicial !== ""
                              ? values.dataInicial
                              : null
                          }
                          onChange={value =>
                            setFieldValue("dataInicial", value)
                          }
                          renderInput={props => (
                            <TextField
                              style={{ marginBottom: 5 }}
                              {...props}
                              size="small"
                            />
                          )}
                        />
                        <DatePicker
                          label="Final"
                          value={
                            values.dataFinal !== "" ? values.dataFinal : null
                          }
                          onChange={value => setFieldValue("dataFinal", value)}
                          renderInput={props => (
                            <TextField
                              style={{ marginBottom: 5 }}
                              {...props}
                              size="small"
                            />
                          )}
                        />
                        Produto:
                        <FieldsSearchProduct />
                        Manifestação:
                        <FieldsSearchManifestation />
                        Demais dados:
                        <Field
                          size="small"
                          name="usuarioId"
                          component={FormikSelectField}
                          options={users}
                          label="Usuario"
                        />
                        <Field
                          size="small"
                          name="tipoContatoId"
                          component={FormikSelectField}
                          options={contactTypes}
                          label="Contato"
                        />
                        <Field
                          size="small"
                          name="urgenciaId"
                          component={FormikSelectField}
                          options={urgencies}
                          label="Urgência"
                        />
                        <Field
                          size="small"
                          name="origemId"
                          component={FormikSelectField}
                          options={sources}
                          label="Origem"
                        />
                        <Field
                          size="small"
                          name="pesquisaId"
                          component={FormikSelectField}
                          options={searches}
                          label="Pesquisa"
                        />
                      </ContentSideBar>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <ContainerButtons>
                  <Button color="error" onClick={() => resetForm()}>
                    Limpar
                  </Button>
                  <Button
                    onClick={() => {
                      submitForm();
                      controlSubmit = setSubmitting;
                    }}
                  >
                    Buscar
                  </Button>
                </ContainerButtons>
              </Form>
            )}
          </Formik>
        </Box>
      </ContentContainer>
    </SidebarContainer>
  );
}
