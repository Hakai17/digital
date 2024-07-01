import { Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { Package, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { IconButton } from "../../components/_UI/IconButton/IconButton";
import { FormComplaint } from "./FormComplaint/FormComplaint";
import { StyledDialogActions } from "./styles";

export const ModalAddComplaint = ({ complaint, onSubmit, enableAnalysis }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (reason = "backdropClick") => {
    if (reason === "backdropClick") {
      return;
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <Tooltip title="Repor produto">
          <Package size={28} />
        </Tooltip>
      </IconButton>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={() => handleClose}
        disableEscapeKeyDown
      >
        <StyledDialogActions>
          <DialogTitle>Reclamação</DialogTitle>

          <IconButton onClick={() => setOpen(false)} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </StyledDialogActions>

        <DialogContent dividers>
          <FormComplaint
            complaint={complaint}
            onSubmit={onSubmit}
            callback={() => setOpen(false)}
            enableAnalysis={enableAnalysis}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

ModalAddComplaint.propTypes = {
  complaint: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  enableAnalysis: PropTypes.bool,
};
