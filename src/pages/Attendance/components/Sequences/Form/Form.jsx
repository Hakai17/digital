import { useQuery } from "@tanstack/react-query";
import { FieldArray, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

import {
  ModalAddComplaint,
  ModalCapitalExpress,
} from "../../../../../components";
import { useAttendanceContext } from "../../../../../contexts/AttendanceContext";
import { useTimerContext } from "../../../../../contexts/TimerContext";
import { get } from "../../../../../utils/api";
import { Actions } from "./Actions";
import { Attachment } from "./Attachment";
import { ContactData } from "./ContactData";
import { Manifestation } from "./Manifestation";
import { Observations } from "./Observations/Observations";
import { Product } from "./Product";
import {
  Container,
  ContentToAlign,
  ExtraDetailsSection,
  ManifestationSection,
  StyledAccordionMUI,
  Timer,
  TimerText,
} from "./styles";

export const Form = ({ index }) => {
  const sequenciaId = index + 1;
  const [expanded, setExpanded] = useState("");
  const [anexosObject, setAnexosObject] = useState([]);
  const { values, setFieldValue } = useFormikContext();
  const { data: manifestations } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar?somenteAtivo=true"),
  });
  const { data: actions } = useQuery({
    queryKey: ["actions"],
    queryFn: () => get("/acao/listar?somenteAtivo=true"),
  });

  const { activeTimerMinutes, activeTimerSeconds, setTimers } =
    useTimerContext();
  const { attachments, setAttachments } = useAttendanceContext();

  useEffect(() => {
    setTimers(timers =>
      setFieldValue(`sequencias.${index}.duracaoContato`, timers[index])
    );
  }, [activeTimerSeconds]);

  const handleExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tipoManifestacao = useMemo(
    () =>
      manifestations?.find(
        manifestation =>
          manifestation.id === Number(values.sequencias[index].manifestacaoId)
      )?.value,
    [values.sequencias[index].manifestacaoId, manifestations]
  );

  const insertComplaint = complaint => {
    values.sequencias[index].reclamacao = {
      ...complaint.complaintData,
      sequenciaId,
    };
    values.sequencias[index].reposicaoProduto = complaint.productsToReplace.map(
      product => ({ ...product, sequenciaId })
    );
  };

  const handleUploadAttachment = newAttachments => {
    newAttachments.forEach(a => {
      a.sequenciaId = sequenciaId;
      a.uploaded = true;
    });
    setAttachments(a => [...a, ...newAttachments]);
  };

  const handleRemoveAttachment = id => {
    setAttachments(a => a.filter(f => f.id !== id));
  };

  const handleMountObjectAttachment = () => {
    values.sequencias[index].anexos?.map(anexo => {
      let newObject = {
        contatoId: values.sequencias[index].contatoId,
        sequenciaId: values.sequencias[index].sequenciaId,
        nomeArquivo: anexo,
      };
      setAnexosObject(old => [...old, newObject]);
    });
  };

  useEffect(() => {
    handleMountObjectAttachment();
  }, [values.sequencias[index].anexos]);

  const checkAction = () => {
    const actionSelected = actions?.find(action => checkRoutine(action.id));
    if (actionSelected && actionSelected.rotinaId == 59) return true;
    return false;
  };

  const checkRoutine = acaoId => {
    const actionRelatedRoutine59 = values.sequencias[index].acaoContato.find(
      act => Number(acaoId) === Number(act.acaoId)
    );
    return !!actionRelatedRoutine59;
  };

  return (
    <Container container direction="column">
      <ManifestationSection container wrap="nowrap">
        <ContentToAlign container>
          <Manifestation index={index} />
          <Timer container wrap="nowrap">
            <ModalCapitalExpress contatoId={values?.contatoId} />

            {tipoManifestacao === "reclamacao" && (
              <ModalAddComplaint
                complaint={{
                  complaintData: values.sequencias[index].reclamacao,
                  productsToReplace: values.sequencias[index].reposicaoProduto,
                  observacoes: values.sequencias[index].observacoes,
                  anexos: anexosObject,
                }}
                onSubmit={insertComplaint}
                enableAnalysis={checkAction()}
              />
            )}

            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <TimerText>
              {activeTimerMinutes} : {activeTimerSeconds}
            </TimerText>
          </Timer>
        </ContentToAlign>
      </ManifestationSection>

      <Product index={index} />

      <ExtraDetailsSection>
        <StyledAccordionMUI
          expanded={expanded === "contactData"}
          title="Dados do Contato"
          disableGutters
          onChange={handleExpand("contactData")}
        >
          <ContactData index={index} />
        </StyledAccordionMUI>

        <StyledAccordionMUI
          expanded={expanded === "acoes"}
          title="Ações"
          onChange={handleExpand("acoes")}
        >
          <FieldArray
            name={`sequencias.${index}.acaoContato`}
            render={({ insert, remove, replace }) => (
              <Actions
                insertAction={insert}
                removeAction={remove}
                updateAction={replace}
                index={index}
              />
            )}
          />
        </StyledAccordionMUI>

        <StyledAccordionMUI
          expanded={expanded === "observacoes"}
          title="Observações"
          onChange={handleExpand("observacoes")}
        >
          <Observations index={index} />
        </StyledAccordionMUI>

        <StyledAccordionMUI
          expanded={expanded === "anexos"}
          title="Anexos"
          onChange={handleExpand("anexos")}
        >
          <Attachment
            uploadedFiles={attachments.filter(
              x => x.sequenciaId == sequenciaId
            )}
            handleUpload={handleUploadAttachment}
            onRemove={handleRemoveAttachment}
          />
        </StyledAccordionMUI>
      </ExtraDetailsSection>
    </Container>
  );
};

Form.propTypes = {
  index: PropTypes.number,
};
