import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Main, PageContainer, Section } from "../../components";
import { TableDefault } from "../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../utils/api";
import { GroupDataForm } from "./components/GroupDataForm";
import { SideBarGroup } from "./components/SideBarGroup/SideBarIndicator";

const columns = [
  { key: "codigo", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function PagesGroup({ onSave = null }) {
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedGroup, setSelectedGroup] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: group, refetch } = useQuery({
    queryKey: ["group", { id, descricao }],
    queryFn: () => post("/produto/listagemGrupoProduto", { id, descricao }),
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
    setSelectedGroup(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedGroup(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarGroup
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={group}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedGroup(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <GroupDataForm
                groupId={selectedGroup?.codigo}
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
