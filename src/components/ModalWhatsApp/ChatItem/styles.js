import { motion } from "framer-motion";
import styled from "styled-components";
import { THEME } from "../../../theme";

export const ChatItemContainer = styled(motion.li)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.375rem;
  margin-top: 0.6rem;
  border-radius: 1rem;
  padding: 0 1rem 0 1rem;
  cursor: pointer;
  overflow-x: hidden;
  background-color: #ffffff;
`;

export const LeftInfosContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const RightInfosContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const ContactName = styled.h5`
  font-size: ${THEME.FONT_SIZE.MD};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  margin-bottom: 6px;

  &.me {
    color: ${THEME.COLORS.TEXT};
  }

  &.you {
    color: #ff6961;
  }
`;

export const LastMessagePreview = styled.span`
  font-size: ${THEME.FONT_SIZE.XSM};
  font-weight: ${THEME.FONT_WEIGHT.LIGHT};
`;

export const LastMessageTime = styled.span`
  font-size: ${THEME.FONT_SIZE.XSM};
  font-weight: ${THEME.FONT_WEIGHT.LIGHT};
  margin-right: auto;
`;

export const Badge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #304355;
  color: #fff;
  height: 19px;
  width: 19px;
  font-size: 12px;
  margin-left: 7px;
  position: relative;
  padding-top: 1px;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
`;
