import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { IconButton } from "../../components/_UI/IconButton/IconButton";

import { ConsumerRegistration } from "../ConsumerRegistration";
import { Content, StyledPaper } from "./styles";

export const ModalSearchConsumer = ({
  onClickCallback,
  isDisabled,
  externalOpen = null,
  setExternalOpen = null,
  simpleView = false,
  telefoneConsumidor = undefined,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = useMemo(
    () => externalOpen || internalOpen,
    [externalOpen, internalOpen]
  );

  const setOpen = useCallback(
    newValue => {
      if (setExternalOpen) setExternalOpen(newValue);

      setInternalOpen(newValue);
    },
    [setExternalOpen, setInternalOpen]
  );

  const handleCallback = values => {
    onClickCallback(values);
    setOpen(false);
  };

  return (
    <>
      {!simpleView && (
        <IconButton
          onClick={() => setOpen(true)}
          disabled={isDisabled}
          color="primary"
        >
          <MagnifyingGlass size={26} weight="bold" />
        </IconButton>
      )}

      <Dialog
        fullScreen
        maxWidth="xl"
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={StyledPaper}
      >
        <DialogActions>
          <DialogTitle>Seleção de consumidor</DialogTitle>

          <IconButton onClick={() => setOpen(false)} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </DialogActions>

        <DialogContent dividers>
          <Content container>
            <ConsumerRegistration
              onClickCallback={handleCallback}
              onSave={handleCallback}
              simpleView={simpleView}
              telefoneConsumidor={telefoneConsumidor}
            />
          </Content>
        </DialogContent>
      </Dialog>
    </>
  );
};

ModalSearchConsumer.propTypes = {
  code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  onClickCallback: PropTypes.func,
  isDisabled: PropTypes.bool,
};
