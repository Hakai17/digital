import { Form } from "formik";
import { motion } from "framer-motion";
import styled from "styled-components";
import { THEME } from "../../../theme";
import { Button } from "../../_UI/Button/Button";

export const StyledButton = styled(Button)`
  width: 100px;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

export const ChatHistoryContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem;
  gap: 0.4rem;
  overflow: hidden;
`;

export const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ContactName = styled.h5`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  width: 100%;
  text-align: center;
`;

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
  padding: 25px;
`;

export const Message = styled.span`
  font-size: ${THEME.FONT_SIZE.MD};
  text-align: justify;
  padding-bottom: 30px;
`;

export const ContentButton = styled(motion.div)`
  margin-top: 30px;
  justify-content: center;
  display: grid;
`;
