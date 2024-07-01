import { Button, Toolbar } from "@mui/material";
import { Field, Form, Formik } from "formik";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  TypographyTitle,
} from "../../../../components";
import { FormikTextFieldSmall } from "../../../../components/_UI/FormikTextField/FormikTextField";
import {
  Box,
  ContainerButtons,
  Content,
  SidebarUserContainer,
  StyledButton,
} from "./styles";

const initialValues = {
  id: "",
  descricao: "",
};

export const SideBarUser = ({ onSearch, setEditarAdicionar }) => {
  return (
    <SidebarUserContainer
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
        <Formik initialValues={initialValues} onSubmit={onSearch}>
          {({ resetForm, submitForm }) => (
            <Form>
              <TypographyTitle>Usuários</TypographyTitle>
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
                        label="Nome"
                        name="descricao"
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
    </SidebarUserContainer>
  );
};
