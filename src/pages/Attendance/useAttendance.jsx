import { useAuthContext } from "../../contexts/AuthContext";

import { api } from "../../utils/api";

export const useAttendance = () => {
  const { user } = useAuthContext();

  const save = async values => {
    values = dealWithValues(values, user);
    const { data } = await api.post("/atendimento/salvar", values);
    return data;
  };

  const sendAttachment = async (attachments, contactId) => {
    await Promise.all(
      attachments.map(async a => {
        const formData = new FormData();
        const payload = {
          sequenciaId: a.sequenciaId,
          contatoId: contactId,
          nome: a.name,
        };
        formData.append("file", a.file);
        formData.append("payload", JSON.stringify(payload));
        await api.post("/anexo/enviar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      })
    );
  };

  return { save, sendAttachment };
};

export const validateField = value => {
  if (!value || value === 0 || value === "") return "Campo obrigatório*";
};

const dealWithValues = (values, user) => {
  values.sequencias = values.sequencias.map((sequence, index) => {
    // insert sequenciaId in values
    const sequenciaId = index + 1;
    sequence.sequenciaId = sequenciaId;

    // insert consumidorId in values
    sequence.consumidorId = values.consumidorId;

    // insert usuarioId
    sequence.usuarioId = sequence.usuarioId || user.id;

    // insert values in actions
    if (sequence.acaoContato.length !== 0)
      sequence.acaoContato = sequence.acaoContato.map(action => ({
        ...action,
        sequenciaId,
        usuarioId: sequence.usuarioId || user.id,
      }));

    if (sequence.observacoes.length !== 0)
      sequence.observacoes = sequence.observacoes.map(action => ({
        ...action,
        sequenciaId,
        usuarioId: sequence.usuarioId || user.id,
      }));

    if (sequence.respostas.length !== 0)
      sequence.respostas = sequence.respostas.map(response => {
        response.sequenciaId = sequenciaId;

        return response;
      });

    return sequence;
  });

  return values;
};
