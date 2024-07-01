import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Button } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api } from "../../../../utils/api";
import { initialValues } from "../../constants";
import { ManifestationCompPanel } from "../ManifestationCompPanel/ManifestationCompPanel";
import { StyledForm, StyledFormik, TabContent, TabFooter } from "./styles";

export const AddChangeManifestationComp = ({
  manifestationId,
  manifestationCompId,
  handleCancel,
  onSave,
}) => {
  const isAddMode = !manifestationId;
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("1");
  const { open, close } = useBackdrop();

  useEffect(() => {
    return () => {
      // Make sure to call the 'close' function when the component unmounts
      close();
    };
  }, []);

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post(
        "/cadastroAtendimento/salvarComplementoManifestacao",
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
                <Tab label="Complemento" value="1" />
              </TabList>
            </Box>
            <TabContent>
              <ManifestationCompPanel
                value="1"
                isAddMode={isAddMode}
                manifestationId={manifestationId}
                manifestationCompId={manifestationCompId}
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
