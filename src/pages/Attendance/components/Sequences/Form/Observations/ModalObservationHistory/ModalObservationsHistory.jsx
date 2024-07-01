import {
  Dialog,
  DialogContent,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import { PencilSimple, PencilSimpleSlash } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Button, IconButton } from "../../../../../../../components";
import { useAuthContext } from "../../../../../../../contexts/AuthContext";
import { useInput } from "../../../../../../../hooks/useInput";
import { THEME } from "../../../../../../../theme";
import { post } from "../../../../../../../utils/api";
import {
  ButtonContainer,
  ContainerListObservations,
  Content,
  Header,
  ListItemTextTypography,
  StyledList,
  TitleContainer,
} from "./styles";

export const ModalObservationsHistory = ({
  observations,
  isDisabled,
  index,
}) => {
  const { onKeyDownBreakLineOnEnter } = useInput();
  const { user: loggedUser } = useAuthContext();
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedObservationId, setSelectedObservationId] = useState(
    observations?.length ? observations[0].observacaoId : null
  );
  const [text, setText] = useState(
    observations?.length ? observations[0].texto : ""
  );

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => post("/usuario/listar"),
  });

  const usuarioId = useMemo(
    () =>
      observations.find(obs => obs.observacaoId === selectedObservationId)
        ?.usuarioId || "",
    [observations, selectedObservationId]
  );

  useEffect(() => {
    setText(
      observations.find(obs => obs.observacaoId === selectedObservationId)
        ?.texto || ""
    );
  }, [selectedObservationId]);

  const handleChangeIsEdit = () => {
    const newValue = !isEdit;
    setIsEdit(newValue);
    if (!newValue)
      setText(
        observations.find(obs => obs.observacaoId === selectedObservationId)
          ?.texto || ""
      );
  };

  const onSave = () => {
    setFieldValue(
      `sequencias.${index}.observacoes`,
      observations.map(obs => {
        if (obs.observacaoId === selectedObservationId) obs.texto = text;
        return obs;
      })
    );

    setIsEdit(false);
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} disabled={isDisabled}>
        Histórico de Observações
      </Button>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Header>Histórico de Observações</Header>

        <DialogContent dividers>
          <Content container wrap="nowrap" spacing={2}>
            <Grid item xs={4}>
              <ContainerListObservations container>
                <Typography variant="subtitle2">Usuário | Data</Typography>
                <StyledList>
                  {observations?.map(observation => (
                    <ListItem key={observation.observacaoId}>
                      <ListItemButton
                        onClick={() =>
                          setSelectedObservationId(observation.observacaoId)
                        }
                        selected={
                          observation.observacaoId === selectedObservationId
                        }
                      >
                        <ListItemText disabledTypography>
                          <ListItemTextTypography>
                            {
                              users?.find(
                                user => user.id === observation.usuarioId
                              )?.descricao
                            }{" "}
                            |{" "}
                            {format(
                              new Date(observation.data),
                              "dd/MM/yyyy HH:mm"
                            )}
                          </ListItemTextTypography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </StyledList>
              </ContainerListObservations>
            </Grid>
            <Grid item xs={8}>
              <TitleContainer>
                <Typography variant="subtitle2">Observações</Typography>
                {usuarioId === loggedUser.id && (
                  <IconButton onClick={() => handleChangeIsEdit()}>
                    {isEdit ? (
                      <PencilSimpleSlash size={22} color={THEME.COLORS.TEXT} />
                    ) : (
                      <PencilSimple size={22} color={THEME.COLORS.TEXT} />
                    )}
                  </IconButton>
                )}
              </TitleContainer>
              <TextField
                value={text}
                onChange={e => setText(e.target.value)}
                multiline
                rows={20}
                fullWidth
                disabled={!isEdit}
                onKeyDown={e => onKeyDownBreakLineOnEnter(e, text, setText)}
              />

              {isEdit && (
                <ButtonContainer>
                  <Button type="button" onClick={() => onSave()}>
                    Salvar
                  </Button>
                </ButtonContainer>
              )}
            </Grid>
          </Content>
        </DialogContent>
      </Dialog>
    </>
  );
};

ModalObservationsHistory.propTypes = {
  isDisabled: PropTypes.bool,
  observations: PropTypes.array,
};
