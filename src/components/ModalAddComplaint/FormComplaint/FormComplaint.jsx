import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { AccordionMUI } from "../..";
import {
  FieldsProductData,
  FieldsComplaintData,
  FieldsAnalise,
} from "../FieldsComplaint";
import { TableProductsToReplace } from "../TableProductsToReplace/TableProductsToReplace";
import { initialValuesComplaint } from "../../../pages/Attendance/constants";
import { maybeCallback } from "../../../utils/functionHelper";
import { FirstAccordionMUI, LastAccordionMUI } from "./styles";
import dayjs from "dayjs";

export const FormComplaint = ({
  complaint,
  onSubmit,
  callback,
  enableAnalysis,
}) => {
  const [expanded, setExpanded] = useState("");
  const configuredProducts = useMemo(
    () => complaint?.productsToReplace ?? [],
    [complaint?.productsToReplace]
  );
  const anexos = useMemo(() => complaint?.anexos ?? [], [complaint?.anexos]);
  const observacoes = useMemo(
    () => complaint?.observacoes ?? [],
    [complaint?.observacoes]
  );
  const [productsToReplace, setProductsToReplace] =
    useState(configuredProducts);

  const handleExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = values => {
    let tratedValues = {};
    tratedValues.complaintData = values;
    tratedValues.productsToReplace = productsToReplace;
    if (values?.dataValidade) {
      tratedValues.complaintData.dataValidadeNissin =
        dayjs(values.dataValidade).format("DD/MM/YYYY").replaceAll("/", "") +
        values.indicadorfabricacao.descricao;
    }

    onSubmit(tratedValues);
    maybeCallback(callback)();
  };

  const initialValues = useMemo(
    () => complaint?.complaintData ?? initialValuesComplaint,
    [complaint?.complaintData, initialValuesComplaint]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FirstAccordionMUI
            expanded={expanded === "productData"}
            title="Dados do produto"
            disableGutters
            onChange={handleExpand("productData")}
          >
            <FieldsProductData />
          </FirstAccordionMUI>

          <AccordionMUI
            expanded={expanded === "complaintData"}
            title="Dados da reclamação"
            onChange={handleExpand("complaintData")}
          >
            <FieldsComplaintData />
          </AccordionMUI>

          <AccordionMUI
            expanded={expanded === "productsToReplace"}
            title="Produtos a repor"
            onChange={handleExpand("productsToReplace")}
          >
            <TableProductsToReplace
              productsToReplace={productsToReplace}
              onChangeProducts={setProductsToReplace}
            />
          </AccordionMUI>

          <LastAccordionMUI
            expanded={expanded === "analiseData"}
            title="Análise"
            onChange={handleExpand("analiseData")}
          >
            <FieldsAnalise
              observacoes={observacoes}
              anexos={anexos}
              enableAnalysis={enableAnalysis}
            />
          </LastAccordionMUI>

          <Grid container direction="column">
            <Button type="submit">Salvar</Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
FormComplaint.propTypes = {
  complaint: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  callback: PropTypes.func,
  enableAnalysis: PropTypes.bool,
};
