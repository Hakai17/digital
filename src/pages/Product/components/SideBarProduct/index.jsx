import { Button, Toolbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { Field, Form, Formik } from "formik";
import { convertPayloadKeys } from "payload-transformer";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  FormikSelectField,
  TypographyTitle,
} from "../../../../components";
import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get, post } from "../../../../utils/api";
import {
  Box,
  ContainerButtons,
  Content,
  SidebarProductContainer,
  StyledButton,
} from "./styles";

const initialValues = {
  id: "",
  descricao: "",
  grupoPorId: "",
};

export const SideBarProduct = ({ onSearch, setEditarAdicionar }) => {
  const { open, close } = useBackdrop();
  const { data: group } = useQuery({
    queryKey: ["group"],
    queryFn: () => get("/produto/listarGRP?somenteAtivo=true"),
  });

  const { data: products, mutate } = useMutation({
    mutationFn: async filters => {
      try {
        open();
        const data = await post("/produto/listagem", filters);
        return convertPayloadKeys(data, "camelCase");
      } finally {
        close();
      }
    },
  });

  useEffect(() => {
    if (products) onSearch(products);
  }, [products]);

  return (
    <SidebarProductContainer
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
              <TypographyTitle>Produtos</TypographyTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item1">
                  <AccordionHeader>
                    <AccordionTrigger>Opções de busca</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Content container spacing={2}>
                      <Field
                        component={FormikTextFieldSmall}
                        size="small"
                        label="Código"
                        name="id"
                      />
                      <Field
                        component={FormikTextFieldSmall}
                        size="small"
                        label="Descricao"
                        name="descricao"
                      />

                      <Field
                        component={FormikSelectField}
                        size="small"
                        label="Grupo"
                        name="GrupoPorId"
                        options={group}
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
    </SidebarProductContainer>
  );
};
