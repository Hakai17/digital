import { MagnifyingGlass } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { IconButton } from "../../_UI/IconButton/IconButton";
import { Container, Input } from "./styles";

export const SearchTextField = ({ ...props }) => {
  return (
    <Container>
      <Input {...props} />
      <IconButton type="submit">
        <MagnifyingGlass size={18} weight="bold" />
      </IconButton>
    </Container>
  );
};

SearchTextField.propTypes = {
  iconSize: PropTypes.number,
};
