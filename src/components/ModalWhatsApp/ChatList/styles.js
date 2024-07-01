import { motion } from "framer-motion";
import styled from "styled-components";
import { THEME } from "../../../theme";

export const ChatListContainer = styled(motion.ul)`
  width: 100%;
  height: 100%;
  background-color: ${THEME.COLORS.BLUE_100};
  padding: 1rem;
  border-radius: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ChatDisconnect = styled(motion.li)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 6px;
`;
