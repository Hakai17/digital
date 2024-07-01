import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../../../utils/api";
import { AddChangeContact } from "../AddChangeContact/AddChangeContact";
import { SideBarContact } from "../SideBarContact/SideBarContact";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function ContactRegistration({ onSave = null }) {
  const [contact, setContact] = useState([]);
  const [id, setId] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["contato", { id, descricao }],
    queryFn: () =>
      post("/cadastroAtendimento/listarTipoContato", { id, descricao }),
  });

  useEffect(() => {
    setContact(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedContact(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedContact(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarContact
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={contact}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedContact(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <AddChangeContact
                contactId={selectedContact?.id}
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
