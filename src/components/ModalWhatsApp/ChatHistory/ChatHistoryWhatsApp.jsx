import {
  ArrowCircleLeft,
  DotsThreeVertical,
  PaperPlaneRight,
  PhoneCall,
  PhonePlus,
  UserList,
} from "@phosphor-icons/react";
import {
  differenceInHours,
  format,
  isSameDay,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useWhatsAppContext } from "../../../contexts/WhatsAppContext";
import { THEME } from "../../../theme";
import { MessageBallon } from "../../WhatsApp/MessageBallon/MessageBallon";
import { CONTENT_TYPE } from "../../WhatsApp/constants";
import { IconButton } from "../../_UI/IconButton/IconButton";
import {
  ChatHistoryContainer,
  ContactMessage,
  ContactName,
  Content,
  Footer,
  Header,
  IconDotsThreeVertical,
  InputField,
  Menu,
  MenuItem,
  MenuOptions,
  Message,
  SendMessageButton,
  Subtitle,
  UserName,
} from "./styles";

const container = {
  initial: {
    opacity: 0,
    padding: 0,
  },
  opened: {
    opacity: 1,
    padding: "1rem",
    transition: {
      delayChildren: 2,
      staggerDirection: 0.5,
    },
  },
  close: {
    transform: "translate(100%)",
    opacity: 0,
  },
};

const item = {
  hidden: { opacity: 0 },
  opened: { opacity: 1 },
};

export function ChatHistoryWhatsApp({
  messages,
  consumerName,
  backToChatList,
  navigateBetweenContents,
}) {
  const refMessage = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, chat } = useWhatsAppContext();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (refMessage.current) {
      refMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  const closeHistory = () => {
    setTimeout(() => {
      backToChatList();
    }, 400);
  };

  const findConsumer = () => {
    navigateBetweenContents(CONTENT_TYPE.SEARCH_CONSUMER);
    toggleDropdown();
  };

  const addContact = () => {
    navigateBetweenContents(CONTENT_TYPE.ADD_CONTACT);
    toggleDropdown();
  };

  const findContact = () => {
    navigateBetweenContents(CONTENT_TYPE.SEARCH_CONTACT);
    toggleDropdown();
  };

  const sendNewMessage = () => {
    sendMessage({ message: newMessage });
    setNewMessage("");
  };

  const onKeyEnterDown = e => {
    if (e.key === "Enter") {
      sendNewMessage();
    }
  };

  const getDate = currentDate => {
    if (isToday(currentDate)) {
      return "Hoje";
    } else if (isYesterday(currentDate)) {
      return "Ontem";
    } else {
      return format(currentDate, "dd/MM/yyyy");
    }
  };

  const disableSend = lastMessageDate => {
    const currentDate = new Date();
    const messageDate = parseISO(lastMessageDate);
    const differenceHours = differenceInHours(currentDate, messageDate);

    return differenceHours >= 24;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const exibeAcoesContato = () => {
    return chat.consumidorId !== 0 && messages.some(m => m.contatoId === null);
  };

  let previousDate = null;
  let previousContact = 0;
  return (
    <ChatHistoryContainer
      initial="initial"
      animate={"opened"}
      variants={container}
    >
      <Header variants={item}>
        <IconButton onClick={closeHistory}>
          <ArrowCircleLeft size={30} color={THEME.COLORS.PRIMARY} />
        </IconButton>
        <ContactName>{consumerName}</ContactName>
        <Menu>
          {(chat.consumidorId === 0 || exibeAcoesContato()) && (
            <IconDotsThreeVertical onClick={toggleDropdown}>
              <DotsThreeVertical size={20} color={THEME.COLORS.PRIMARY} />
            </IconDotsThreeVertical>
          )}
          {isOpen && (
            <MenuOptions>
              {chat.consumidorId === 0 && (
                <MenuItem onClick={() => findConsumer()}>
                  <UserList size={20} color={THEME.COLORS.PRIMARY} />
                  Associar consumidor
                </MenuItem>
              )}
              {exibeAcoesContato() && (
                <>
                  <MenuItem onClick={() => addContact()}>
                    <PhonePlus size={20} color={THEME.COLORS.PRIMARY} />
                    Gerar atendimento
                  </MenuItem>
                  <MenuItem onClick={() => findContact()}>
                    <PhoneCall size={20} color={THEME.COLORS.PRIMARY} />
                    Associar atendimento
                  </MenuItem>
                </>
              )}
            </MenuOptions>
          )}
        </Menu>
      </Header>
      <Subtitle>
        <UserName className={chat.usuarioId !== user.id ? "different" : ""}>
          Atendente: {chat.nomeResponsavel}
        </UserName>
      </Subtitle>
      <Content variants={item}>
        <div id={"refMessage"} ref={refMessage}>
          {messages
            .sort((a, b) => new Date(b.timeMessage) - new Date(a.timeMessage))
            .map(message => {
              const currentDate = new Date(message.data);

              const dateChanged = previousDate
                ? !isSameDay(currentDate, previousDate)
                : true;
              previousDate = currentDate;

              const contact = `${message.contatoId}/${message.sequenciaId}`;
              const contactChanged = contact !== previousContact;
              previousContact = contact;

              return (
                <React.Fragment key={message.id}>
                  {dateChanged ? (
                    <Message key={`message_${message.id}`}>
                      {getDate(currentDate)}
                    </Message>
                  ) : (
                    ""
                  )}
                  {contactChanged ? (
                    <ContactMessage
                      key={`contact_${message.id}`}
                    >{`Atendimento: ${
                      message.contatoId
                        ? previousContact
                        : "Sem atendimento gerado"
                    }`}</ContactMessage>
                  ) : (
                    ""
                  )}
                  <MessageBallon
                    key={`ballon_${message.id}`}
                    message={message}
                  />
                </React.Fragment>
              );
            })}
        </div>
      </Content>
      <Footer variants={item}>
        <InputField
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={onKeyEnterDown}
          disabled={disableSend(chat.ultimaMensagemConsumidor)}
        />
        <SendMessageButton
          color={THEME.COLORS.PRIMARY}
          onClick={sendNewMessage}
          disabled={disableSend(chat.ultimaMensagemConsumidor)}
        >
          <PaperPlaneRight size={23} />
        </SendMessageButton>
      </Footer>
    </ChatHistoryContainer>
  );
}
