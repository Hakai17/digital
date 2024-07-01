import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { get } from "../../../../utils/api";
import { AddChangeManifestation } from "../AddChangeManifestation/AddChangeManifestation";
import { SideBarManifestation } from "../SideBarManifestation/SideBarManifestation";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function ManifestationRegistration({ onSave = null }) {
  const [manifestation, setManifestation] = useState([]);
  const [descricao, setDescricao] = useState(false);
  const [selectedManifestation, setSelectedManifestation] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["manifestacao", descricao],
    queryFn: () =>
      get(`/manifestacao/listar${descricao ? `?descricao=${descricao}` : ""}`),
  });

  useEffect(() => {
    setManifestation(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
  };

  const handleCancel = () => {
    setSelectedManifestation(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedManifestation(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarManifestation
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={manifestation}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedManifestation(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <AddChangeManifestation
                manifestationId={selectedManifestation?.id}
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
