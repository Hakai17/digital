import styled from "styled-components";
import { THEME } from "../../../theme";

export const Line = styled.div`
  display: flex;
  margin: 0.625rem;

  &.me {
    > div {
      background-color: ${THEME.COLORS.GREEN_LIGHT};
    }
    justify-content: right;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 3.3rem;
  min-width: 17rem;
  max-width: 12.125rem;
  background-color: ${THEME.COLORS.BLUE_200};
  border-radius: 1rem;
  padding: 1.1rem 1rem 0 1rem;
`;

export const Message = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-wrap: break-word;
  font-size: ${THEME.FONT_SIZE.MD};
  font-weight: ${THEME.FONT_WEIGHT.REGULAR};
`;

export const AttachmentContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  > span {
    margin-right: 15px;
  }

  > svg {
    cursor: pointer;
  }
`;

export const InfoContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.you {
    justify-content: flex-end !important;
  }
`;

export const TimeMessage = styled.span`
  font-size: ${THEME.FONT_SIZE.SM};
  font-weight: ${THEME.FONT_WEIGHT.LIGHT};
`;

export const ResponsibleMessage = styled.span`
  font-size: ${THEME.FONT_SIZE.SM};
  font-weight: ${THEME.FONT_WEIGHT.LIGHT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2px;
`;
