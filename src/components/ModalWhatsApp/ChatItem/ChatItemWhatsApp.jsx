import { format, isToday } from "date-fns";
import { useMemo } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { truncate } from "../../../utils/stringHelper";
import { TIPO_ARQUIVO } from "../../WhatsApp/constants";
import {
  Badge,
  ChatItemContainer,
  ContactName,
  LastMessagePreview,
  LastMessageTime,
  LeftInfosContainer,
  MessageContainer,
  RightInfosContainer,
} from "./styles";

export function ChatItemWhatsApp({ chat, openChat, isOpen, ...props }) {
  const { user } = useAuthContext();

  const dateLastMessage = useMemo(() => {
    const data = new Date(chat.ultimaMensagemConsumidor);
    return isToday(data) ? format(data, "HH:mm") : format(data, "dd/MM/yyyy");
  }, [chat.ultimaMensagemConsumidor]);

  const infos = {
    onOpen: {
      opacity: 0,
    },
  };

  const nomeConsumidor =
    chat.nomeConsumidor !== null && chat.nomeConsumidor !== "*"
      ? chat.nomeConsumidor
      : chat.telefoneConsumidor;

  const mensagemChat = () => {
    if (chat.tipo === TIPO_ARQUIVO.TEXTO) return truncate(chat.mensagem, 79);

    switch (chat.tipo) {
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

  return (
    <ChatItemContainer onClick={() => openChat(chat)} {...props}>
      <LeftInfosContainer animate={isOpen ? "onOpen" : ""} variants={infos}>
        <ContactName className={user.id === chat.usuarioId ? "me" : "you"}>
          {nomeConsumidor}
        </ContactName>
        <MessageContainer>
          <LastMessagePreview>{mensagemChat()}</LastMessagePreview>
          {chat.qtdNaoLidos > 0 && <Badge>{chat.qtdNaoLidos}</Badge>}
        </MessageContainer>
      </LeftInfosContainer>
      <RightInfosContainer animate={isOpen ? "onOpen" : ""} variants={infos}>
        <LastMessageTime>{dateLastMessage}</LastMessageTime>
      </RightInfosContainer>
    </ChatItemContainer>
  );
}
