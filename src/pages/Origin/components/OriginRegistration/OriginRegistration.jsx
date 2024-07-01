import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { post } from "../../../../utils/api";
import { AddChangeOrigin } from "../AddChangeOrigin/AddChangeOrigin";
import { SideBarOrigin } from "../SideBarOrigin/SideBarOrigin";
import { FormContainer, Main, Section } from "./styles";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function OriginRegistration({ onSave = null }) {
  const [origin, setOrigin] = useState([]);
  const [id, setId] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["origem", { id, descricao }],
    queryFn: () => post("/cadastroAtendimento/listarOrigem", { id, descricao }),
  });

  useEffect(() => {
    setOrigin(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedOrigin(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedOrigin(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarOrigin
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />
      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={origin}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedOrigin(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <AddChangeOrigin
                originId={selectedOrigin?.id}
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
