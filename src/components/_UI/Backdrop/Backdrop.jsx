import { CircularProgress } from "@mui/material";

import { useBackdrop } from "../../../contexts/BackdropContext";
import { Mask } from "./styles";

export const Backdrop = () => {
  const { opened } = useBackdrop();

  return (
    <Mask open={opened}>
      <CircularProgress />
    </Mask>
  );
};
