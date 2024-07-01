import { Toolbar, Tooltip, Typography } from "@mui/material";
import {
  FloppyDiskBack,
  FolderOpen,
  PhoneCall,
  XCircle,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  IconButton,
  ModalAddChangeConsumer,
  ModalAttendanceSearch,
  ModalListaHistoricoConsumidor,
  SearchTextField,
} from "../../../../components";
import { useAttendanceContext } from "../../../../contexts/AttendanceContext";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { useTimerContext } from "../../../../contexts/TimerContext";
import { THEME } from "../../../../theme";
import { get } from "../../../../utils/api";
import {
  Actions,
  Box,
  Container,
  Content,
  ContentItem,
  ContentSearch,
} from "./styles";

export const Sidebar = ({
  startAttendance,
  closeAttendance,
  consumidorId,
  contactId = null,
}) => {
  const navigate = useNavigate();
  const [idContato, setIdContato] = useState(contactId);
  const { user } = useAuthContext();
  const { open, close } = useBackdrop();
  const { totalTimerMinutes, totalTimerSeconds, startTimer, stopTimer } =
    useTimerContext();
  const {
    isAttendanceOn,
    setResponsesInSequence,
    activeSequence,
    setAttachments,
  } = useAttendanceContext();

  const {
    data: attendance,
    refetch,
    isLoading,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => get(`/atendimento/buscar/${idContato}`),
    enabled: false,
    cacheTime: 0,
  });

  const handleStartAttendance = ({ attendance = null }) => {
    //limpando o array de anexos caso esteja sendo aberto um contato via histórico.
    setAttachments([]);
    startAttendance({
      searchedAttendance: attendance,
    });

    if (!isAttendanceOn)
      startTimer({
        timers: attendance?.sequencias?.map(
          sequence => sequence.duracaoContato
        ),
      });
  };

  useEffect(() => {
    if (!isLoading && attendance) {
      handleStartAttendance({ attendance });
    }
  }, [attendance, isLoading, dataUpdatedAt]);

  const handleSearch = async e => {
    e?.preventDefault();
    if (idContato) {
      try {
        open();
        await refetch();
      } finally {
        close();
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (isAttendanceOn) {
      handleSearch();
    }
  }, [idContato]);

  const callbackSidebar = () => {
    stopTimer();
    setIdContato("");
    if (contactId) navigate("/atendimento");
  };

  return (
    <Container variant="permanent">
      <Toolbar />

      <Box>
        <Accordion type="multiple">
          <AccordionItem value="atendimento">
            <AccordionHeader>
              <AccordionTrigger>Atendimento</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Content container spacing={2}>
                {!isAttendanceOn && (
                  <ContentSearch>
                    <form onSubmit={handleSearch}>
                      <SearchTextField
                        placeholder="Código Contato"
                        value={idContato}
                        onChange={e => setIdContato(e.target.value)}
                        type="number"
                      />
                    </form>
                  </ContentSearch>
                )}

                {isAttendanceOn && (
                  <ContentItem>
                    <Typography>
                      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                      <strong>Contato:</strong> {idContato}
                    </Typography>
                  </ContentItem>
                )}

                <ContentItem>
                  <Typography>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <strong>Tempo:</strong> {totalTimerMinutes}:
                    {totalTimerSeconds}
                  </Typography>
                </ContentItem>

                <ContentItem>
                  <Typography>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <strong>Usuario:</strong> {user?.usuario}
                  </Typography>
                </ContentItem>

                <Actions item>
                  <Tooltip
                    title={
                      isAttendanceOn
                        ? "Cancelar Atendimento"
                        : "Novo Atendimento"
                    }
                  >
                    <>
                      {isAttendanceOn ? (
                        <IconButton
                          onClick={() => {
                            closeAttendance({
                              callbackSidebar: callbackSidebar,
                            });
                          }}
                        >
                          <XCircle size={23} weight="bold" color="#f44336" />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleStartAttendance}>
                          <PhoneCall size={23} weight="bold" color="#3f50b5" />
                        </IconButton>
                      )}
                    </>
                  </Tooltip>

                  <Tooltip
                    title={isAttendanceOn ? "Salvar" : "Continuar Atendimento"}
                  >
                    <>
                      {isAttendanceOn ? (
                        <IconButton
                          type="submit"
                          form="form-atendimento"
                          onClick={() => setIdContato("")}
                        >
                          <FloppyDiskBack
                            size={23}
                            weight="fill"
                            color="#00c853"
                          />
                        </IconButton>
                      ) : (
                        <Link to="/historicoAtendimento">
                          <IconButton>
                            <FolderOpen size={23} color={THEME.COLORS.GOLD} />
                          </IconButton>
                        </Link>
                      )}
                    </>
                  </Tooltip>
                </Actions>
              </Content>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="consumidor">
            <AccordionHeader>
              <AccordionTrigger>Consumidor</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <ModalListaHistoricoConsumidor
                consumidorId={consumidorId}
                onClickCallback={({ contatoId }) => {
                  setIdContato(contatoId);
                  if (contactId) navigate("/atendimento");
                }}
                disabled={!consumidorId || !isAttendanceOn}
              />
            </AccordionContent>
            <AccordionContent>
              <ModalAddChangeConsumer
                consumerId={
                  attendance?.consumidorId
                    ? attendance?.consumidorId
                    : consumidorId
                }
                disabled={!consumidorId || !isAttendanceOn}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ferramentas">
            <AccordionHeader>
              <AccordionTrigger>Ferramentas</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <ModalAttendanceSearch
                sequenceId={activeSequence?.sequenciaId || 1}
                contactId={idContato}
                disabled={!isAttendanceOn}
                callback={setResponsesInSequence}
                responses={activeSequence?.respostas}
              >
                Pesquisa
              </ModalAttendanceSearch>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
};

Sidebar.propTypes = {
  startAttendance: PropTypes.func,
  closeAttendance: PropTypes.func,
};
