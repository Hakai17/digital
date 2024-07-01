import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";

import { RadioGroup } from "formik-mui";
import { FormikSelectField, FormikTextField } from "../..";
import { INDICADORFABRICACAO } from "../../../pages/Attendance/constants";
import { get } from "../../../utils/api";
import { ApplyMaskHours } from "../../../utils/functionHelper";
import { TreatDate } from "../../../utils/timeHelper";

export const FieldsProductData = () => {
  const { values, setFieldValue } = useFormikContext();

  const { data: factories, isLoading: isLoadingFactories } = useQuery({
    queryKey: ["factories"],
    queryFn: () => get("/fabricacao/listar?somenteAtivo=true"),
  });
  const { data: places, isLoading: isLoadingPlaces } = useQuery({
    queryKey: ["places"],
    queryFn: () => get("/localidade/listar?somenteAtivo=true"),
  });
  const { data: shifts, isLoading: isLoadingShifts } = useQuery({
    queryKey: ["shifts"],
    queryFn: () => get("/turno/listar?somenteAtivo=true"),
  });
  const { data: machines, isLoading: isLoadingMachines } = useQuery({
    queryKey: ["machines"],
    queryFn: () => get("/maquina/listar?somenteAtivo=true"),
  });
  const { data: lines, isLoading: isLoadingLines } = useQuery({
    queryKey: ["lines"],
    queryFn: () => get("/linha/listar?somenteAtivo=true"),
  });
  const handleLocalFabricacao = value => {
    if (value == 0) setFieldValue("fabricaId", 2);
    else setFieldValue("fabricaId", 3);
    let indicadorSelecionado = INDICADORFABRICACAO.find(x => x.id == value);
    setFieldValue("indicadorfabricacao", indicadorSelecionado);
  };

  const handleDataValidade = value => {
    setFieldValue("dataValidade", value);
    let date = new Date(value);
    let dataFabricacao = new Date(date.setMonth(date.getMonth() - 9));
    setFieldValue("dataFabricacao", dataFabricacao);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="localidadeId"
          label="Local de aquisição"
          options={places}
          isLoading={isLoadingPlaces}
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="fabricaId"
          label="Local de fabricação"
          options={factories}
          isLoading={isLoadingFactories}
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="turnoId"
          label="Turno"
          options={shifts}
          isLoading={isLoadingShifts}
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="maquinaId"
          label="Máquina"
          options={machines}
          isLoading={isLoadingMachines}
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikSelectField}
          name="linhaId"
          label="Linha"
          options={lines}
          isLoading={isLoadingLines}
        />
      </Grid>

      <Grid item>
        <DatePicker
          label="Data compra"
          value={TreatDate(values.dataCompra)}
          onChange={value => setFieldValue("dataCompra", value)}
          renderInput={props => <TextField fullWidth {...props} />}
        />
      </Grid>

      <Grid item>
        <DatePicker
          label="Data retirada"
          value={TreatDate(values.dataRetirada)}
          onChange={value => setFieldValue("dataRetirada", value)}
          renderInput={props => <TextField fullWidth {...props} />}
        />
      </Grid>
      <Grid item>
        <DatePicker
          label="Data fabricação"
          value={TreatDate(values.dataFabricacao)}
          onChange={value => setFieldValue("dataFabricacao", value)}
          renderInput={props => <TextField fullWidth {...props} />}
        />
      </Grid>

      <Grid item>
        <Field
          name="horaFabricacao"
          label="Hora fabricação"
          fullWidth
          component={FormikTextField}
          onChange={e => {
            setFieldValue(
              "horaFabricacao",
              ApplyMaskHours(e.target.value.toString())
            );
          }}
        />
      </Grid>

      <Grid container item direction={"row"}>
        <Grid container spacing={2}>
          <Grid item>
            <DatePicker
              label="Data validade"
              value={TreatDate(values.dataValidade)}
              onChange={value => handleDataValidade(value)}
              renderInput={props => <TextField {...props} />}
            />
          </Grid>

          <Grid item>
            <Field
              component={FormikSelectField}
              name="indicadorfabricacao"
              value={
                values?.indicadorfabricacao !== ""
                  ? values?.indicadorfabricacao?.id
                  : ""
              }
              options={INDICADORFABRICACAO}
              onChange={e => handleLocalFabricacao(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Field
              fullWidth
              component={FormikTextField}
              name="numeroLote"
              label="Lote"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="operadorId"
          label="Operador"
          type="number"
        />
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="loteTempero"
          label="Lote tempero"
        />
      </Grid>

      <Grid container item direction={"row"}>
        <Grid container spacing={3}>
          <Grid item>
            <Field component={RadioGroup} name="grave">
              <FormControl component="fieldset">
                <FormLabel component="legend">Grave:</FormLabel>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Não"
                />
              </FormControl>
            </Field>
          </Grid>

          <Grid item>
            <Field component={RadioGroup} name="temAmostra">
              <FormControl component="fieldset">
                <FormLabel component="legend">Amostra:</FormLabel>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Não"
                />
              </FormControl>
            </Field>
          </Grid>

          <Grid item>
            <Field component={RadioGroup} name="temFoto">
              <FormControl component="fieldset">
                <FormLabel component="legend">Foto:</FormLabel>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Não"
                />
              </FormControl>
            </Field>
          </Grid>

          <Grid item>
            <Field
              label="Emb. Vazia"
              type="checkbox"
              name="semEmbalagem"
              control={<Checkbox />}
              as={FormControlLabel}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Field
          fullWidth
          component={FormikTextField}
          name="pontoVenda"
          label="Ponto de Venda"
        />
      </Grid>
    </Grid>
  );
};
