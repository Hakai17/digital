import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { get } from "../../../../utils/api";
import { AddChangeManifestationComp } from "../AddChangeManifestationComp/AddChangeManifestationComp";
import { SideBarManifestationComp } from "../SideBarManifestationComp/SideBarManifestationComp";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "manifestacaoId", title: "Manifestação" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function ManifestationCompRegistration({ onSave = null }) {
  const [complemento, setComplemento] = useState([]);
  const [manifestacaoId, setManifestacaoId] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [selectedManifestation, setSelectedManifestation] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["complementos", { manifestacaoId, descricao }],
    queryFn: () =>
      get(
        `/manifestacao/listarCompManifestacao${
          manifestacaoId || descricao
            ? `?${manifestacaoId ? `manifestacaoId=${manifestacaoId}` : ""}${
                descricao
                  ? `${manifestacaoId ? "&" : ""}descricao=${descricao}`
                  : ""
              }`
            : ""
        }`
      ),
  });

  useEffect(() => {
    setComplemento(data);
  }, [data]);

  const onSearch = values => {
    setManifestacaoId(values.manifestacaoId);
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
      <SideBarManifestationComp
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={complemento}
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
              <AddChangeManifestationComp
                manifestationCompId={selectedManifestation?.id}
                manifestationId={selectedManifestation?.manifestacaoId}
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
