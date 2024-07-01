import { DEFAULT_VALUE_NUMBER } from "../../components/constans";

export const initialValues = {
  id: "",
  descricao: "",
  nivel: "",
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

export const fieldsUrgency = ["id", "descricao", "origem", "situacao", "nivel"];
