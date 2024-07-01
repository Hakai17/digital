import { Grid, Toolbar, Typography } from "@mui/material";
import { FolderOpen, PhoneCall } from "@phosphor-icons/react";
import { FieldArray, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import { ModalConfirmationSave, openDialogConfirm } from "../../components";
import { useAttendanceContext } from "../../contexts/AttendanceContext";
import { useBackdrop } from "../../contexts/BackdropContext";
import { useTimerContext } from "../../contexts/TimerContext";
import { maybeCallback } from "../../utils/functionHelper";
import { FieldsSearchConsumer, Sequences, Sidebar } from "./components";
import {
  INDICADORFABRICACAO,
  initialValuesAttendance,
  initialValuesSequence,
} from "./constants";
import { Container, FormContainer, Main, Section } from "./styles";
import { useAttendance } from "./useAttendance";

export const PagesAttendance = () => {
  const { open: openBackdrop, close } = useBackdrop();
  const { contactId } = useParams();
  const { stopTimer, getTimes, startTimer } = useTimerContext();
  const {
    isAttendanceOn,
    activeSequenceIndex,
    activeSequence,
    setIsAttendanceOn,
    setActiveSequence,
    setActiveSequenceIndex,
    attachments,
    setAttachments,
  } = useAttendanceContext();
  const [attendance, setAttendance] = useState(null);
  const [open, setOpen] = useState(false);
  const [consumidorId, setConsumidorId] = useState("");
  const [dataAttendance, setDataAttendance] = useState({
    idAtendimento: 0,
    time: 0,
  });
  const { save, sendAttachment } = useAttendance();
  const { enqueueSnackbar } = useSnackbar();

  const startAttendance = ({ searchedAttendance }) => {
    if (searchedAttendance) {
      searchedAttendance.sequencias.forEach(seq => {
        if (seq.reclamacao?.dataValidadeNissin)
          seq.reclamacao.indicadorfabricacao = INDICADORFABRICACAO.find(
            x => x.descricao == seq.reclamacao.dataValidadeNissin?.slice(-1)
          );

        seq.anexos?.forEach(a => {
          const data = {
            sequenciaId: seq.sequenciaId,
            contatoId: seq.contatoId,
            name: a,
            uploaded: true,
          };

          setAttachments(oa => [...oa, data]);
        });
      });
      setAttendance(searchedAttendance);
      setActiveSequence(searchedAttendance.sequencias[0]);
      setActiveSequenceIndex(0);
    }
    setIsAttendanceOn(true);
    startTimer({
      timers: searchedAttendance?.sequencias?.map(
        sequence => sequence.duracaoContato
      ),
    });
  };

  const validationSchema = Yup.object().shape({
    consumidorId: Yup.number().required("Código consumidor é obrigatório"),
    sequencias: Yup.array().of(
      Yup.object({
        manifestacaoId: Yup.string()
          .matches(/[1-9]/, "Selecione uma manifestação")
          .required("Manifestação é obrigatória"),
      })
    ),
  });

  const closeAttendance = ({ callbackSidebar }) => {
    openDialogConfirm({
      title: "Cancelar Atendimento",
      content:
        "Ao cancelar o atendimento você perdera todos os dados ja preenchidos, tem certeza que deseja continuar?",
      callback: () => {
        setIsAttendanceOn(false);
        setConsumidorId(null);
        setAttendance(null);
        setAttachments([]);
        maybeCallback(callbackSidebar)();
      },
    });
  };

  const onKeyDown = keyEvent => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleSubmit = async values => {
    try {
      openBackdrop();
      values.sequencias[activeSequenceIndex].respostas =
        activeSequence.respostas;
      const idAtendimento = await save(values);
      await sendAttachment(attachments, idAtendimento);
      const time = getTimes();
      setDataAttendance({ idAtendimento: idAtendimento, time: time });
      stopTimer();
      setAttendance(initialValuesAttendance);
      setConsumidorId("");
      setIsAttendanceOn(false);
      setOpen(true);
      setAttachments([]);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  const handleConsumidorId = consumidorId => {
    setConsumidorId(consumidorId);
  };

  return (
    <Grid container>
      <Sidebar
        startAttendance={startAttendance}
        closeAttendance={closeAttendance}
        consumidorId={consumidorId}
        contactId={contactId}
      />

      <Main>
        {isAttendanceOn ? (
          <Formik
            initialValues={attendance ?? initialValuesAttendance}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {() => (
              <Form id="form-atendimento" onKeyDown={onKeyDown}>
                <FormContainer container direction="column" spacing={3}>
                  <Toolbar />

                  <Section item>
                    <FieldsSearchConsumer
                      handleConsumidorId={consumidorId =>
                        handleConsumidorId(consumidorId)
                      }
                      disabled={!!consumidorId}
                    />
                  </Section>

                  <Section item>
                    <FieldArray
                      name="sequencias"
                      render={({ insert, remove }) => (
                        <Sequences
                          increment={index =>
                            insert(index, initialValuesSequence)
                          }
                          remove={index => remove(index)}
                        />
                      )}
                    />
                  </Section>
                </FormContainer>
              </Form>
            )}
          </Formik>
        ) : (
          <Container container direction="column">
            <Toolbar />

            <Typography>
              Clique em <PhoneCall size={23} weight="fill" /> para iniciar um
              novo atendimento ou em <FolderOpen size={23} /> para continuar um
              atendimento
            </Typography>
          </Container>
        )}
      </Main>
      <ModalConfirmationSave
        open={open}
        handleChangeOpen={() => setOpen(!open)}
        dataAttendance={dataAttendance}
      />
    </Grid>
  );
};
