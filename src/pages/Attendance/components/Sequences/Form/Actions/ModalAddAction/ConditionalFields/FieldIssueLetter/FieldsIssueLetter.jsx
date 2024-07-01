import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";

import { FormikSelectField } from "../../../../../../../../../components";
import { get } from "../../../../../../../../../utils/api";
import { validateField } from "../../../../../../../useAttendance";
import { SelectActionReference } from "../../SelectActionReference";
import { Container, FormFieldSection } from "./styles";

export const FieldsIssueLetter = () => {
  const { data: headers, isLoading: isLoadingHeaders } = useQuery({
    queryKey: ["letterHeaders"],
    queryFn: () => get("/cabecalhoRodape/listarCabecalho"),
  });
  const { data: footers, isLoading: isLoadingFooters } = useQuery({
    queryKey: ["letterFooters"],
    queryFn: () => get("/cabecalhoRodape/listarRodape"),
  });
  const { data: letters, isLoading: isLoadingLetters } = useQuery({
    queryKey: ["letters"],
    queryFn: () => get("/carta/listar"),
  });

  return (
    <Container container spacing={2}>
      <FormFieldSection item>
        <Field
          required
          name="cabecalhoRodapeInicioId"
          component={FormikSelectField}
          label="Cabeçalho"
          options={headers}
          validate={validateField}
          isLoading={isLoadingHeaders}
        />
      </FormFieldSection>

      <FormFieldSection item>
        <SelectActionReference
          label="Carta"
          options={letters}
          isLoading={isLoadingLetters}
        />
      </FormFieldSection>

      <FormFieldSection item>
        <Field
          required
          name="cabecalhoRodapeFimId"
          component={FormikSelectField}
          label="Rodapé"
          options={footers}
          validate={validateField}
          isLoading={isLoadingFooters}
        />
      </FormFieldSection>
    </Container>
  );
};
