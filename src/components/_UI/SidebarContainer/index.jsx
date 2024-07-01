import { Toolbar } from "@mui/material";
import PropTypes from "prop-types";

import { Box, Container } from "./styles";

export const SidebarContainer = ({ ...props }) => {
  return (
    <Container
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: {
          position: "absolute",
        },
      }}
    >
      <Toolbar />

      <Box>{props.children}</Box>
    </Container>
  );
};

SidebarContainer.propTypes = {
  startAttendance: PropTypes.func,
  closeAttendance: PropTypes.func,
  setConsumers: PropTypes.func,
};
