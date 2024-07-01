import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import { Field } from "formik";
import { FormikTextField, SelectField } from "../..";
import { FUNCAO } from "../../../pages/Attendance/constants";
import { get } from "../../../utils/api";
import { RowActions } from "./RowActions";
import { Container, StyledButton, TableContainer } from "./styles";

const columns = removeProduct => [
  { field: "produtoId", headerName: "Código", width: 150, editable: false },
  { field: "descricao", headerName: "Descrição", width: 350, editable: false },
  {
    field: "quantidade",
    headerName: "Quantidade",
    width: 150,
    type: "number",
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    cellClassName: "actions",
    width: 150,
    getActions: ({ id }) => [
      <RowActions key={id} removeProduct={() => removeProduct(id)} />,
    ],
  },
];

export const TableProductsToReplace = ({
  productsToReplace,
  onChangeProducts,
}) => {
  const [productId, setProductId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => get("/produto/listar?somenteAtivo=true"),
  });

  const productsToReplaceActives = useMemo(
    () => productsToReplace?.filter(p => p.funcao !== FUNCAO.D) || [],
    [productsToReplace]
  );

  const addProduct = () => {
    if (productId) {
      const product = {
        produtoId: productId,
        descricao: products.find(p => p.id === productId).descricao,
        quantidade: quantidade,
        funcao: FUNCAO.I,
      };
      onChangeProducts(products => [...products, product]);
      setProductId(null);
      setQuantidade(1);
    }
  };

  const removeProduct = id => {
    onChangeProducts(products => {
      let product = products.find(p => p.produtoId === id);

      if (product.funcao === FUNCAO.U) {
        product.funcao = FUNCAO.D;
        return products.map(p => (p.id === id ? product : p));
      }

      return products.filter(p => p.produtoId !== id);
    });
  };

  const handleQtd = qtd => {
    if (qtd > 0) setQuantidade(qtd);
  };

  return (
    <>
      <Container container direction="column" spacing={2}>
        <Grid item>
          <Grid container spacing={2} wrap="nowrap">
            <Grid item xs={4}>
              <SelectField
                fullWidth
                options={products}
                getDescription={item => item.id}
                value={productId}
                onChange={e => setProductId(e.target.value)}
                label="Código Produto"
              />
            </Grid>

            <Grid item xs={8}>
              <SelectField
                fullWidth
                options={products}
                value={productId}
                onChange={e => setProductId(e.target.value)}
                label="Nome Produto"
              />
            </Grid>

            <Grid item xs={1}>
              <Field
                name="qtd"
                type="number"
                component={FormikTextField}
                value={quantidade}
                fullWidth
                label="Qtd"
                onChange={e => handleQtd(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <StyledButton onClick={() => addProduct()}>
          Adicionar Produto
        </StyledButton>
      </Container>

      <TableContainer>
        <DataGrid
          getRowId={row => row.produtoId}
          editMode="row"
          rows={productsToReplaceActives}
          columns={columns(removeProduct)}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </TableContainer>
      <Container container direction="column" spacing={2}>
        <Grid item>
          <Field
            fullWidth
            component={FormikTextField}
            name="retirar"
            label="Retirar"
            type="number"
            min="0"
          />
        </Grid>
      </Container>
    </>
  );
};

TableProductsToReplace.propTypes = {
  productsToReplace: PropTypes.array.isRequired,
  onChangeProducts: PropTypes.func.isRequired,
};
