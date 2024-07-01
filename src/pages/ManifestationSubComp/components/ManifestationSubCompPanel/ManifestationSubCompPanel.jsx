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
import { FormikTextField } from "../../../../components";
import { SelectComplemento } from "../../../../components/FieldsSearchManifestation/SelectComplemento";
import { SelectManifestation } from "../../../../components/FieldsSearchManifestation/SelectManifestation";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { get } from "../../../../utils/api";
import { fieldsManifestation } from "../../constants";

async function setDefaultUserValues({
  manifestationId,
  manifestationCompId,
  manifestationSubCompId,
  setFieldValue,
  openBackdrop,
  closeBackdrop,
}) {
  try {
    openBackdrop();
    const data = await get(
      `/cadastroAtendimento/buscarSubCompManifestacao?id=${manifestationSubCompId}&compId=${manifestationCompId}&manifestacaoId=${manifestationId}`
    );
    fieldsManifestation.forEach(field =>
      setFieldValue(field, data[field], false)
    );
    setFieldValue("id", data.id);
    setFieldValue("descricao", data.descricao);
    setFieldValue("manifestacaoId", data.manifestacaoId);
    setFieldValue("manifestacaoCompId", data.complementoManifestacaoId);
    setFieldValue("situacao", data.situacao);
  } finally {
    closeBackdrop();
  }
}

export function ManifestationSubCompPanel({
  isAddMode,
  manifestationId,
  manifestationCompId,
  manifestationSubCompId,
  ...props
}) {
  const { open, close } = useBackdrop();
  const { setFieldValue } = useFormikContext();

  const { values } = useFormikContext();

  const { data: complements, isLoading: isLoadingComplements } = useQuery({
    queryKey: ["manifestationComplement", values.manifestacaoId],
    queryFn: () =>
      get(
        `/manifestacao/listarCompManifestacao?manifestacaoId=${values.manifestacaoId}`
      ),
    enabled: !!values.manifestacaoId,
  });

  useEffect(() => {
    if (!isAddMode)
      setDefaultUserValues({
        manifestationId,
        manifestationCompId,
        manifestationSubCompId,
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
      <SelectManifestation />

      {!!values.manifestacaoId && !!complements?.length && (
        <SelectComplemento
          options={complements}
          isLoading={isLoadingComplements}
        />
      )}
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
