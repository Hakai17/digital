import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Main, PageContainer, Section } from "../../components";
import { TableDefault } from "../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../utils/api";
import { SideBarUser } from "./components/SideBarUser/SideBarUser";
import { UserDataForm } from "./components/UserDataForm/UserDataForm";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Nome" },
  { key: "login", title: "Login" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function PagesUser({ onSave = null }) {
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: user, refetch } = useQuery({
    queryKey: ["user", { id, descricao }],
    queryFn: () => post("/usuario/listar", { id, descricao }),
  });

  const clearSearch = () => {
    setDescricao("");
    setId("");
  };

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedUser(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarUser
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={user}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedUser(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <UserDataForm
                userId={selectedUser?.id}
                handleCancel={handleCancel}
                onSave={() => {
                  clearSearch();
                  onSave && onSave();
                  refetch();
                  handleCancel();
                }}
              />
            )}
          </Section>
        </PageContainer>
      </Main>
    </Grid>
  );
}
