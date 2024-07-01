import {
  Dialog,
  DialogTitle,
  Button as MUIButton,
  Toolbar,
} from "@mui/material";
import { X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { convertPayloadKeys } from "payload-transformer";
import { useCallback, useMemo, useState } from "react";
import { FormContainer, Section } from "../../pages/Attendance/styles";
import { post } from "../../utils/api";
import { ModalPrintPdf } from "../ModalPrintPdf/ModalPrintPdf";
import { TableDefault } from "../ModalSearchConsumer/TableDefault/TableDefault";
import { ViewAtendimento } from "../ViewAtendimento";
import { Button } from "../_UI/Button/Button";
import { IconButton } from "../_UI/IconButton/IconButton";
import { StyledDialogActions, StyledDialogContent } from "./styles";

const columns = simpleView => {
  const col = [
    { key: "contatoId", title: " Código" },
    { key: "sequenciaId", title: " Seq" },
    { key: "manifestacao", title: "Manifestação" },
    { key: "usuario", title: "Usuário" },
    { key: "data", title: "Data" },
    { key: "status", title: "Status" },
    { key: "select", title: "Selecionar" },
  ];

  if (!simpleView)
    col.push(
      { key: "ver", title: "Ver" },
      { key: "imprimir", title: "Imprimir" }
    );

  return col;
};

export const ModalListaHistoricoConsumidor = ({
  consumidorId,
  onClickCallback,
  disabled,
  externalOpen = null,
  setExternalOpen = null,
  simpleView = false,
}) => {
  const [atendimento, setAtendimento] = useState({});
  const [verDetalhes, setVerDetalhes] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);

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

  const { data: atendimentos } = useQuery({
    queryKey: ["historicoConsumidorList", consumidorId],
    queryFn: () =>
      post("/atendimento/ListarHistorico", { consumidorId: consumidorId }),
    enabled: open,
    cacheTime: 0,
  });

  const handleCancel = () => {
    setVerDetalhes(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClose = (event = {}, reason = "backdropClick") => {
    if (reason === "backdropClick") {
      return;
    } else {
      setOpen(false);
      setAtendimento({});
      setVerDetalhes(false);
    }
  };

  const handleEditar = values => {
    setAtendimento(values);
    setVerDetalhes(true);
  };

  return (
    <>
      {!simpleView && (
        <MUIButton onClick={() => setOpen(true)} disabled={disabled}>
          Histórico do Consumidor
        </MUIButton>
      )}

      <Dialog fullWidth maxWidth="xl" open={open} onClose={() => handleClose()}>
        <StyledDialogActions>
          <DialogTitle>Histórico do Consumidor</DialogTitle>

          <IconButton onClick={() => handleClose({}, "")} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </StyledDialogActions>

        <StyledDialogContent dividers>
          <FormContainer container direction="column" spacing={3}>
            <Toolbar />

            <Section marginLeft={"40px"}>
              {!verDetalhes && (
                <TableDefault
                  data={convertPayloadKeys(atendimentos, "camelCase")}
                  onSelectRow={values => {
                    setOpen(false);
                    onClickCallback(values);
                  }}
                  openPreview={handleEditar}
                  columns={columns(simpleView)}
                  openPrintModal={item => {
                    setAtendimento(item);
                    setOpen(!open);
                  }}
                />
              )}

              {verDetalhes && (
                <ViewAtendimento
                  handleCancel={handleCancel}
                  atendimento={atendimento}
                  submitAction={() => (
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        handleClose({}, "");
                        onClickCallback(atendimento);
                      }}
                    >
                      Abrir atendimento
                    </Button>
                  )}
                />
              )}
            </Section>
          </FormContainer>
          <ModalPrintPdf
            open={openPrint}
            handleChangeOpen={() => setOpenPrint(!openPrint)}
            dataAttendance={atendimento}
          />
        </StyledDialogContent>
      </Dialog>
    </>
  );
};
