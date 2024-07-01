import { useMemo } from "react";

import { FieldsConsultAreas } from "./FieldsConsultAreas/FieldsConsultAreas";
import { FieldsConsultConsumer } from "./FieldsConsultConsumer/FieldsConsultConsumer";
import { FieldsConsultProfessional } from "./FieldsConsultProfessional/FieldsConsultProfessional";
import { FieldsIssueComplaintReport } from "./FieldsIssueComplaintReport/FieldsIssueComplaintReport";
import { FieldsIssueLetter } from "./FieldIssueLetter/FieldsIssueLetter";
import { FieldsTriggerAgency } from "./FieldsTriggerAgency/FieldsTriggerAgency";
// import { FieldsConsultDefenseOrgan } from "./FieldsConsultDefenseOrgan"

export const useConditionalFields = selectedRoutineId => {
  const fields = useMemo(() => {
    switch (selectedRoutineId) {
      case 1: // Consultar Profissionais
        return FieldsConsultProfessional;
      /* Rotinas de Impressão de Texto */
      case 2: // Emitir Carta Padrão
      case 3: // Elaborar Carta
      case 4: // Emitir Texto em Geral
      case 5: // Emitir Texto Enciclópedia
        return FieldsIssueLetter;
      case 6: // Acionar Agencia
      case 26: // Emitir Ficha de Ressarcimento
        return FieldsTriggerAgency;
      case 7: // Consultar Outras Areas
        return FieldsConsultAreas;
      case 8: // Consultar Consumidor
        return FieldsConsultConsumer;
      // case 9: // Consultar Orgaos de Defesa
      //   return FieldsConsultDefenseOrgan;
      case 60:
      case 59: // Emitir Rel Recl s/ amostra
      case 10: // Emitir Relatório de Reclamação
        return FieldsIssueComplaintReport;
      case 11: // Enviar Anexo
        return; // FieldsSendAttachments;
      case 12: // Contactar Distribuidores
        return;
      case 47: // Ação Concluída
        // addAcaoConcluida();
        return;
      case 50: // Consultar Profissionais-Email
        return;
      case 51: // Acionar Agencia-Email
        return;
      case 52: // Consultar Outras Areas-Email
        return;
      case 54: // E-Mail - Usuários e Grupos de Usuários
        return;
      case 55: // E-Mail - Consumidor
        // addAcaoPendente();
        return;
      case 56: // E-Mail - Pesquisa
        return;
      case 57: // Envio Sms;
        // viewAcao.selectedChild = ctlRotEml;
        // callSms();
        return;
      case 58: // Rotina Devolução
        return;
      default:
        return null;
    }
  }, [selectedRoutineId]);

  return { fields };
};
