import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "../../_UI/Button/Button";
import { TextField } from "../../_UI/TextField";
import { QUESTION_TYPE } from "../constants";
import { BooleanField } from "./BooleanField";
import { MutipleField } from "./MutipleField";
import { RadioGroupField } from "./RadioGroupFIeld";
import { FormContainer, QuestionContainer } from "./styles";

const initialValuesResponse = {
  contatoId: 0,
  sequenciaId: 1,
  pesquisaId: 0,
  perguntaId: 0,
  numeroDaLinha: 0,
  numeroDaColuna: 0,
  multiplaId: 0,
  tipoPergunta: "",
  texto: "",
  respostaLogica: false,
  nova: false,
};

function validateInitialValues({
  searchId,
  questionId,
  multiplaId,
  previousResponses,
}) {
  let r = previousResponses?.find(
    r => r.pesquisaId === searchId && r.perguntaId === questionId
  );
  if ((!multiplaId && r) || (r && multiplaId === r.multiplaId)) {
    return r;
  }

  return initialValuesResponse;
}

export function SearchForm({
  questions,
  searchId,
  sequenceId,
  contactId,
  previousResponses,
  callback,
}) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const tempResponses = [];

    questions
      .filter(q => q.tipo !== QUESTION_TYPE.MULTIPLAs)
      .forEach(q => {
        const response = {
          ...validateInitialValues({
            searchId,
            questionId: q.id,
            multiplaId: null,
            previousResponses,
          }),
        };
        response.contatoId = contactId;
        response.sequenciaId = sequenceId;
        response.pesquisaId = searchId;
        response.perguntaId = q.id;
        response.tipoPergunta = q.tipo;

        tempResponses.push(response);
      });

    questions
      .filter(q => q.tipo === QUESTION_TYPE.MULTIPLA)
      .forEach(q => {
        q.multiplas.forEach(m => {
          const response = {
            ...validateInitialValues({
              searchId,
              questionId: q.id,
              multiplaId: m.id,
              previousResponses,
            }),
          };
          response.contatoId = contactId;
          response.sequenciaId = sequenceId;
          response.pesquisaId = searchId;
          response.perguntaId = q.id;
          response.tipoPergunta = q.tipo;
          response.multiplaId = m.id;

          tempResponses.push(response);
        });
      });

    setResponses(tempResponses);
  }, []);

  const sendSearch = e => {
    e.preventDefault();

    callback && callback(responses);
  };

  const onChangeBooleanField = (e, questionId) => {
    const newResponses = responses.map(r => {
      if (r.perguntaId === questionId)
        r.respostaLogica = Boolean(e.target.value);

      return r;
    });
    setResponses(newResponses);
  };

  const onChangeMultipleField = (e, multiplaId, perguntaId) => {
    const index = responses.findIndex(
      r => r.perguntaId === perguntaId && r.multiplaId === multiplaId
    );
    const newResponses = [...responses];
    newResponses[index].nova = e.target.value === "on";
    setResponses(newResponses);
  };

  const onChangeRadioGroupField = (e, perguntaId) => {
    const newResponses = [...responses];
    newResponses.forEach(r => {
      if (r.perguntaId === perguntaId) r.nova = false;
    });
    const index = responses.findIndex(
      r =>
        r.perguntaId === perguntaId && r.multiplaId === parseInt(e.target.value)
    );
    newResponses[index].nova = true;
    setResponses(newResponses);
  };

  const onChangeTextField = (e, questionId) => {
    const newResponses = responses.map(r => {
      if (r.perguntaId === questionId) r.texto = e.target.value;

      return r;
    });

    setResponses(newResponses);
  };

  return (
    <FormContainer onSubmit={e => sendSearch(e)}>
      <div>
        {questions.map((q, i) => (
          <QuestionContainer key={i}>
            <Typography fontWeight="bold">{q.descricao}</Typography>
            {q.tipo === QUESTION_TYPE.LOGICA && (
              <BooleanField
                defaultValue={
                  responses.find(r => r.perguntaId === q.id)?.respostaLogica
                }
                onChange={e => onChangeBooleanField(e, q.id)}
                affirmative={{ id: true, descricao: "Sim" }}
                negative={{ id: false, descricao: "Não" }}
              />
            )}
            {q.tipo === QUESTION_TYPE.TEXTO && (
              <TextField
                value={responses.find(r => r.perguntaId === q.id)?.texto ?? ""}
                onChange={e => onChangeTextField(e, q.id)}
                type="textarea"
              />
            )}
            {q.tipo === QUESTION_TYPE.NUMERO && (
              <TextField
                value={responses.find(r => r.perguntaId === q.id).texto ?? ""}
                onChange={e => onChangeTextField(e, q.id)}
                type="number"
              />
            )}
            {q.tipo === QUESTION_TYPE.MULTIPLA && q.multiplaExclusiva && (
              <RadioGroupField
                onChange={e => onChangeRadioGroupField(e, q.id)}
                responses={q.multiplas}
              />
            )}
            {q.tipo === QUESTION_TYPE.MULTIPLA && !q.multiplaExclusiva && (
              <MutipleField
                onChange={(e, multiplaId) =>
                  onChangeMultipleField(e, multiplaId, q.id)
                }
                responses={q.multiplas}
              />
            )}
          </QuestionContainer>
        ))}
      </div>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
}
