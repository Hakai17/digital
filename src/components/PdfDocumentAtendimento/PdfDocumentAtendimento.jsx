import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { get } from "../../utils/api";
import {
  convertMilisecondsToMinutes,
  convertMilisecondsToSeconds,
} from "../../utils/timeHelper";

// Create styles
const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    marginTop: 5,
    fontSize: 8,
    display: "flex",
    justifyContent: "flex-start",
  },
  // Observação
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    justifyContent: "flex-start",
    padding: 5,
  },
  tableColObs: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    justifyContent: "flex-start",
    padding: 5,
  },
  // Ações
  tableColAcao: {
    width: "16%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    justifyContent: "flex-start",
    padding: 5,
  },
  page: {
    backgroundColor: "#FFFFFF",
    fontSize: "10px",
  },
  section1: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
    padding: 1,
    borderRadius: "7px",
    border: 1,
    borderColor: "grey",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section2: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
    padding: 1,
    borderRadius: "7px",
    border: 1,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 5,
    margin: 3,
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
});

// Create Document Component
export const PdfDocumentAtendimento = ({
  idAtendimento,
  enq,
  sequenciaId,
  openBackdrop,
  closeBackdrop,
}) => {
  const [dataPdf, setDataPdf] = useState();

  const getDados = async idAtendimento => {
    try {
      openBackdrop();
      const data = await get(
        `/Atendimento/ExportarPDF?contatoId=${idAtendimento}${
          sequenciaId ? `&sequenciaId=${sequenciaId}` : ""
        }`
      );

      setDataPdf(data);
    } catch (err) {
      enq(err, { variant: "error" });
    } finally {
      closeBackdrop();
    }
  };

  useEffect(() => {
    getDados(idAtendimento);
  }, [idAtendimento]);

  return dataPdf ? (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section1}>
          <View style={styles.title}>
            <Text>Nissin</Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Pag ${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </View>
          <View style={styles.title}>
            <Text>Contato:{dataPdf?.contatoId}</Text>
            <Text
              style={styles.pageNumber}
              render={() => `${new Date().toLocaleDateString()}`}
              fixed
            />
          </View>
        </View>

        <View style={styles.section2}>
          <Text>{dataPdf?.consumidor?.id}</Text>
          <Text>{dataPdf?.consumidor?.nome}</Text>
          <Text>
            Cadastro:{" "}
            {dataPdf?.consumidor?.cadastro
              ? new Date(dataPdf.consumidor.cadastro).toLocaleDateString()
              : ""}
          </Text>
          {dataPdf?.consumidor?.atualizacao && (
            <Text>
              Atualização:{" "}
              {new Date(dataPdf.consumidor.atualizacao).toLocaleDateString()}
            </Text>
          )}
        </View>

        <View style={styles.section1}>
          <View style={styles.title}>
            <Text>
              Data de nascimento:{" "}
              {dataPdf?.consumidor?.diaNascimento
                ? `${dataPdf.consumidor.diaNascimento}/${dataPdf.consumidor.mesNascimento}/${dataPdf.consumidor.anoNascimento}`
                : ""}
            </Text>
            <Text>Tipo: {dataPdf?.consumidor?.tipoConsumidor}</Text>
            <Text>Sexo: {dataPdf?.consumidor?.sexo}</Text>
          </View>
          <View style={styles.title}>
            <Text>Endereço: {dataPdf?.consumidor?.endereco.rua}</Text>
            <Text>CEP: {dataPdf?.consumidor?.endereco.cEP}</Text>
          </View>
          <View style={styles.title}>
            <Text>
              Complemento: {dataPdf?.consumidor?.endereco.complemento}
            </Text>
            <Text>Estado: {dataPdf?.consumidor?.endereco.estado}</Text>
          </View>

          <View style={styles.title}>
            <Text>Bairro: {dataPdf?.consumidor?.endereco.bairro}</Text>
            <Text>Pais: {dataPdf?.consumidor?.endereco.pais}</Text>
          </View>
          <View style={styles.title}>
            <Text>Cidade: {dataPdf?.consumidor?.endereco.cidade}</Text>
            <Text>Situação: {dataPdf?.consumidor?.situacao}</Text>
          </View>
          <View style={styles.title}>
            <Text>Empresa: {dataPdf?.consumidor?.empresa}</Text>
            <Text>Profissão: {dataPdf?.consumidor?.profissao}</Text>
          </View>
          <View style={styles.title}>
            <Text>Especialidade: {dataPdf?.consumidor?.especialidade}</Text>
            <Text>WEB: {dataPdf?.consumidor?.web}</Text>
          </View>
          <View style={styles.title}>
            <Text>Email: {dataPdf?.consumidor?.email}</Text>
          </View>
        </View>

        {/* Sequencias */}
        {dataPdf?.sequencias?.map(seq => (
          <View
            key={seq.id}
            break={seq.id > 1 && dataPdf.sequencias.length > 1}
          >
            <View style={styles.section1}>
              <View style={styles.title}>
                <Text>Meio de Contato: {seq.meioContato}</Text>
                <Text>
                  Data do Contato:{" "}
                  {new Date(seq.dataContato).toLocaleDateString()} - Duração:{" "}
                  {`${convertMilisecondsToMinutes(
                    seq.duracao / 1000
                  )}:${convertMilisecondsToSeconds(seq.duracao / 1000)}`}
                </Text>
              </View>
              <View style={styles.title}>
                <Text>Manifestação: {seq?.manifestacao}</Text>
                <Text>Usuário: {seq?.usuario}</Text>
              </View>
              <View style={styles.title}>
                {seq?.complemento && (
                  <Text>Complemento: {seq?.complemento}</Text>
                )}
                {seq?.origem && <Text>Origem: {seq?.origem}</Text>}
              </View>
              <View style={styles.title}>
                {seq?.subComplemento && (
                  <Text>Sub-Complemento: {seq?.subComplemento}</Text>
                )}
                {seq?.urgencia && <Text>Urgência: {seq?.urgencia}</Text>}
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.title}>
                <Text>Produto: {seq?.produto?.descricao}</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.title}>
                <Text>Grupo: {seq?.produto?.grupo}</Text>
              </View>
              <View style={styles.title}>
                <Text>Linha: {seq?.produto?.indicador1}</Text>
              </View>
              <View style={styles.title}>
                <Text>Marca: {seq?.produto?.indicador2}</Text>
              </View>
              <View style={styles.title}>
                <Text>Categoria: {seq?.produto?.indicador3}</Text>
              </View>
              <View style={styles.title}>
                <Text>Embalagem: {seq?.produto?.indicador4}</Text>
              </View>
              <View style={styles.title}>
                <Text>Indicador 5: {seq?.produto?.indicador5}</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.title}>
                <Text>Lote: {seq?.reclamacao?.lote}</Text>
                <Text>Validade: {seq?.reclamacao?.validade}</Text>
              </View>
            </View>

            {/* Observações */}
            <View style={styles.section1}>
              <View style={styles.title}>
                <Text>Observação: {seq?.reclamacao?.lote}</Text>
              </View>
            </View>
            <View wrap={false} style={styles.section1}>
              <View style={styles.title}>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Data</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Usuário</Text>
                    </View>
                    <View style={styles.tableColObs}>
                      <Text style={styles.tableCell}>Observação</Text>
                    </View>
                  </View>
                  {seq?.observacoes?.map((obs, i) => (
                    <View key={i} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{obs.data}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{obs.usuario}</Text>
                      </View>
                      <View style={styles.tableColObs}>
                        <Text style={styles.tableCell}>{obs.texto}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Ações */}
            {!!seq.acoes.length && (
              <>
                <View style={styles.section1}>
                  <View style={styles.title}>
                    <Text>Ações:</Text>
                  </View>
                </View>
                <View wrap={false} style={styles.section1}>
                  <View style={styles.title}>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableColAcao}>
                          <Text style={styles.tableCell}>Ação</Text>
                        </View>
                        <View style={styles.tableColAcao}>
                          <Text style={styles.tableCell}>Data Inicial</Text>
                        </View>
                        <View style={styles.tableColAcao}>
                          <Text style={styles.tableCell}>Data Final</Text>
                        </View>
                        <View style={styles.tableColAcao}>
                          <Text style={styles.tableCell}>Status</Text>
                        </View>
                        <View style={styles.tableColAcao}>
                          <Text style={styles.tableCell}>Referência</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>Observação Ação</Text>
                        </View>
                      </View>
                      {seq.acoes.map((acao, i) => (
                        <View key={i} style={styles.tableRow}>
                          <View style={styles.tableColAcao}>
                            <Text style={styles.tableCell}>{acao.acao}</Text>
                          </View>
                          <View style={styles.tableColAcao}>
                            <Text style={styles.tableCell}>
                              {new Date(acao.dataInicial).toLocaleDateString()}
                            </Text>
                          </View>
                          <View style={styles.tableColAcao}>
                            <Text style={styles.tableCell}>
                              {acao.dataFinal
                                ? new Date(acao.dataFinal).toLocaleDateString()
                                : ""}
                            </Text>
                          </View>
                          <View style={styles.tableColAcao}>
                            <Text style={styles.tableCell}>{acao.status}</Text>
                          </View>
                          <View style={styles.tableColAcao}>
                            <Text style={styles.tableCell}>
                              {acao.referencia}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {acao.observacao}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}
      </Page>
    </Document>
  ) : null;
};
