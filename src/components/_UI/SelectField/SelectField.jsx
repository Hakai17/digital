import {
  InputAdornment,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";

import { useFormikContext } from "formik";
import { StyledCircularProgress } from "./styles";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const SelectField = ({
  options,
  getId = item => item.id,
  getDescription = item => item.descricao,
  isLoading = false,
  ...props
}) => {
  const [searchText, setSearchText] = useState("");
  const { values } = useFormikContext();

  const displayedOptions = useMemo(
    () =>
      searchText
        ? options?.filter(option => containsText(option.descricao, searchText))
        : options,
    [searchText, options]
  );

  const handleDescription = useCallback(item => getDescription(item), [values]);

  return (
    <TextField
      style={{ marginBottom: 5 }}
      select
      onClose={() => setSearchText("")}
      SelectProps={{
        MenuProps: { autoFocus: false },
        IconComponent: props =>
          isLoading ? (
            <StyledCircularProgress {...props} size={23} />
          ) : (
            <CaretDown {...props} size={16} weight="fill" />
          ),
      }}
      {...props}
    >
      <ListSubheader>
        <TextField
          size="small"
          autoFocus
          placeholder="Buscar"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlass size={14} weight="bold" />
              </InputAdornment>
            ),
          }}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key !== "Escape") {
              e.stopPropagation();
            }
          }}
        />
      </ListSubheader>

      {displayedOptions?.map(option => (
        <MenuItem key={String(getId(option))} value={String(getId(option))}>
          {handleDescription(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectField.defaultProps = {
  value: "",
};

SelectField.propTypes = {
  options: PropTypes.array,
  getId: PropTypes.func,
  getDescription: PropTypes.func,
  isLoading: PropTypes.bool,
};
