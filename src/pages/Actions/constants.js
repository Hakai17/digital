import { DEFAULT_VALUE_NUMBER } from "../../components/constans";

export const initialValuesAction = {
  id: "",
  descricao: "",
  rotinaId: "",
  usuarioAcao: "",
  usuarioId: "",
  argumento: "",
  origem: "",
  situacao: "",
};

export const initialValuesObservations = {
  observacaoId: DEFAULT_VALUE_NUMBER,
  usuarioId: DEFAULT_VALUE_NUMBER,
  texto: "",
  sequenciaId: DEFAULT_VALUE_NUMBER,
  novaObservacao: true,
  data: null,
};
