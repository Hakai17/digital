import { StyledIconButton } from "./styles";

export const IconButton = ({ children, ...props }) => {
  return (
    <StyledIconButton type="button" {...props}>
      {children}
    </StyledIconButton>
  );
};
