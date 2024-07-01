import { CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { Container, TextPercentage } from "./styles";

export const CircularProgressWithLabel = ({ value, ...props }) => {
  return (
    <Container>
      <CircularProgress variant="determinate" {...props} />
      <TextPercentage>
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </TextPercentage>
    </Container>
  );
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.any,
};
