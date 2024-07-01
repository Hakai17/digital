import { useQuery } from "@tanstack/react-query";
import { convertPayloadKeys } from "payload-transformer";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { ORIGEM_MSG, STATUS } from "../components/WhatsApp/constants";
import { get, post } from "../utils/api";
import { useAuthContext } from "./AuthContext";

const WhatsAppContext = createContext();

export const WhatsAppContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [chat, setChat] = useState(null);
  const [online, setOnline] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const {
    data: connected,
    refetch,
    isFetching: isCheckingStatus,
  } = useQuery({
    queryKey: ["whatsAppStatus"],
    queryFn: () => get(`/whatsapp/checkstatus?usuarioId=${user.id}`),
    enabled: !!user,
  });

  const {
    data: listaMensagens,
    isSuccess: successGettingMessages,
    isFetching: isFetchingMessages,
    refetch: buscarHistoricoChat,
  } = useQuery({
    queryKey: ["messagesChatWpp", chat?.telefoneConsumidor],
    queryFn: () =>
      get(
        `/WhatsApp/ListarPorContato?telefoneConsumidor=${chat.telefoneConsumidor}`
      ),
    enabled: false,
    cacheTime: 0,
  });

  const { data: listaChats, isFetching: isFetchingChats } = useQuery({
    queryKey: ["whatsAppChats"],
    queryFn: () => get("/WhatsApp/modalAtendimento"),
    enabled: online === true,
  });

  const receiveChat = message => {
    const updatedChats = [...chats];

    if (updatedChats) {
      const chatIndex = updatedChats.findIndex(
        m => m.telefoneConsumidor === message.telefoneConsumidor
      );

      if (chatIndex !== -1) {
        message.qtdNaoLidos = updatedChats[chatIndex].qtdNaoLidos;
        message.chatId = updatedChats[chatIndex].chatId;

        if (message.origem === ORIGEM_MSG.CLIENTE) message.qtdNaoLidos += 1;

        updatedChats[chatIndex] = message;
      } else updatedChats.push(message);

      const chatAberto =
        chat &&
        messages &&
        chat.telefoneConsumidor === message.telefoneConsumidor;

      // Se o chat estiver aberto para visualização das mensagens, será necessário atualizar tudo que for relativo a tela de leitura das msg.
      if (chatAberto) {
        setChat(updatedChats[chatIndex]);

        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
      } else if (message.origem === ORIGEM_MSG.CLIENTE) {
        setUnreadMessages(unreadMessages + 1);
      }
    } else updatedChats.push(message);

    setChats(updatedChats);
  };

  const updateConsumer = message => {
    message = convertPayloadKeys(message, "camelCase");

    setChats(prevChats => {
      const updatedChats = [...prevChats];
      const originalChatIndex = updatedChats.findIndex(
        chat => chat.telefoneConsumidor === message.telefone
      );

      if (originalChatIndex !== -1) {
        updatedChats[originalChatIndex] = {
          ...updatedChats[originalChatIndex],
          consumidorId: message.consumidorId,
          nomeConsumidor: message.nomeConsumidor,
        };

        // Se o chat estiver aberto, será necessário atualizar o nome do consumidor nele
        if (chat && chat.telefoneConsumidor === message.telefone) {
          setChat(updatedChats[originalChatIndex]);
        }
      }

      return updatedChats;
    });
  };

  const updateContact = message => {
    message = convertPayloadKeys(message, "camelCase");

    // Se o chat estiver aberto, será necessário atualizar os dados do contato para as mensagens que foram atualizadas
    if (
      chat &&
      messages &&
      chat.telefoneConsumidor === message.telefoneConsumidor
    ) {
      const updatedMessages = messages.map(msg => {
        if (message.mensagensId.includes(msg.id)) {
          return {
            ...msg,
            contatoId: message.contatoId,
            sequenciaId: message.sequenciaId,
          };
        }
        return msg;
      });

      setMessages(updatedMessages);
    }
  };

  const readMessage = telefoneConsumidor => {
    const updatedChats = [...chats];

    const updatedChat = updatedChats.find(
      p => p.telefoneConsumidor === telefoneConsumidor
    );

    if (updatedChat) {
      setUnreadMessages(unreadMessages - updatedChat.qtdNaoLidos);
      updatedChat.qtdNaoLidos = 0;
      setChats(updatedChats);
    }
  };

  const openChat = chat => {
    setChat(chat);
  };

  const closeChat = () => {
    setChat(null);
    setMessages([]);
  };

  const setConnected = async () => {
    await post(
      `/whatsapp/alterarstatus?usuarioId=${user.id}&status=${
        connected ? STATUS.OFFLINE : STATUS.ONLINE
      }`
    );

    refetch();
  };

  const sendMessage = ({ message }) => {
    const json = {
      mensagem: message,
      telefoneConsumidor: chat.telefoneConsumidor,
      usuarioId: chat.usuarioId,
      usuarioEnvioMensagemId: user.id,
      tipo: 1,
    };

    post("/whatsapp/enviarMensagem", json);
  };

  useEffect(() => {
    if (connected !== undefined) setOnline(!!connected);
  }, [connected]);

  useEffect(() => {
    if (listaChats) {
      setChats(listaChats);
      setUnreadMessages(
        listaChats.reduce((total, mensagem) => total + mensagem.qtdNaoLidos, 0)
      );
    }
  }, [listaChats]);

  useEffect(() => {
    if (listaMensagens) setMessages(listaMensagens);
  }, [listaMensagens]);

  useEffect(() => {
    buscarHistoricoChat();
  }, [chat?.telefoneConsumidor]);

  return (
    <WhatsAppContext.Provider
      value={{
        openChat,
        messages,
        successGettingMessages,
        isFetchingMessages,
        sendMessage,
        chat,
        isFetchingChats,
        chats,
        setConnected,
        online,
        setOnline,
        receiveChat,
        closeChat,
        updateConsumer,
        isCheckingStatus,
        updateContact,
        unreadMessages,
        readMessage,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
};

WhatsAppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWhatsAppContext = () => useContext(WhatsAppContext);

export default WhatsAppContextProvider;
