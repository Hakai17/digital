import { GridActionsCellItem } from "@mui/x-data-grid";
import { TrashSimple } from "@phosphor-icons/react";
import PropTypes from "prop-types";

export const RowActions = ({ removeProduct }) => {
  return (
    <GridActionsCellItem
      icon={<TrashSimple size={22} weight="fill" />}
      label="Delete"
      onClick={removeProduct}
    />
  );
};
RowActions.propTypes = {
  removeProduct: PropTypes.func.isRequired,
};
