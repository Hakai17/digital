import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import {
  MagnifyingGlass,
  NotePencil,
  PhoneOutgoing,
  Printer,
} from "@phosphor-icons/react";
import { IconButton } from "../../_UI/IconButton/IconButton";
import { ActionRow, Body, Container, TableContainer } from "./styles";

export const TableDefault = ({
  data,
  columns,
  openPreview,
  openPrintModal,
  onSelectRow,
  handleEditar,
}) => {
  const renderCellsBody = ({ column, item }) => {
    switch (column.key) {
      case "select":
        return (
          <TableCell key={Math.random()}>
            <IconButton onClick={() => onSelectRow(item)} color="primary">
              <PhoneOutgoing size={32} />
            </IconButton>
          </TableCell>
        );

      case "ver":
        return (
          <TableCell key={Math.random()}>
            <IconButton onClick={() => openPreview(item)} color="primary">
              <MagnifyingGlass size={32} />
            </IconButton>
          </TableCell>
        );

      case "imprimir":
        return (
          <TableCell key={Math.random()}>
            <IconButton onClick={() => openPrintModal(item)} color="primary">
              <Printer size={32} />
            </IconButton>
          </TableCell>
        );

      case "editar": {
        return (
          <TableCell>
            <IconButton onClick={() => handleEditar(item)} color="primary">
              <NotePencil size={32} />
            </IconButton>
          </TableCell>
        );
      }

      default:
        return <TableCell key={Math.random()}>{item[column.key]}</TableCell>;
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
            {data?.map(item => (
              <ActionRow key={item.id} hover>
                {columns.map(column => renderCellsBody({ column, item }))}
              </ActionRow>
            ))}
          </Body>
        </Table>
      </TableContainer>
    </Container>
  );
};
