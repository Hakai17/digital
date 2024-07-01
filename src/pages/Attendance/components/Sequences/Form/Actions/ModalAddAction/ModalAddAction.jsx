import { Button, Dialog, DialogContent, Grid, Zoom } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { Plus } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { forwardRef, useMemo, useState } from "react";

import {
  initialValuesActionContact,
  ROUTINES_NEEDS_BURN_DONE,
} from "../../../../../constants";
import { ConditionalFields } from "./ConditionalFields";
import { SelectAction } from "./SelectAction";
import { Content, Header } from "./styles";

const Transition = forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} unmountOnExit />
));
Transition.displayName = "Transition";

export const ModalAddAction = ({
  insertAction,
  index,
  isDisabled,
  children,
  action,
}) => {
  const [open, setOpen] = useState(false);
  const { values } = useFormikContext();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = useMemo(
    () => action || initialValuesActionContact,
    [action]
  );

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const handleSubmit = valuesForm => {
    const actionsConfigured = values.sequencias[index].acaoContato.map(a =>
      Number(a.acaoId)
    );
    if (ROUTINES_NEEDS_BURN_DONE.includes(Number(valuesForm.rotinaId))) {
      valuesForm.statusAcaoContato = "C";
      valuesForm.nomeReferencia = "Concluído";
    } else valuesForm.statusAcaoContato = "P";

    valuesForm.acaoContatoId = actionsConfigured?.includes(
      Number(valuesForm.acaoId)
    )
      ? actionsConfigured.filter(a => a === Number(valuesForm.acaoId)).length +
        1
      : 1;

    try {
      insertAction(valuesForm);
      setOpen(false);
      enqueueSnackbar("Ação adicionada com sucesso!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    }
  };

  return (
    <>
      {children ? (
        children({ onClick: handleOpenDialog })
      ) : (
        <Button
          variant="contained"
          startIcon={<Plus size={24} weight="fill" />}
          onClick={handleOpenDialog}
          disabled={isDisabled}
        >
          Adicionar Ação
        </Button>
      )}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleOpenDialog}
        TransitionComponent={Transition}
        TransitionProps={{
          in: open,
        }}
      >
        <Header>Adicionar Ação</Header>

        <DialogContent dividers>
          <Content>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ dirty, isSubmitting }) => (
                <Form>
                  <Grid container direction="column">
                    <SelectAction />

                    <ConditionalFields />

                    {/* <Field name="grupo" /> */}

                    <Button
                      type="submit"
                      disabled={
                        (!dirty &&
                          initialValues === initialValuesActionContact) ||
                        isSubmitting
                      }
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Content>
        </DialogContent>
      </Dialog>
    </>
  );
};

ModalAddAction.propTypes = {
  insertAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.func,
  action: PropTypes.object,
};
