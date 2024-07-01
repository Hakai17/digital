import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Repeat, X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { get } from "../../utils/api";
import { IconButton } from "../_UI/IconButton/IconButton";
import { StyledDialogActions } from "./styles";

export const ModalCapitalExpress = ({ contatoId }) => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleClose = (event = {}, reason = "backdropClick") => {
    if (reason === "backdropClick") {
      return;
    } else {
      setOpen(false);
    }
  };

  const { data: integracoes } = useQuery({
    queryKey: ["integracoes", contatoId],
    queryFn: () => get(`/CapitalExpress/ConsultarStatus?contato=${contatoId}`),
    enabled: open,
  });

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => setOpen(true)}
        disabled={!contatoId}
      >
        <Tooltip title="Consultar capital express">
          <Repeat size={28} color="#3ae945" weight="bold" />
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
          <DialogTitle>
            <Typography variant="h5" align="left">
              Integração
            </Typography>
          </DialogTitle>

          <IconButton onClick={() => setOpen(false)} color="primary">
            <X size={26} weight="bold" />
          </IconButton>
        </StyledDialogActions>

        <DialogContent dividers>
          {integracoes?.wSNISSIN?.status?.visita?.map((integracao, i) => (
            <Grid
              key={i}
              xs={12}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  defaultValue="Integração"
                  value={"Integração " + integracao["@nItem"]}
                  margin="dense"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={1.5} item>
                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Integração"
                    defaultValue=" "
                    value={
                      integracao.dataDaInput != ""
                        ? integracao.dataDaInput
                        : " "
                    }
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Realizado"
                    defaultValue=" "
                    value={integracao.realizado === "True" ? "Sim" : "Não"}
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid xs={1.5} item>
                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Leitura"
                    defaultValue=" "
                    value={
                      integracao.dataDaLeitura != ""
                        ? integracao.dataDaLeitura
                        : " "
                    }
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Coletado"
                    defaultValue=" "
                    value={integracao.coletado === "True" ? "Sim" : "Não"}
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid xs={1.5} item>
                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Visita"
                    defaultValue=" "
                    value={
                      integracao.dataDaVisita != ""
                        ? integracao.dataDaVisita
                        : " "
                    }
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="ColetaOk"
                    defaultValue=" "
                    value={integracao.coletaOk === "True" ? "Sim" : "Não"}
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid xs={1.5} item>
                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Recebido"
                    defaultValue=" "
                    value={
                      integracao.recebidoPor != ""
                        ? integracao.recebidoPor
                        : " "
                    }
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    multiline
                    minRows={2}
                    label="Cancelado"
                    defaultValue=" "
                    value={!integracao.cancelado === "True" ? "Sim" : "Não"}
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid xs={6} item>
                <Grid>
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label="Observação"
                    defaultValue=" "
                    value={integracao.obs != "" ? integracao.obs : " "}
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

ModalCapitalExpress.propTypes = {
  contatoId: PropTypes.number,
};
