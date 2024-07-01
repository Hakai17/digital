import { Grid } from "@mui/material";
import { Field } from "formik";

import { FormikTextField } from "../..";

export const FieldsComplaintData = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeComprada"
          label="Compradas"
          type="number"
          min="0"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeReclamada"
          label="Reclamadas"
          type="number"
          min="0"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeRecebidas"
          label="Recebidas"
          type="number"
          min="0"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeEnviadaAnalise"
          label="Enviadas para análise"
          type="number"
          min="0"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeProcedente"
          label="Procedentes"
          type="number"
          min="0"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="quantidadeNaoProcedente"
          label="Quantidade não procede"
          type="number"
          min="0"
        />
      </Grid>
    </Grid>
  );
};
