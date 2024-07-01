import { Download } from "@phosphor-icons/react";
import { format } from "date-fns";
import { useMemo } from "react";
import { useSnackbar } from "notistack";
import { useDownloadAttachments } from "../../../hooks/useDownloadAttachments";
import { TIPO_ARQUIVO } from "../constants";
import {
  Content,
  InfoContent,
  Line,
  Message,
  TimeMessage,
  ResponsibleMessage,
  AttachmentContent,
} from "./styles";

export function MessageBallon({ message }) {
  const { enqueueSnackbar } = useSnackbar();
  const { downloadFileWhatsapp } = useDownloadAttachments({
    snackbar: enqueueSnackbar,
  });

  const time = useMemo(
    () => format(new Date(message.data), "HH:mm"),
    [message.data]
  );

  const tipoArquivo = () => {
    switch (message.tipo) {
      case TIPO_ARQUIVO.IMAGEM:
        return "Arquivo de Imagem";
      case TIPO_ARQUIVO.VIDEO:
        return "Arquivo de Video";
      case TIPO_ARQUIVO.CONTATO:
        return "Arquivo de Contato";
      case TIPO_ARQUIVO.AUDIO:
        return "Arquivo de Áudio";
      default:
      case TIPO_ARQUIVO.DOCUMENTO:
        return "Documento";
    }
  };

  const isContact = message.origem !== 1;

  return (
    <Line className={!isContact ? "me" : ""}>
      <Content>
        {message.tipo === 1 ? (
          <Message>{message.mensagem}</Message>
        ) : (
          <AttachmentContent>
            <Message>{tipoArquivo()}</Message>
            <Download
              size={20}
              onClick={() => downloadFileWhatsapp(message.mensagem)}
            />
          </AttachmentContent>
        )}
        <InfoContent className={isContact ? "you" : ""}>
          {!isContact && (
            <ResponsibleMessage>
              {message.usuarioEnvioMensagem}
            </ResponsibleMessage>
          )}
          <TimeMessage>{time}</TimeMessage>
        </InfoContent>
      </Content>
    </Line>
  );
}
