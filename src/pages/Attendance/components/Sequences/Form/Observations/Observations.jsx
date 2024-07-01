import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useInput } from "../../../../../../hooks/useInput";
import { initialValuesObservations } from "../../../../constants";
import { ModalObservationsHistory } from "./ModalObservationHistory/ModalObservationsHistory";
import { Container } from "./styles";

export const Observations = ({ index }) => {
  const [observationText, setObservationText] = useState("");
  const { values, setFieldValue } = useFormikContext();
  const { onKeyDownBreakLineOnEnter } = useInput();

  useEffect(() => {
    const sequenceObservations = values.sequencias[index].observacoes;
    if (sequenceObservations.length && sequenceObservations.some(o => !o.data))
      setObservationText(sequenceObservations.find(o => !o.data)?.texto ?? "");
  }, []);

  useEffect(() => {
    const observationsSequence = values.sequencias[index].observacoes;
    if (observationText) {
      let observation = { ...initialValuesObservations };
      observation.observacaoId =
        observation.observacaoId === 0 ? 1 : observation.observacaoId;
      observation.texto = observationText;

      setFieldValue(`sequencias.${index}.observacoes`, [
        ...observationsSequence.filter(o => o.data),
        observation,
      ]);
    } else {
      setFieldValue(
        `sequencias.${index}.observacoes`,
        observationsSequence.filter(o => o.data) ?? []
      );
    }
  }, [observationText]);

  return (
    <Container>
      <TextField
        value={observationText}
        onChange={e => setObservationText(e.target.value)}
        label="Observações"
        multiline
        rows={20}
        fullWidth
        onKeyDown={e =>
          onKeyDownBreakLineOnEnter(e, observationText, setObservationText)
        }
      />

      <ModalObservationsHistory
        observations={values.sequencias[index].observacoes}
        isDisabled={
          values.sequencias[index].observacoes?.filter(
            observation => observation?.data
          ).length === 0
        }
        index={index}
      />
    </Container>
  );
};

Observations.propTypes = {
  index: PropTypes.number.isRequired,
};
