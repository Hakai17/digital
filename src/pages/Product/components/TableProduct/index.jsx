import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { NotePencil, PhoneOutgoing } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { IconButton } from "../../../../components/_UI/IconButton/IconButton";
import { ActionRow, Body, Container, TableContainer } from "./styles";

export const TableProduct = ({
  products,
  onClickCallback,
  handleEditar,
  columns,
}) => {
  const renderCellsBody = ({ column, product }) => {
    switch (column.key) {
      case "descricao": {
        return (
          <TableCell>{!!product.descricao && product.descricao}</TableCell>
        );
      }

      case "cadastro": {
        return (
          <TableCell>
            {!!product.dataCadastro && product.dataCadastro}
          </TableCell>
        );
      }

      case "situacao": {
        return <TableCell>{!!product.situacao && product.situacao}</TableCell>;
      }

      case "editar": {
        return (
          <TableCell>
            <IconButton onClick={() => handleEditar(product)} color="primary">
              <NotePencil size={32} />
            </IconButton>
          </TableCell>
        );
      }
      case "select": {
        return (
          <TableCell>
            <IconButton
              onClick={() => onClickCallback(product)}
              color="primary"
            >
              <PhoneOutgoing size={32} />
            </IconButton>
          </TableCell>
        );
      }

      default:
        return <TableCell>{product[column.key]}</TableCell>;
    }
  };

  return (
    <Container>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ key, title }) => (
                <TableCell key={key}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <Body>
            {products?.map(product => (
              <ActionRow key={product.id} hover>
                {columns.map(column => renderCellsBody({ column, product }))}
              </ActionRow>
            ))}
          </Body>
        </Table>
      </TableContainer>
    </Container>
  );
};

TableProduct.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      descricao: PropTypes.string,
      cadastro: PropTypes.string,
      situacao: PropTypes.string,
    })
  ),
  onClickCallback: PropTypes.func,
};
