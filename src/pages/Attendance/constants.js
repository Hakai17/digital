import {
  DEFAULT_VALUE_NUMBER,
  DEFAULT_VALUE_STRING,
} from "../../components/constans";

export const ROUTINES_WITHOUT_USER_FIELD = [2, 3, 4, 5, 8, 11, 26, 47];
export const ROUTINES_WITHOUT_EMAIL_CHECKBOX = [26, 47];
export const ROUTINES_NEEDS_BURN_DONE = [47, 59];
export const STATUS = {
  P: "P",
  C: "C",
};
export const FUNCAO = {
  U: 1,
  D: 2,
  I: 3,
};

export const INDICADORFABRICACAO = [
  { id: 0, descricao: "I" },
  { id: 1, descricao: "G" },
];

export const initialValuesActionContact = {
  rotinaId: DEFAULT_VALUE_NUMBER,
  sequenciaId: DEFAULT_VALUE_NUMBER,
  acaoId: DEFAULT_VALUE_NUMBER,
  acaoContatoId: DEFAULT_VALUE_NUMBER,
  enviaEmail: false,
  nomeReferencia: "",
  referenciaAcao: "",
  funcao: FUNCAO.I,
  observacaoAcaoContato: "",
  usuarioId: DEFAULT_VALUE_NUMBER,
  usuarioRecebimento: "",
  grupoUsuarioId: "",
  statusAcaoContato: STATUS.P,
};

export const initialValuesComplaint = {
  textoAcao: null,
  temAmostra: false,
  textoAnalise: null,
  causaId: DEFAULT_VALUE_NUMBER,
  conclusaoId: DEFAULT_VALUE_NUMBER,
  contatoId: DEFAULT_VALUE_NUMBER,
  detalheDPId: DEFAULT_VALUE_NUMBER,
  fabricaId: DEFAULT_VALUE_NUMBER,
  linhaId: DEFAULT_VALUE_NUMBER,
  localidadeId: DEFAULT_VALUE_NUMBER,
  maquinaId: DEFAULT_VALUE_NUMBER,
  operadorId: "",
  tipoDPId: DEFAULT_VALUE_NUMBER,
  turnoId: DEFAULT_VALUE_NUMBER,
  dataValidade: null,
  dataValidadeNissin: "",
  dataAmostra: null,
  dataCompra: null,
  dataFabricacao: null,
  dataRetirada: null,
  dataResposta: null,
  temFoto: false,
  grave: false,
  horaFabricacao: "",
  loteReclamante: false,
  loteTempero: "",
  numeroLote: "",
  numeroReclamadas: DEFAULT_VALUE_NUMBER,
  textoAmostra: null,
  pontoVenda: "",
  produtoReclamante: DEFAULT_VALUE_NUMBER,
  quantidadeComprada: "",
  quantidadeEnviadaAnalise: "",
  quantidadeNaoProcedente: "",
  quantidadeProcedente: "",
  quantidadeReclamada: "",
  quantidadeRecebidas: "",
  semEmbalagem: true,
  sequenciaId: DEFAULT_VALUE_NUMBER,
  reclamacaoId: 1,
  textoRespostaTecnica: null,
  usuarioReclamacao: "DEFAULT_VALUE_NUMBER",
  novaReclamacao: true,
  indicadorfabricacao: "",
};

export const initialValuesObservations = {
  observacaoId: DEFAULT_VALUE_NUMBER,
  usuarioId: DEFAULT_VALUE_NUMBER,
  texto: "",
  sequenciaId: DEFAULT_VALUE_NUMBER,
  novaObservacao: true,
  data: null,
};

export const initialValuesSequence = {
  novaSequencia: true,
  sequenciaId: DEFAULT_VALUE_NUMBER,
  manifestacaoId: DEFAULT_VALUE_NUMBER,
  compManifestacaoId: DEFAULT_VALUE_NUMBER,
  subCompManifestacaoId: DEFAULT_VALUE_NUMBER,
  consumidorId: "",
  dataEmailInicio: null,
  dataEmailFim: null,
  codigoProduto: DEFAULT_VALUE_STRING,
  grupoProdutoId: DEFAULT_VALUE_STRING,
  indicador1Id: DEFAULT_VALUE_STRING,
  indicador2Id: DEFAULT_VALUE_STRING,
  indicador3Id: DEFAULT_VALUE_STRING,
  indicador4Id: DEFAULT_VALUE_STRING,
  indicador5Id: DEFAULT_VALUE_STRING,
  origemId: DEFAULT_VALUE_NUMBER,
  tipoContatoId: DEFAULT_VALUE_NUMBER,
  urgenciaId: DEFAULT_VALUE_NUMBER,
  usuarioId: DEFAULT_VALUE_NUMBER,
  pessoaContatoId: DEFAULT_VALUE_NUMBER,
  duracaoContato: DEFAULT_VALUE_NUMBER,
  enderecoId: DEFAULT_VALUE_NUMBER,
  contatoId: DEFAULT_VALUE_NUMBER,
  reclamacao: null,
  reposicaoProduto: [],
  acaoContato: [],
  observacoes: [],
  respostas: [],
};

export const initialValuesAttendance = {
  contatoId: DEFAULT_VALUE_NUMBER,
  consumidorId: "",
  nomeConsumidor: "",
  statusContato: STATUS.P,
  dataFim: "",
  integracaoId: DEFAULT_VALUE_NUMBER,
  sequencias: [initialValuesSequence],
};
