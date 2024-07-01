import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../../../utils/api";
import { AddChangeUrgency } from "../AddChangeUrgency/AddChangeUrgency";
import { SideBarUrgency } from "../SideBarUrgency/SideBarUrgency";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function UrgencyRegistration({ onSave = null }) {
  const [urgency, setUrgency] = useState([]);
  const [id, setId] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [selectedUrgency, setSelectedUrgency] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["urgencia", { id, descricao }],
    queryFn: () =>
      post("/cadastroAtendimento/listarUrgencia", { id, descricao }),
  });

  useEffect(() => {
    setUrgency(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedUrgency(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedUrgency(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarUrgency
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={urgency}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedUrgency(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <AddChangeUrgency
                urgencyId={selectedUrgency?.id}
                handleCancel={handleCancel}
                onSave={() => {
                  onSave && onSave();
                  handleCancel();
                }}
              />
            )}
          </Section>
        </FormContainer>
      </Main>
    </Grid>
  );
}
