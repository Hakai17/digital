import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { convertPayloadKeys } from "payload-transformer";
import { useState } from "react";
import { FormikSelectField } from "../..";
import { get } from "../../../utils/api";
import { TableDefault } from "../../ModalSearchConsumer/TableDefault/TableDefault";
import { TabContent, TextField } from "../styles";
import { FieldAttachment } from "./FieldAttachment";

const columnsObs = [
  { key: "observacoes", title: "Observações" },
  { key: "usuario", title: "Usuário" },
  { key: "data", title: "Data" },
];

const procedenteoptions = [
  { id: 0, descricao: "Não" },
  { id: 1, descricao: "Sim" },
  { id: 2, descricao: "Indefinido" },
];

export const FieldsAnalise = ({
  observacoes = [],
  anexos = [],
  enableAnalysis,
}) => {
  const [value, setValue] = useState("1");
  const { values, setFieldValue } = useFormikContext();

  const { data: cause } = useQuery({
    queryKey: ["cause"],
    queryFn: () => get("/causa/listar?somenteAtivo=true"),
  });

  const { data: conclusion } = useQuery({
    queryKey: ["conclusion"],
    queryFn: () => get("/conclusao/listar?somenteAtivo=true"),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="causaId"
          label="Causa"
          options={cause}
          disabled={!enableAnalysis}
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="conclusaoId"
          label="Conclusão"
          options={conclusion}
          disabled={!enableAnalysis}
        />
      </Grid>

      <Grid item>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} centered>
              <Tab label="Análise" value="1" />
              <Tab label="Resposta Técnica" value="2" />
              <Tab label="Ações" value="3" />
              <Tab label="Observações" value="4" />
            </TabList>
          </Box>
          <TabContent>
            <TabPanel value="1">
              <Field
                name="textoAnalise"
                component={TextField}
                label="Análise"
                fullWidth
                multiline
                rows={20}
                disabled={!enableAnalysis}
                onChange={e => setFieldValue("textoAnalise", e.target.value)}
                value={values?.textoAnalise}
              />
            </TabPanel>
            <TabPanel value="2">
              <Field
                name="textoRespostaTecnica"
                component={TextField}
                label="Resposta Técnica"
                fullWidth
                multiline
                rows={20}
                disabled={!enableAnalysis}
                onChange={e =>
                  setFieldValue("textoRespostaTecnica", e.target.value)
                }
                value={values?.textoRespostaTecnica}
              />
            </TabPanel>
            <TabPanel value="3">
              <Field
                name="textoAcao"
                component={TextField}
                label="Ação"
                fullWidth
                multiline
                rows={20}
                disabled={!enableAnalysis}
                onChange={e => setFieldValue("textoAcao", e.target.value)}
                value={values?.textoAcao}
              />
            </TabPanel>
            <TabPanel value="4">
              <TableDefault
                data={convertPayloadKeys(observacoes, "camelCase")}
                columns={columnsObs}
              />
            </TabPanel>
          </TabContent>
        </TabContext>
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="procedente"
          label="Procedente"
          options={procedenteoptions}
          disabled={!enableAnalysis}
        />
      </Grid>

      <Grid item>
        <Typography component="span" variant="h5">
          Arquivos relacionados
        </Typography>
        <FieldAttachment files={anexos} />
      </Grid>
    </Grid>
  );
};
