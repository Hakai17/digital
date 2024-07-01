import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { get } from "../../../../utils/api";
import { AddChangeManifestationSubComp } from "../AddChangeManifestationSubComp/AddChangeManifestationSubComp";
import { SideBarManifestationSubComp } from "../SideBarManifestationSubComp/SideBarManifestationSubComp";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "manifestacaoId", title: "Manifestação" },
  { key: "complementoManifestacaoId", title: "Complemento" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function ManifestationSubCompRegistration({ onSave = null }) {
  const [manifestation, setManifestation] = useState([]);
  const [descricao, setDescricao] = useState(false);
  const [manifestacaoId, setManifestacaoId] = useState(false);
  const [complementoManifestacaoId, setComplementoManifestacaoId] =
    useState(false);
  const [selectedManifestation, setSelectedManifestation] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: [
      "subComplemento",
      descricao,
      manifestacaoId,
      complementoManifestacaoId,
    ],
    queryFn: () =>
      get(
        `/manifestacao/listarSubCompManifestacao${
          descricao || manifestacaoId || complementoManifestacaoId
            ? `?${descricao ? `descricao=${descricao}` : ""}${
                manifestacaoId
                  ? `${descricao ? "&" : ""}manifestacaoId=${manifestacaoId}`
                  : ""
              }${
                complementoManifestacaoId
                  ? `${
                      descricao || manifestacaoId ? "&" : ""
                    }complementoManifestacaoId=${complementoManifestacaoId}`
                  : ""
              }`
            : ""
        }`
      ),
  });

  useEffect(() => {
    setManifestation(data);
  }, [data]);

  const onSearch = values => {
    setManifestacaoId(values.manifestacaoId);
    setComplementoManifestacaoId(values.complementoManifestacaoId);
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
      <SideBarManifestationSubComp
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
              <AddChangeManifestationSubComp
                manifestationId={selectedManifestation?.manifestacaoId}
                manifestationCompId={
                  selectedManifestation?.complementoManifestacaoId
                }
                manifestationSubCompId={selectedManifestation?.id}
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
