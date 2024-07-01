import { Grid, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TableDefault } from "../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { Main, PageContainer, Section } from "../../components/PageSkeleton";
import { get } from "../../utils/api";
import { CountryDataForm } from "./components/CountryDataForm/CountryDataForm";
import { SideBarCountry } from "./components/SideBarCountry/SideBarCountry";

const columns = [
  { key: "id", title: "Código" },
  { key: "descricao", title: "Descrição" },
  { key: "dataCadastro", title: "Cadastro" },
  { key: "editar", title: "Editar" },
];

export function PagesCountry({ onSave = null }) {
  const [Country, setCountry] = useState([]);
  const [id, setId] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["Country", { id, descricao }],
    queryFn: () =>
      get(
        `/paises/listar${
          id || descricao
            ? `?${id ? `id=${id}` : ""}${
                descricao ? `${id ? "&" : ""}descricao=${descricao}` : ""
              }`
            : ""
        }`
      ),
  });

  useEffect(() => {
    setCountry(data);
  }, [data]);

  const onSearch = values => {
    setDescricao(values.descricao);
    setId(values.id);
  };

  const handleCancel = () => {
    setSelectedCountry(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedCountry(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarCountry
        setEditarAdicionar={setEditarAdicionar}
        onSearch={onSearch}
      />

      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableDefault
                data={Country}
                handleEditar={item => handleEditar(item)}
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setSelectedCountry(item);
                  setOpen(!open);
                }}
              />
            )}

            {editarAdicionar && (
              <CountryDataForm
                CountryId={selectedCountry?.id}
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
