import { TabPanel } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { FormikSelectField, FormikTextField } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get } from "../../../../utils/api";
import { fieldsManifestation } from "../../constants";

async function setDefaultUserValues({
  manifestationCompId,
  manifestationId,
  setFieldValue,
  openBackdrop,
  closeBackdrop,
}) {
  try {
    openBackdrop();
    const data = await get(
      `/cadastroAtendimento/buscarCompManifestacao?id=${manifestationCompId}&manifestacaoId=${manifestationId}`
    );
    fieldsManifestation.forEach(field =>
      setFieldValue(field, data[field], false)
    );
    setFieldValue("id", data.id);
    setFieldValue("descricao", data.descricao);
    setFieldValue("manifestacaoId", data.manifestacaoId);
    setFieldValue("situacao", data.situacao);
  } finally {
    closeBackdrop();
  }
}

export function ManifestationCompPanel({
  isAddMode,
  manifestationId,
  manifestationCompId,
  ...props
}) {
  const { open, close } = useBackdrop();
  const { setFieldValue } = useFormikContext();

  const { data: manifestation, isLoading: isLoadingManifestation } = useQuery({
    queryKey: ["manifestacaoId"],
    queryFn: () => get("/manifestacao/listar"),
  });

  useEffect(() => {
    if (!isAddMode)
      setDefaultUserValues({
        manifestationId,
        manifestationCompId,
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
        name="manifestacaoId"
        component={FormikSelectField}
        fullWidth
        isLoading={isLoadingManifestation}
        options={manifestation}
        label="Manifestação"
      />
      <Field
        name="descricao"
        component={FormikTextField}
        fullWidth
        label="Descrição"
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
