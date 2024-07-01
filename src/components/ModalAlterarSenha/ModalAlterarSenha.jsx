import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { X } from "@phosphor-icons/react";
import { FieldsAlterarSenha } from "../FieldsAlterarSenha/FieldsAlterarSenha";
import { IconButton } from "../_UI/IconButton/IconButton";
import { StyledDialogActions } from "./styles";

export const ModalAlterarSenha = ({ open, handleChangeOpen }) => {
  // eslint-disable-next-line no-unused-vars
  const handleClose = (event = {}, reason = "backdropClick") => {
    if (reason === "backdropClick") {
      return;
    } else {
      handleChangeOpen(false);
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={() => handleClose}>
        <StyledDialogActions>
          <DialogTitle>Alterar senha</DialogTitle>

          <IconButton onClick={() => handleChangeOpen(false)} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </StyledDialogActions>

        <DialogContent dividers>
          <FieldsAlterarSenha handleChangeOpen={handleChangeOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
