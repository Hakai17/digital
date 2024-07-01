import { TableCell } from "@mui/material";
import { Check } from "@phosphor-icons/react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { Row } from "./styles";

export function TableRowAttendanceSearch({
  search,
  onClick,
  showResponseStatus,
}) {
  return (
    <Row hover onClick={onClick}>
      <TableCell>{search.id}</TableCell>
      <TableCell>{search.descricao}</TableCell>
      <TableCell>
        {format(new Date(search.dataCadastro), "dd/MM/yyyy")}
      </TableCell>
      <TableCell>
        {showResponseStatus && search.respondida && <Check size={20} />}
      </TableCell>
    </Row>
  );
}

TableRowAttendanceSearch.propTypes = {
  search: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    dataCadastro: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  showResponseStatus: PropTypes.boolean,
};
