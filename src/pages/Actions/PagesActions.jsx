import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { Main, PageContainer, Section } from "../../components/PageSkeleton";
import { get } from "../../utils/api";
import { ActionDataForm } from "./components/ActionDataForm/ActionDataForm";
import { SideBarActions } from "./components/SideBarActions/SideBarActions";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function PagesActions({ onSave = null }) {
  const [action, setAction] = useState([]);
  const [id, setId] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [selectedAction, setSelectedAction] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["action", { id, descricao }],
    queryFn: () =>
      get(
        `/acao/listar${
          id || descricao
            ? `?${id ? `id=${id}` : ""}${
                descricao ? `${id ? "&" : ""}descricao=${descricao}` : ""
              }`
            : ""
        }`
      ),
  });

  useEffect(() => {
    setAction(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedAction(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedAction(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarActions
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />

      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={action}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedAction(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <ActionDataForm
                actionId={selectedAction?.id}
                onCancel={handleCancel}
                onSave={() => {
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
