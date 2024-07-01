import { motion } from "framer-motion";
import styled from "styled-components";
import { THEME } from "../../../theme";
import { IconButton } from "../../_UI/IconButton/IconButton";

export const ChatHistoryContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${THEME.COLORS.BLUE_100};
  border-radius: 1rem;
  padding: 1rem;
  gap: 0.4rem;
  overflow: hidden;
`;

// Header
export const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4.3rem;
`;

export const Subtitle = styled(motion.div)`
  width: 100%;
  display: flex;
`;

export const ContactName = styled.h5`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  width: 100%;
  text-align: center;
`;

export const UserName = styled.h5`
  font-size: ${THEME.FONT_SIZE.XSM};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};

  &.different {
    color: #ff6961;
  }
`;

// Content
export const Content = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 1rem;
  overflow-y: auto;
  padding-right: 0.2em;
`;

// Footer
export const Footer = styled(motion.div)`
  width: 100%;
  display: flex;
  position: relative;
  height: 2rem;
`;

export const InputField = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 0 1rem;
  font-size: 0.8rem;
`;

export const SendMessageButton = styled(IconButton)`
  position: absolute;
  right: 0.125rem;
  top: -0.16rem;

  &:disabled {
    cursor: default !important;
  }
`;

export const Message = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-top: 10px;
`;

export const ContactMessage = styled.span`
  display: flex;
  font-size: 16px;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
`;

export const Menu = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

export const IconDotsThreeVertical = styled(IconButton)`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const MenuOptions = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
  z-index: 1000;

  > a {
    text-decoration: none;
    color: #333;
  }

  > a:hover {
    text-decoration: underline;
  }
`;

export const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  cursor: pointer;

  > svg {
    margin-right: 4px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
