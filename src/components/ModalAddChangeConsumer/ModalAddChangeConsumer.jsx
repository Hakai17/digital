import { Button, DialogTitle } from "@mui/material";
import { useState } from "react";
import { ConsumerDataForm } from "../ConsumerDataForm";
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
} from "./styles";
import { IconButton } from "../_UI/IconButton/IconButton";
import { X } from "@phosphor-icons/react";

export const ModalAddChangeConsumer = ({ consumerId, disabled }) => {
  const [open, setOpen] = useState();
  const handleClose = (reason = "backdropClick") => {
    if (reason === "backdropClick") {
      return;
    } else {
      setOpen(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={disabled}>
        {consumerId || disabled ? "Dados cadastrais" : "Adicionar Consumidor"}
      </Button>

      <StyledDialog
        open={open}
        onClose={() => handleClose}
        fullWidth
        maxWidth="xl"
      >
        <StyledDialogActions>
          <DialogTitle>
            {consumerId ? "Dados cadastrais" : "Adicionar Consumidor"}
          </DialogTitle>
          <IconButton onClick={() => setOpen(false)} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </StyledDialogActions>

        <StyledDialogContent>
          <ConsumerDataForm
            consumerId={consumerId}
            handleCancel={() => {
              setOpen(false);
              consumerId = null;
            }}
            onSave={() => setOpen(false)}
          />
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
};
