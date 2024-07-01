import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { Button } from "../../../../components";
import { useBackdrop } from "../../../../contexts/BackdropContext";
import { api } from "../../../../utils/api";
import { initialValues } from "../../constants";
import { OriginPanel } from "../UrgencyPanel/UrgencyPanel";
import { StyledForm, StyledFormik, TabContent, TabFooter } from "./styles";

export const AddChangeUrgency = ({ urgencyId, handleCancel, onSave }) => {
  const isAddMode = !urgencyId;
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("1");
  const { open, close } = useBackdrop();

  const handleSubmit = async valuesForm => {
    try {
      open();
      var { data } = await api.post(
        "/cadastroAtendimento/salvarUrgencia",
        valuesForm
      );
      valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Origem adicionado com sucesso!"
          : "Origem editado com sucesso!",
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
                <Tab label="Origem" value="1" />
              </TabList>
            </Box>
            <TabContent>
              <OriginPanel
                value="1"
                isAddMode={isAddMode}
                urgencyId={urgencyId}
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
