import { Dialog } from "@mui/material";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { convertPayloadKeys } from "payload-transformer";
import { useEffect, useState } from "react";

import { useWhatsAppContext } from "../../contexts/WhatsAppContext";
import SignalR from "../../socket";
import { THEME } from "../../theme";
import { ModalSearchConsumer } from "../ModalSearchConsumer/ModalSearchConsumer";
import { CONTENT_TYPE } from "../WhatsApp/constants";

import { post } from "../../utils/api";
import { ModalListaHistoricoConsumidor } from "../ModalListaHistoricoConsumidor/ModalListaHistoricoConsumidor";
import { IconButton } from "../_UI/IconButton/IconButton";
import ChatContact from "./ChatContact/ChatContact";
import { ChatHistoryWhatsApp } from "./ChatHistory/ChatHistoryWhatsApp";
import { ChatListWhatsApp } from "./ChatList/ChatListWhatsApp";
import {
  ContainerModalContent,
  Message,
  StyledButton,
  StyledPaper,
} from "./styles";
import Badge from "./Badge/Badge";

export function ModalWhatsApp() {
  const [currentContent, setCurrentContent] = useState(CONTENT_TYPE.CONNECT);
  const [openSearchConsumer, setOpenSearchConsumer] = useState(false);
  const [openSearchContact, setOpenSearchContact] = useState(false);
  const [openWhats, setOpenWhats] = useState(false);

  const {
    openChat,
    messages,
    successGettingMessages,
    isFetchingChats,
    chats,
    isFetchingMessages,
    setConnected,
    isCheckingStatus,
    online,
    receiveChat,
    chat,
    closeChat,
    updateConsumer,
    updateContact,
    unreadMessages,
    readMessage,
  } = useWhatsAppContext();

  const navigateBetweenContents = (content, chat) => {
    switch (content) {
      case CONTENT_TYPE.CHAT_LIST: {
        setCurrentContent(content);
        break;
      }
      case CONTENT_TYPE.CHAT_HISTORY: {
        openChat(chat);
        break;
      }
      case CONTENT_TYPE.SEARCH_CONSUMER: {
        setOpenSearchConsumer(!openSearchConsumer);
        break;
      }
      case CONTENT_TYPE.SEARCH_CONTACT: {
        setOpenSearchContact(!openSearchContact);
        break;
      }
      default:
      case CONTENT_TYPE.ADD_CONTACT:
      case CONTENT_TYPE.DISCONNECT: {
        setCurrentContent(content);
        break;
      }
    }
  };

  const closeModalWhats = () => {
    if (
      ![
        CONTENT_TYPE.CONNECT,
        CONTENT_TYPE.CHAT_LIST,
        CONTENT_TYPE.CHAT_HISTORY,
      ].includes(currentContent)
    )
      configureContent();

    setOpenWhats(!openWhats);
  };

  const connect = () => {
    setConnected();
  };

  const selectConsumer = data => {
    const json = {
      consumidorId: data.id,
      nomeConsumidor: data.nome,
      telefone: chat.telefoneConsumidor,
    };

    post("/whatsapp/atribuirConsumidor", json);
  };

  const selectContact = data => {
    const json = {
      contatoId: data.contatoId,
      sequenciaId: data.sequenciaId,
      telefoneConsumidor: chat.telefoneConsumidor,
    };

    post("/whatsapp/atribuirAtendimento", json);
  };

  const receiveMessage = message => {
    message = convertPayloadKeys(message, "camelCase");

    receiveChat(message);
  };

  useEffect(() => {
    const handleReceiveMessage = message => {
      receiveMessage(message);
    };

    const handleNewConsumer = message => {
      updateConsumer(message);
    };

    const handleNewContact = message => {
      updateContact(message);
    };

    SignalR.on("WHATSAPP_RECEIVE_MESSAGE", handleReceiveMessage);
    SignalR.on("WHATSAPP_NEW_CONSUMER", handleNewConsumer);
    SignalR.on("WHATSAPP_NEW_CONTACT", handleNewContact);

    return () => {
      SignalR.off("WHATSAPP_RECEIVE_MESSAGE", handleReceiveMessage);
      SignalR.off("WHATSAPP_NEW_CONSUMER", handleNewConsumer);
      SignalR.off("WHATSAPP_NEW_CONTACT", handleNewContact);
    };
  }, [chats, chat, messages]);

  const configureContent = () => {
    if (online === null) return;

    if (online) {
      if (successGettingMessages && messages?.length) {
        setCurrentContent(CONTENT_TYPE.CHAT_HISTORY);
      } else {
        setCurrentContent(CONTENT_TYPE.CHAT_LIST);
      }
    } else if (currentContent === CONTENT_TYPE.DISCONNECT) {
      setCurrentContent(CONTENT_TYPE.CONNECT);
    }
  };

  useEffect(() => {
    configureContent();
  }, [messages, successGettingMessages, online]);

  const content = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const getConsumerName = () => {
    return chat.nomeConsumidor !== null && chat.nomeConsumidor !== "*"
      ? chat.nomeConsumidor
      : chat.telefoneConsumidor;
  };

  return (
    <>
      <IconButton onClick={closeModalWhats}>
        {openWhats ? (
          <X size={26} color={THEME.COLORS.TEXT_WHITE} />
        ) : (
          <Badge counter={unreadMessages}>
            <WhatsappLogo size={30} color={THEME.COLORS.TEXT_WHITE} />
          </Badge>
        )}
      </IconButton>
      <Dialog
        open={openWhats}
        onClose={() => setOpenWhats(false)}
        id="modalwhats"
        PaperComponent={StyledPaper}
      >
        <ContainerModalContent dividers>
          <motion.div
            initial="initial"
            animate="show"
            variants={content}
            id="divwhats"
          >
            {currentContent === CONTENT_TYPE.CHAT_LIST && !isFetchingChats && (
              <ChatListWhatsApp
                chats={chats}
                navigateBetweenContents={navigateBetweenContents}
                readMessage={readMessage}
              />
            )}

            {currentContent === CONTENT_TYPE.CHAT_HISTORY && (
              <ChatHistoryWhatsApp
                messages={messages}
                consumerName={getConsumerName()}
                backToChatList={() => {
                  closeChat();
                  navigateBetweenContents(CONTENT_TYPE.CHAT_LIST);
                }}
                navigateBetweenContents={navigateBetweenContents}
              />
            )}

            {currentContent === CONTENT_TYPE.ADD_CONTACT && (
              <ChatContact
                consumerName={getConsumerName()}
                handleBack={() => {
                  setCurrentContent(CONTENT_TYPE.CHAT_HISTORY);
                }}
                consumidorId={chat.consumidorId}
                telefoneConsumidor={chat.telefoneConsumidor}
                usuarioId={chat.usuarioId}
              />
            )}

            {currentContent === CONTENT_TYPE.DISCONNECT && (
              <>
                <Message>
                  Você está se desconectando do WhatsApp e não poderá receber ou
                  responder mensagens.
                </Message>
                <StyledButton type="button" onClick={() => connect()}>
                  Desconectar
                </StyledButton>
              </>
            )}

            {currentContent === CONTENT_TYPE.CONNECT && !isCheckingStatus && (
              <>
                <Message>
                  Você está desconectado do WhatsApp e não poderá receber ou
                  responder.
                </Message>
                <StyledButton type="button" onClick={() => connect()}>
                  Conectar
                </StyledButton>
              </>
            )}

            {(isFetchingMessages || isFetchingChats || isCheckingStatus) && (
              <>Carregando...</>
            )}
          </motion.div>
        </ContainerModalContent>
      </Dialog>
      <ModalSearchConsumer
        externalOpen={openSearchConsumer}
        setExternalOpen={setOpenSearchConsumer}
        onClickCallback={selectConsumer}
        simpleView={true}
        telefoneConsumidor={chat?.telefoneConsumidor}
      />
      <ModalListaHistoricoConsumidor
        consumidorId={chat?.consumidorId}
        externalOpen={openSearchContact}
        setExternalOpen={setOpenSearchContact}
        onClickCallback={selectContact}
        simpleView={true}
      />
    </>
  );
}
