import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field } from "formik";
import PropTypes from "prop-types";

import { FormikSelectField } from "../../../../../../components";
import { get } from "../../../../../../utils/api";
import { SelectContactPerson } from "./SelectContactPerson";
import { Container } from "./styles";

export const ContactData = ({ index }) => {
  const { data: contactTypes, isLoading: isLoadingContactTypes } = useQuery({
    queryKey: ["contactTypes"],
    queryFn: () => get("/tipoContato/listar?somenteAtivo=true"),
  });
  const { data: sources, isLoading: isLoadingSources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => get("/origem/listar?somenteAtivo=true"),
  });
  const { data: urgencies, isLoading: isLoadingUrgencies } = useQuery({
    queryKey: ["urgencies"],
    queryFn: () => get("/urgencia/listar?somenteAtivo=true"),
  });

  return (
    <Container container spacing={2}>
      <Grid item xs={5}>
        <SelectContactPerson index={index} />
      </Grid>

      <Grid item xs={5}>
        <Field
          name={`sequencias.${index}.tipoContatoId`}
          component={FormikSelectField}
          options={contactTypes}
          label="Tipo de Contato"
          isLoading={isLoadingContactTypes}
        />
      </Grid>

      <Grid item xs={5}>
        <Field
          name={`sequencias.${index}.origemId`}
          component={FormikSelectField}
          options={sources}
          label="Origem"
          isLoading={isLoadingSources}
        />
      </Grid>

      <Grid item xs={5}>
        <Field
          name={`sequencias.${index}.urgenciaId`}
          component={FormikSelectField}
          options={urgencies}
          label="Urgência"
          isLoading={isLoadingUrgencies}
        />
      </Grid>
    </Container>
  );
};

ContactData.propTypes = {
  index: PropTypes.number,
};
