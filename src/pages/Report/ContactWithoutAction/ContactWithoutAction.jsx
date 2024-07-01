import { Formik } from "formik";
import { TextField } from "@mui/material";
import { Button } from "../../../components/_UI/Button/Button";
import { FormikSelectField } from "../../../components";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/api";
import { useBackdrop } from "../../../contexts/BackdropContext";
import { useSnackbar } from "notistack";
import {
  FormContainer,
  DatePicker,
  Field,
  Fields,
  Flex,
  FlexTitle,
  Title,
  Container,
} from "./styles";
import { FormikTextFieldSmall } from "../../../components/_UI/FormikTextField/FormikTextField";
import { TableDefault } from "../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { convertPayloadKeys } from "payload-transformer";
import { useState } from "react";
import dayjs from "dayjs";

const columns = () => {
  const col = [
    { key: "contatoId", title: " Código" },
    { key: "sequenciaId", title: " Seq" },
    { key: "consumidor", title: "Consumidor" },
    { key: "manifestacao", title: "Manifestacao" },
    { key: "data", title: "Data do Contato" },
  ];

  return col;
};

const initialValues = {
  manifestacaoId: 0,
  dataInicial: dayjs().startOf("day"),
  dataFinal: dayjs().endOf("day"),
  consumidor: "",
};

export function ContactWithoutAction() {
  const { open, close } = useBackdrop();
  const { enqueueSnackbar } = useSnackbar();
  const [contatosSemAcao, setContatosSemAcao] = useState([]);

  const handleExport = async values => {
    try {
      open();
      const data = await get(
        `/relatorio/ExportarContatosSemAcao?dataInicial=${values.dataInicial}&dataFinal=${values.dataFinal}&manifestacaoId=${values.manifestacaoId}&consumidor=${values.consumidor}`
      );
      const buffer = Buffer.from(data, "base64");
      const contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
      const filename = "Contatos Sem Ação";
      const blob = new Blob([buffer], { type: contentType });
      const URL = window.webkitURL || window.URL;
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      a.dataset.downloadurl = [contentType, a.download, a.href].join(":");
      a.click();
      URL.revokeObjectURL(downloadUrl); // cleanup
      enqueueSnackbar("Relatório emitido com sucesso!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    } finally {
      close();
    }
  };

  const handleSubmit = async values => {
    try {
      open();
      const data = await get(
        `/relatorio/ListarContatosSemAcao?dataInicial=${values.dataInicial}&dataFinal=${values.dataFinal}&manifestacaoId=${values.manifestacaoId}&consumidor=${values.consumidor}`
      );
      setContatosSemAcao(data);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    } finally {
      close();
    }
  };
  const { data: manifestations } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, submitForm }) => (
        <>
          <FormContainer>
            <FlexTitle>
              <Title>Contatos Sem Ação</Title>
            </FlexTitle>
            <Flex>
              <Fields>
                <DatePicker
                  label="Data inicial"
                  value={values.dataInicial !== "" ? values.dataInicial : null}
                  onChange={value => setFieldValue("dataInicial", value)}
                  renderInput={props => <TextField {...props} />}
                  slotProps={{ textField: { size: "small" } }}
                />
                <DatePicker
                  label="Data final"
                  value={values.dataFinal !== "" ? values.dataFinal : null}
                  onChange={value => setFieldValue("dataFinal", value)}
                  renderInput={props => <TextField {...props} />}
                  slotProps={{ textField: { size: "small" } }}
                />
                <Field
                  size="small"
                  component={FormikSelectField}
                  name="manifestacaoId"
                  label="Manifestação"
                  options={manifestations}
                />
                <Field
                  component={FormikTextFieldSmall}
                  size="small"
                  label="Consumidor"
                  name="consumidor"
                />
                <Button onClick={submitForm}>Buscar</Button>
                <Button onClick={() => handleExport(values)}>Exportar</Button>
              </Fields>
            </Flex>
          </FormContainer>
          <Container>
            <TableDefault
              data={convertPayloadKeys(contatosSemAcao, "camelCase")}
              columns={columns()}
            />
          </Container>
        </>
      )}
    </Formik>
  );
}
