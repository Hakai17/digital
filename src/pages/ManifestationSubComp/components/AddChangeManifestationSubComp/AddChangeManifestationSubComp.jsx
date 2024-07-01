import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { Button } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api } from "../../../../utils/api";
import { initialValues } from "../../constants";
import { ManifestationSubCompPanel } from "../ManifestationSubCompPanel/ManifestationSubCompPanel";
import { StyledForm, StyledFormik, TabContent, TabFooter } from "./styles";

export const AddChangeManifestationSubComp = ({
  manifestationId,
  manifestationCompId,
  manifestationSubCompId,
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
        "/cadastroAtendimento/salvarSubComplementoManifestacao",
        valuesForm
      );
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Complemento adicionado com sucesso!"
          : "Complemento editado com sucesso!",
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
                <Tab label="Sub Complemento" value="1" />
              </TabList>
            </Box>
            <TabContent>
              <ManifestationSubCompPanel
                value="1"
                isAddMode={isAddMode}
                manifestationId={manifestationId}
                manifestationCompId={manifestationCompId}
                manifestationSubCompId={manifestationSubCompId}
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
