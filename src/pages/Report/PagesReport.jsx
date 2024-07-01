import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Field, Formik } from "formik";
import { useSnackbar } from "notistack";
import { FormikSelectField } from "../../components";
import { Button } from "../../components/_UI/Button/Button";
import { useBackdrop } from "../../contexts/BackdropContext";
import { post } from "../../utils/api";
import { Fields, Flex, Title } from "./styles";

const initialValues = {
  tipoRelatorio: "",
  dataInicial: "",
  dataFinal: "",
};

const TIPO_RELATORIO = {
  HISTORICO_CONTATOS: 1,
  OBSERVACOES: 2,
  RECLAMACOES: 3,
};

const descricaoTipoRelatorio = {
  [TIPO_RELATORIO.HISTORICO_CONTATOS]: "Historico de Contatos",
  [TIPO_RELATORIO.OBSERVACOES]: "Observações",
  [TIPO_RELATORIO.RECLAMACOES]: "Reclamações",
};

export function PagesReport() {
  const { open, close } = useBackdrop();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async values => {
    try {
      open();
      const data = await post("/relatorio/exportar", values);
      const buffer = Buffer.from(data, "base64");
      const contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
      const filename = descricaoTipoRelatorio[values.tipoRelatorio];
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

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, submitForm }) => (
        <>
          <Flex>
            <Fields>
              <Title>Relatórios</Title>
              <Field
                fullWidth
                component={FormikSelectField}
                name="tipoRelatorio"
                label="Tipo relatório"
                options={Object.values(TIPO_RELATORIO).map(tipo => ({
                  id: tipo,
                  descricao: descricaoTipoRelatorio[tipo],
                }))}
              />
              <DatePicker
                label="Data inicial"
                value={values.dataInicial !== "" ? values.dataInicial : null}
                onChange={value => setFieldValue("dataInicial", value)}
                renderInput={props => <TextField fullWidth {...props} />}
              />
              <DatePicker
                label="Data final"
                value={values.dataFinal !== "" ? values.dataFinal : null}
                onChange={value => setFieldValue("dataFinal", value)}
                renderInput={props => <TextField fullWidth {...props} />}
              />
              <Button onClick={submitForm}>Exportar</Button>
            </Fields>
          </Flex>
        </>
      )}
    </Formik>
  );
}
