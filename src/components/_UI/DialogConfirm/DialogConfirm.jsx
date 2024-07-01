import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { createRoot } from "react-dom/client";
import { maybeCallback } from "../../../utils/functionHelper";
import { CancelButton, ConfirmButton } from "./styles";

const DialogConfirm = ({
  title = "Confirm Modal",
  content = "Deseja mesmo efetuar essa ação?",
  labelCancel = "Cancelar",
  labelConfirm = "Confirmar",
  callback = () => {},
  unmount,
  ...props
}) => {
  const handleConfirm = () => {
    maybeCallback(callback)();
    unmount();
  };

  return (
    <Dialog disableBackdropClick open {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={() => unmount()}>{labelCancel}</CancelButton>
        <ConfirmButton onClick={handleConfirm}>{labelConfirm}</ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};

export const openDialogConfirm = props => {
  const dialog = createRoot(document.getElementById("dialogConfirm"));
  dialog.render(<DialogConfirm {...props} unmount={() => dialog.unmount()} />);
};

DialogConfirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  labelCancel: PropTypes.string,
  labelConfirm: PropTypes.string,
  callback: PropTypes.func.isRequired,
  unmount: PropTypes.func.isRequired,
};
