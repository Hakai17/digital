import { StyledButton } from "./styles";

export const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
