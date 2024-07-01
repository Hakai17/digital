import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";

import { DEFAULT_ID_DESCRICAO } from "../../pages/Consumer/constants";
import { Button } from "../_UI/Button/Button";
import { Form } from "./Form";

const initialValues = {
  id: "",
  cep: "",
  tipoEnderecoId: "",
  endereco: "",
  complemento: "",
  bairro: "",
  pais: DEFAULT_ID_DESCRICAO,
  unidadeFederativa: DEFAULT_ID_DESCRICAO,
  cidade: DEFAULT_ID_DESCRICAO,
  principal: false,
  unidadeFederativaId: "",
  cidadeId: "",
  paisId: "",
  situacao: 1,
};

export const ModalAddAddress = ({
  insertAddress,
  updateAddress,
  consumerId,
  enderecoId = null,
  externalOpen = null,
  setExternalOpen = null,
}) => {
  const { values } = useFormikContext();
  const { enqueueSnackbar } = useSnackbar();
  const [internalOpen, setInternalOpen] = useState(false);

  const defaultValues = useMemo(
    () =>
      enderecoId
        ? values.enderecos?.find(e => e.id === enderecoId) || initialValues
        : initialValues,
    [enderecoId]
  );

  const open = useMemo(
    () => externalOpen || internalOpen,
    [externalOpen, internalOpen]
  );

  const setOpen = useCallback(
    newValue => {
      if (setExternalOpen) setExternalOpen(newValue);

      setInternalOpen(newValue);
    },
    [setExternalOpen, setInternalOpen]
  );

  const handleSubmit = valuesForm => {
    if (!enderecoId) {
      const enderecosAtivos =
        values.enderecos?.filter(e => e.situacao === 1) || [];
      const quantidadeEnderecos = enderecosAtivos.length;
      // TODO: Inserindo id por limitação no DataGrid que usa o id para diferenciar os elementos
      valuesForm.id = enderecosAtivos.length + "N";
      valuesForm.consumidorId = consumerId;
      valuesForm.principal = quantidadeEnderecos === 0;
    }

    try {
      if (!enderecoId) insertAddress(valuesForm);
      else updateAddress(valuesForm);
      setOpen(false);
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
    }
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Adicionar Endereço
      </Button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Endereço</DialogTitle>

        <DialogContent dividers>
          <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
            <Form />
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
