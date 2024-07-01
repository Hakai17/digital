import { Container } from "./styles";

function Badge({ children, counter }) {
  return (
    <Container>
      {counter > 0 && <span>{counter}</span>}
      {children}
    </Container>
  );
}

export default Badge;
