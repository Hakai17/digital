import { useState, useEffect } from "react";
import { TabPanel } from "@mui/lab";
import { Field } from "formik";

import { convertPayloadKeys } from "payload-transformer";
import { TableDefault } from "../../ModalSearchConsumer/TableDefault/TableDefault";
import {
  FormikTextField,
  FormikTextFieldSmall,
} from "../../_UI/FormikTextField/FormikTextField";
import { TabContent } from "../styles";
import { FieldAttachment } from "../../ModalAddComplaint/FieldsComplaint";

const columnsObs = [
  { key: "observacoes", title: "Observações" },
  { key: "usuario", title: "Usuário" },
  { key: "data", title: "Data" },
];

const columnsAcoes = [
  { key: "acoes", title: "Ações" },
  { key: "referencia", title: "Referência" },
  { key: "destinatario", title: "Destinatário" },
  { key: "inicio", title: "Início" },
  { key: "final", title: "Final" },
  { key: "status", title: "Status" },
  { key: "workflow", title: "Workflow" },
];

export function FormViewAtendimento({ attendance, attendanceDetails }) {
  const [anexosObject, setAnexosObject] = useState([]);

  const handleMountObjectAttachment = () => {
    attendanceDetails?.anexos?.map(anexo => {
      let newObject = {
        contatoId: attendance?.contatoId,
        sequenciaId: attendance?.sequenciaId,
        nomeArquivo: anexo,
      };
      setAnexosObject(old => [...old, newObject]);
    });
  };

  useEffect(() => {
    if (anexosObject.length) setAnexosObject([]);
    handleMountObjectAttachment();
  }, [attendanceDetails?.anexos]);

  return (
    <TabContent>
      <TabPanel value="1">
        <Field
          name="manifestacao"
          component={FormikTextFieldSmall}
          size="small"
          label="Código"
          value={`${attendance?.contatoId}/${attendance?.sequenciaId}`}
        />
        <Field
          name="manifestacao"
          component={FormikTextField}
          size="small"
          label="Manifestação"
          fullWidth
          value={attendanceDetails?.atendimento.manifestacao ?? ""}
        />
        <Field
          name="complemento"
          component={FormikTextField}
          fullWidth
          label="Complemento"
          size="small"
          value={attendanceDetails?.atendimento.complemento ?? ""}
        />
        <Field
          name="subComplemento"
          component={FormikTextField}
          fullWidth
          label="Sub-Complemento"
          size="small"
          value={attendanceDetails?.atendimento.subComplemento ?? ""}
        />
        <Field
          name="dataContato"
          component={FormikTextField}
          label="Data do Contato"
          size="small"
          fullWidth
          value={attendanceDetails?.atendimento.dataContato ?? ""}
        />
        <Field
          name="atendente"
          component={FormikTextField}
          label="Atendente"
          size="small"
          fullWidth
          value={attendanceDetails?.atendimento.atendente ?? ""}
        />

        <Field
          label="Pessoa de Contato"
          component={FormikTextField}
          name="pessoaContato"
          size="small"
          value={attendanceDetails?.atendimento.pessoaContato ?? ""}
        />
        <Field
          label="Tipo de Contato"
          component={FormikTextField}
          name="tipoContato"
          size="small"
          value={attendanceDetails?.atendimento.tipoContato ?? ""}
        />
        <Field
          label="Origem"
          component={FormikTextField}
          name="origem"
          size="small"
          value={attendanceDetails?.atendimento.origem ?? ""}
        />
        <Field
          label="urgência"
          component={FormikTextField}
          name="urgencia"
          size="small"
          value={attendanceDetails?.atendimento.urgencia ?? ""}
        />
      </TabPanel>
      <TabPanel value="2">
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          label="Nome"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.produto ?? ""}
        />
        <Field
          name="grupo"
          component={FormikTextField}
          fullWidth
          label="Grupo"
          inputProps={{ maxLength: 50 }}
        />
        <Field
          name="linha"
          component={FormikTextField}
          fullWidth
          label="Linha"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.iD1 ?? ""}
        />
        <Field
          name="marca"
          component={FormikTextField}
          fullWidth
          label="Marca"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.iD2 ?? ""}
        />
        <Field
          name="categoria"
          component={FormikTextField}
          fullWidth
          label="Categoria"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.iD3 ?? ""}
        />
        <Field
          name="embalagem"
          component={FormikTextField}
          fullWidth
          label="Embalagem"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.iD4 ?? ""}
        />
        <Field
          name="indicador5"
          component={FormikTextField}
          fullWidth
          label="Indicador 5"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.produto.iD5 ?? ""}
        />
      </TabPanel>
      <TabPanel value="3">
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Profissão"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.profissao ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Especialidade"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.especialidade ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Consumidor"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.consumidor ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Tipo de Consumidor"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.tipoConsumidor ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Área de Atuação"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.areaAtuacao ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Tipo de Área de Atuação"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.tipoAreaAtuacao ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Empresa"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.empresa ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Telefone"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.telefone ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Celular"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.celular ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="Fax"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.fax ?? ""}
        />
        <Field
          name="nome"
          component={FormikTextField}
          fullWidth
          size="small"
          label="E-mail"
          inputProps={{ maxLength: 50 }}
          value={attendanceDetails?.consumidor.email ?? ""}
        />
      </TabPanel>
      <TabPanel value="4">
        <TableDefault
          data={convertPayloadKeys(attendanceDetails?.observacoes, "camelCase")}
          columns={columnsObs}
        />
      </TabPanel>
      <TabPanel value="5">
        <TableDefault
          data={convertPayloadKeys(attendanceDetails?.acoes, "camelCase")}
          columns={columnsAcoes}
        />
      </TabPanel>
      <TabPanel value="6">
        <FieldAttachment files={anexosObject} />
      </TabPanel>
    </TabContent>
  );
}
