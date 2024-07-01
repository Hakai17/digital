import { DEFAULT_VALUE_NUMBER } from "../../components/constans";

export const initialValues = {
  id: "",
  manifestacaoId: "",
  descricao: "",
  dataCadastro: "",
  dataAtualizacao: "",
  origem: "",
  descricaoWeb: "",
  visualizacaoWeb: "",
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

export const fieldsManifestation = [
  "id",
  "descricao",
  "descricaoWeb",
  "visualizadoWeb",
  "origem",
  "manifestacaoId",
  "situacao",
  "dataCadastro",
  "dataAtualizacao",
];
