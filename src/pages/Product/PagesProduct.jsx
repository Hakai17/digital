import { Grid, Toolbar } from "@mui/material";
import { useState } from "react";

import { Main, PageContainer, Section } from "../../components";
import { ProductDataForm } from "./components/ProductDataForm";
import { SideBarProduct } from "./components/SideBarProduct";
import { TableProduct } from "./components/TableProduct";

const columns = containsSelect => {
  const col = [
    { key: "id", title: "Código" },
    { key: "descricao", title: "Descrição" },
    { key: "cadastro", title: "Cadastro" },
    { key: "situacao", title: "Situação" },
  ];

  if (containsSelect) col.push({ key: "select", title: "Selecionar" });

  col.push({ key: "editar", title: "Editar" });

  return col;
};

export function PagesProduct({ onClickCallback = null, onSave = null }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);

  const handleCancel = () => {
    setSelectedProduct(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedProduct(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarProduct
        onSearch={setProducts}
        setEditarAdicionar={setEditarAdicionar}
      />

      <Main>
        <PageContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableProduct
                products={products}
                onClickCallback={values =>
                  onClickCallback ? onClickCallback(values) : handleEditar
                }
                handleEditar={handleEditar}
                columns={columns(!!onClickCallback)}
              />
            )}

            {editarAdicionar && (
              <ProductDataForm
                productId={selectedProduct?.id}
                handleCancel={handleCancel}
                onSave={() => {
                  onSave && onSave();
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
