import { Typography } from "@mui/material";
import { useMemo } from "react";
import { QUESTION_TYPE } from "../constants";
import { Container, Question } from "./styles";

export function ResponsesPreview({ responses, search }) {
  const data = useMemo(() => {
    const multiplas = [];

    const data = responses.flatMap(r =>
      search.perguntas
        .filter(p => r.perguntaId === p.id)
        .map(p => {
          if (p.tipo === QUESTION_TYPE.MULTIPLA)
            multiplas.push(p.multiplas.find(m => m.id === r.multiplaId));

          return {
            nome: p.descricao,
            tipo: p.tipo,
            multiplas: [],
            logica: r.respostaLogica,
            texto: r.texto,
            perguntaId: r.perguntaId,
          };
        })
    );

    return data.map(d => {
      const multipla = multiplas.find(m => m.perguntaId === d.perguntaId);
      if (multipla) d.multiplas.push(multipla);
      return d;
    });
  }, [responses, search]);

  return (
    <Container>
      <Question>
        {data.map(d => (
          <>
            <Typography fontWeight="bold">{d.nome}</Typography>
            {d.tipo === QUESTION_TYPE.MULTIPLA &&
              d.multiplas.map((m, i) => <div key={i}>{m.descricao}</div>)}
            {d.tipo === QUESTION_TYPE.TEXTO && <div>{d.texto}</div>}
            {d.tipo === QUESTION_TYPE.LOGICA && (
              <div>{d.logica ? "Sim" : "Não"}</div>
            )}
          </>
        ))}
      </Question>
    </Container>
  );
}
