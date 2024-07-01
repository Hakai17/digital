import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { NotePencil, PhoneOutgoing } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { IconButton } from "../../_UI/IconButton/IconButton";
import { ActionRow, Body, Container, TableContainer } from "./styles";

export const TableConsumers = ({
  consumers,
  onClickCallback,
  handleEditar,
  columns,
}) => {
  const renderCellsBody = ({ column, consumer }) => {
    switch (column.key) {
      case "telefone": {
        return (
          <TableCell>
            {!!consumer.dDDTelefone && consumer.dDDTelefone !== 0 && (
              <>
                {"("}
                {consumer.dDDTelefone}
                {") "}
              </>
            )}
            {!!consumer.telefone && consumer.telefone}
          </TableCell>
        );
      }
      case "celular": {
        return (
          <TableCell>
            {!!consumer.dDDCelular && consumer.dDDCelular !== 0 && (
              <>
                {"("}
                {consumer.dDDCelular}
                {") "}
              </>
            )}
            {!!consumer.celular && consumer.celular}
          </TableCell>
        );
      }
      case "editar": {
        return (
          <TableCell>
            <IconButton onClick={() => handleEditar(consumer)} color="primary">
              <NotePencil size={32} />
            </IconButton>
          </TableCell>
        );
      }
      case "select": {
        return (
          <TableCell>
            <IconButton
              onClick={() => onClickCallback(consumer)}
              color="primary"
            >
              <PhoneOutgoing size={32} />
            </IconButton>
          </TableCell>
        );
      }

      default:
        return <TableCell>{consumer[column.key]}</TableCell>;
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
            {consumers?.map(consumer => (
              <ActionRow key={consumer.id} hover>
                {columns.map(column => renderCellsBody({ column, consumer }))}
              </ActionRow>
            ))}
          </Body>
        </Table>
      </TableContainer>
    </Container>
  );
};

TableConsumers.propTypes = {
  consumers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nome: PropTypes.string,
      dDDTelefone: PropTypes.number,
      telefone: PropTypes.string,
      dDDCelular: PropTypes.number,
      celular: PropTypes.number,
    })
  ),
  onClickCallback: PropTypes.func,
};
