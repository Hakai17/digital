import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { Button } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api } from "../../../../utils/api";
import { initialValues } from "../../constants";
import { ManifestationPanel } from "../ManifestationPanel/ManifestationPanel";
import { StyledForm, StyledFormik, TabContent, TabFooter } from "./styles";

export const AddChangeManifestation = ({
  manifestationId,
  handleCancel,
  onSave,
}) => {
  const isAddMode = !manifestationId;
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("1");
  const { open, close } = useBackdrop();

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post(
        "/cadastroAtendimento/salvarManifestacao",
        valuesForm
      );
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Manifestação adicionado com sucesso!"
          : "Manifestação editado com sucesso!",
        { variant: "success" }
      );
      onSave && onSave(valuesForm);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      close();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledFormik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <StyledForm>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} centered>
                <Tab label="Manifestação" value="1" />
              </TabList>
            </Box>
            <TabContent>
              <ManifestationPanel
                value="1"
                isAddMode={isAddMode}
                manifestationId={manifestationId}
              />
            </TabContent>
          </TabContext>
          <TabFooter>
            <Button type="submit" variant="contained" disabled={!dirty}>
              Salvar
            </Button>
            <Button onClick={() => handleCancel()}>Cancelar</Button>
          </TabFooter>
        </StyledForm>
      )}
    </StyledFormik>
  );
};
