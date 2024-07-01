import { TabPanel } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get } from "../../../../utils/api";
import { fieldsManifestation } from "../../constants";

async function setDefaultUserValues({
  manifestationId,
  setFieldValue,
  openBackdrop,
  closeBackdrop,
}) {
  try {
    openBackdrop();
    const data = await get(
      `/cadastroAtendimento/buscarManifestacao?manifestacaoId=${manifestationId}`
    );
    fieldsManifestation.forEach(field =>
      setFieldValue(field, data[field], false)
    );
    setFieldValue("id", data.id);
    setFieldValue("descricao", data.descricao);
    setFieldValue("dataCadastro", data.dataCadastro);
    setFieldValue("situacao", data.situacao);
  } finally {
    closeBackdrop();
  }
}

export function ManifestationPanel({ isAddMode, manifestationId, ...props }) {
  const { open, close } = useBackdrop();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!isAddMode)
      setDefaultUserValues({
        manifestationId,
        setFieldValue,
        openBackdrop: open,
        closeBackdrop: close,
      });
  }, []);

  return (
    <TabPanel {...props}>
      <Field
        name="id"
        component={FormikTextField}
        fullWidth
        label="Código"
        disabled
      />
      <Field
        name="descricao"
        component={FormikTextField}
        fullWidth
        label="Descrição"
      />
      <Field
        name="dataCadastro"
        component={FormikTextField}
        fullWidth
        label="Cadastro"
        disabled
      />
      <Field name="situacao">
        {({ field }) => (
          <FormControl component="fieldset">
            <RadioGroup {...field}>
              <FormControlLabel value="1" control={<Radio />} label="Ativo" />
              <FormControlLabel value="2" control={<Radio />} label="Inativo" />
            </RadioGroup>
          </FormControl>
        )}
      </Field>
    </TabPanel>
  );
}
