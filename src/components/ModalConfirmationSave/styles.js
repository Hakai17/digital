import styled from "styled-components";
import { THEME } from "../../theme";
import { ModalContent, ModalTitle } from "../_UI/Modal/Modal";

export const ContainerModal = styled(ModalContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  border-radius: 1rem;
  width: 35rem;
  height: 28rem;
  left: 35rem;
  top: 20rem;
  color: ${THEME.COLORS.TEXT};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentModalHeader = styled.div`
  background-color: ${THEME.COLORS.SUCCESS};
  text-align: center;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  padding: 0.3rem;
  border-radius: 1rem 1rem 0 0;
  background-color: ${THEME.COLORS.PRIMARY};
`;

export const ContentModal = styled.div`
  display: flex;
  width: 100%;
  height: 85%;
  flex-direction: column;
`;

export const HeaderModal = styled(ModalTitle)`
  width: 83%;
  text-align: center;
  color: ${THEME.COLORS.TEXT_WHITE};
`;

export const GridModal = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const FooterModal = styled.div`
  justify-content: space-evenly;
  display: flex;
`;

export const Flex = styled.div`
  display: flex;
`;

export const CodeValue = styled.span`
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
`;
