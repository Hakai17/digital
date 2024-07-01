import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button } from "..";
import { get } from "../../utils/api";
import { FormViewAtendimento } from "./FormViewAtendimento";
import { ButtonContainer, Form, StyledFormik } from "./styles";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome consumidor é obrigatório"),
});

export const ViewAtendimento = ({
  handleCancel,
  atendimento,
  submitAction = null,
}) => {
  const [value, setValue] = useState("1");
  const { data: attendanceDetails, refetch } = useQuery({
    queryKey: ["attendanceDetails"],
    queryFn: () =>
      get(
        `/atendimento/BuscarDetalhes?contatoId=${atendimento?.contatoId}&sequenciaId=${atendimento?.sequenciaId}`
      ),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    refetch();
  }, [atendimento]);

  return (
    <StyledFormik onSubmit={() => {}} validationSchema={validationSchema}>
      {({ resetForm }) => (
        <Form>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} centered>
                <Tab label="Atendimento" value="1" />
                <Tab label="Produto" value="2" />
                <Tab label="Consumidor" value="3" />
                <Tab label="Observações" value="4" />
                <Tab label="Ações" value="5" />
                <Tab label="Anexos" value="6" />
              </TabList>
            </Box>
            <FormViewAtendimento
              attendanceDetails={attendanceDetails}
              attendance={atendimento}
            />
          </TabContext>
          <ButtonContainer>
            {!!submitAction && submitAction()}
            <Button
              onClick={() => {
                resetForm();
                handleCancel();
              }}
            >
              Voltar
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </StyledFormik>
  );
};
