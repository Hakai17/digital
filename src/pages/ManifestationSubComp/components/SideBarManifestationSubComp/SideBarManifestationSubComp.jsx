import { Button, Toolbar } from "@mui/material";
import { Form, Formik } from "formik";
import { FieldsSearchManifestation } from "../FieldsSearchManifestation/FieldsSearchManifestation";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components";
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
  descricao: "",
  manifestacaoId: "",
  compManifestacaoId: "",
};

export const SideBarManifestationSubComp = ({
  onSearch,
  setEditarAdicionar,
}) => {
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
        <Formik initialValues={initialValues} onSubmit={onSearch}>
          {({ resetForm, submitForm }) => (
            <Form>
              <TypographyTitle>Sub Complemento</TypographyTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item1">
                  <AccordionHeader>
                    <AccordionTrigger>Opções de busca</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Content container spacing={2}>
                      <FieldsSearchManifestation />
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
