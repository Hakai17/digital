import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Main, PageContainer, Section } from "../../components";
import { TableDefault } from "../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../utils/api";
import { Indicator5DataForm } from "./components/Indicator5DataForm";
import { SideBarIndicator5 } from "./components/SideBarIndicator5";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function PagesIndicator5({ onSave = null }) {
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: indicators5, refetch } = useQuery({
    queryKey: ["indicators5", { id, descricao }],
    queryFn: () => post("/produto/listagemId5", { id, descricao }),
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
    setSelectedIndicator(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedIndicator(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarIndicator5
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={indicators5}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedIndicator(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <Indicator5DataForm
                indicatorId={selectedIndicator?.id}
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
