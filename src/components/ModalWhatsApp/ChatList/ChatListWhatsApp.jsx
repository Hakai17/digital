import { Tooltip } from "@mui/material";
import { UserMinus } from "@phosphor-icons/react";
import { useState } from "react";
import { THEME } from "../../../theme";
import { CONTENT_TYPE } from "../../WhatsApp/constants";
import { IconButton } from "../../_UI/IconButton/IconButton";
import { ChatItemWhatsApp } from "../ChatItem/ChatItemWhatsApp";
import { ChatDisconnect, ChatListContainer } from "./styles";
import { useAuthContext } from "../../../contexts/AuthContext";
import { post } from "../../../utils/api";

export function ChatListWhatsApp({
  chats,
  navigateBetweenContents,
  ref,
  readMessage,
}) {
  const { user } = useAuthContext();
  const [chatOpened, setChatOpen] = useState(0);

  const container = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 3,
        staggerDirection: -1,
      },
    },
    chatOpened: {
      padding: 0,
    },
  };

  const item = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    onOpen: {
      width: "100%",
      height: "100%",
      opacity: 0,
    },
  };

  const openChat = async chat => {
    setChatOpen(chat.id);
    setTimeout(() => {
      navigateBetweenContents(CONTENT_TYPE.CHAT_HISTORY, chat);
    }, 300);

    if (chat.qtdNaoLidos > 0 && chat.usuarioId === user.id) {
      await post(`/whatsapp/visualizarMensagensDoChat?chatId=${chat.chatId}`);

      readMessage(chat.telefoneConsumidor);
    }
  };

  const disconnect = () => {
    navigateBetweenContents(CONTENT_TYPE.DISCONNECT);
  };

  return (
    <ChatListContainer
      initial="initial"
      animate={chatOpened > 0 ? "chatOpened" : "show"}
      variants={container}
    >
      <ChatDisconnect>
        <IconButton color="primary" onClick={() => disconnect()}>
          <Tooltip title="Desconectar">
            <UserMinus size={28} color={THEME.COLORS.PRIMARY} />
          </Tooltip>
        </IconButton>
      </ChatDisconnect>
      {chats?.length > 0 &&
        chats
          .sort((chatA, chatB) => {
            const dateA = new Date(chatA.data);
            const dateB = new Date(chatB.data);
            return dateB - dateA;
          })
          .map(chat => (
            <ChatItemWhatsApp
              key={chat.id}
              chat={chat}
              openChat={openChat}
              animate={chatOpened === chat.id ? "onOpen" : "show"}
              isOpen={chatOpened === chat.id}
              variants={item}
            />
          ))}
      <button ref={ref}></button>
    </ChatListContainer>
  );
}
