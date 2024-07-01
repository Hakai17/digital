import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { TableRowAttendanceSearch } from "./TableRowAttendanceSearch";

const columns = [
  {
    key: "column-1",
    title: "Código",
  },
  {
    key: "column-2",
    title: "Descrição",
  },
  {
    key: "column-3",
    title: "Data Cadastro",
  },
  {
    key: "column-4",
    title: "Respondida",
  },
];

export function TableAttendanceSearch({
  searches,
  onSelectItem,
  showResponseStatus,
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.key}>{column.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {searches?.map(search => (
          <TableRowAttendanceSearch
            key={search.id}
            search={search}
            onClick={() => onSelectItem(search.id)}
            showResponseStatus={showResponseStatus}
          />
        ))}
      </TableBody>
    </Table>
  );
}

TableAttendanceSearch.propTypes = {
  searches: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func,
  showResponseStatus: PropTypes.boolean,
};
