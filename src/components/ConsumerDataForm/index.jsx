import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, CircularProgress, Switch, Tab } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { Field, FieldArray } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";

import { useQuery } from "@tanstack/react-query";
import { Button, FormikTextField } from "..";
import { useBackdrop } from "../../contexts/BackdropContext";
import { useInput } from "../../hooks/useInput";
import { initialValuesConsumer } from "../../pages/Consumer/constants";
import { THEME } from "../../theme";
import { api, get } from "../../utils/api";
import { ModalAddAddress } from "../ModalAddAddress";
import { ContactDataPanel } from "./Panels/ContactDataPanel";
import { PersonalDataPanel } from "./Panels/PersonalDataPanel";
import {
  Content,
  Flex,
  StyledForm,
  StyledFormik,
  TabContent,
  TabFooter,
  TableContainer,
} from "./styles";

const columns = ({ remove, handleChangePrincipal, editAddress }) => [
  { field: "endereco", headerName: "Endereço", width: 250 },
  { field: "bairro", headerName: "Bairro", width: 250 },
  {
    field: "cidade",
    headerName: "Cidade",
    width: 250,
    renderCell: ({ row }) => row.cidade?.descricao ?? "",
  },
  {
    field: "principal",
    headerName: "Principal",
    width: 120,
    renderCell: ({ value, row }) => (
      <Switch
        checked={value}
        onChange={() => handleChangePrincipal(row.id)}
        inputProps={{ "aria-label": "controlled" }}
      />
    ),
  },
  {
    field: "actions",
    type: "actions",
    cellClassName: "actions",
    width: 120,
    getActions: ({ id }) => [
      <GridActionsCellItem
        key={id}
        icon={
          <PencilSimple size={22} weight="fill" color={THEME.COLORS.PRIMARY} />
        }
        label="Editar"
        onClick={() => editAddress(id)}
      />,
      <GridActionsCellItem
        key={id}
        icon={
          <TrashSimple size={22} weight="fill" color={THEME.COLORS.PRIMARY} />
        }
        label="Delete"
        onClick={() => remove(id)}
      />,
    ],
  },
];

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome consumidor é obrigatório"),
});

export const ConsumerDataForm = ({
  consumerId,
  handleCancel,
  onSave,
  telefoneConsumidor,
}) => {
  const isAddMode = !consumerId;
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(!telefoneConsumidor ? "1" : "2");
  const [onEditAddressData, setOnEditAddressData] = useState(null);
  const { open, close } = useBackdrop();
  const { onKeyDownBreakLineOnEnter } = useInput();
  const [openModalAddress, setOpenModalAddress] = useState(false);

  const {
    data: consumer,
    isLoading: isLoadingConsumer,
    refetch,
  } = useQuery({
    queryKey: ["consumer", consumerId],
    queryFn: () => get(`/consumidor/BuscarDados?id=${parseInt(consumerId)}`),
    enabled: !!consumerId,
  });

  const initialValues = useMemo(() => {
    if (!consumer) return initialValuesConsumer;

    const data = { ...consumer };

    let date;
    if (consumer?.mesNascimento && consumer.mesNascimento.toString().length < 2)
      date = `${consumer?.anoNascimento}-0${consumer?.mesNascimento}-${consumer?.diaNascimento}`;
    else
      date = `${consumer?.anoNascimento}-${consumer?.mesNascimento}-${consumer?.diaNascimento}`;
    if (dayjs(date).isValid()) data.nascimento = dayjs(date);
    else data.nascimento = "";

    data.tipoId = consumer.tipoConsumidor.id;
    data.areaAtuacaoId = consumer.areaAtuacao.id;
    data.tipoAreaAtuacaoId = consumer.tipoAreaAtuacao.id;
    data.profissaoId = consumer.profissao.id;
    data.especialidadeId = consumer.especialidade.id;
    data.estadoCivilId = consumer.estadoCivil.id;

    data.enderecos = consumer.enderecos.map(item => {
      item.paisId = item.pais?.id ?? "";
      // estado
      item.unidadeFederativaId = item.unidadeFederativa?.id ?? "";
      item.cidadeId = item.cidade?.id ?? 0;
      item.cep = item.cEP;

      return item;
    });

    return data;
  }, [consumer]);

  const handleSubmit = async valuesForm => {
    try {
      open();
      if (valuesForm.nascimento != null) {
        let date = new Date(valuesForm.nascimento);
        valuesForm.anoNascimento = date.getFullYear();
        valuesForm.mesNascimento = date.getMonth() + 1;
        valuesForm.diaNascimento = date.getDate();
      }
      // TODO: Zerando id inserido por limitação no componente DataGrid
      if (!valuesForm.enderecos || !valuesForm.enderecos.length)
        throw new Error(
          "É obrigatório possuir ao menos um endereço cadastrado"
        );
      valuesForm.enderecos.forEach(e => {
        if (e.id.length && e.id.includes("N")) e.id = 0;
      });
      var { data } = await api.post("/consumidor/salvar", valuesForm);
      if (data > 0) valuesForm.id = data;
      enqueueSnackbar(
        isAddMode
          ? "Consumidor adicionado com sucesso!"
          : "Consumidor editado com sucesso!",
        { variant: "success" }
      );
      refetch();
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

  const handleChangePrincipal = ({ enderecos, id, setFieldValue }) => {
    if (enderecos.length > 1) {
      enderecos
        .filter(e => e.situacao === 1)
        .forEach((endereco, i) => {
          if (endereco.id === id && endereco.principal) {
            enqueueSnackbar(
              "É obrigatório pelo menos um dos endereços ser o principal",
              { variant: "error" }
            );
            return;
          }

          if (endereco.id === id)
            setFieldValue(`enderecos.${i}.principal`, true);
          else setFieldValue(`enderecos.${i}.principal`, false);
        });
    } else {
      enqueueSnackbar(
        "É obrigatório pelo menos um dos endereços ser o principal",
        { variant: "error" }
      );
    }
  };

  const removeAddress = (index, setFieldValue) => {
    setFieldValue(`enderecos.${index}.principal`, false);
    setFieldValue(`enderecos.${index}.situacao`, 0);
  };

  const handleEditAddress = addressData => {
    setOnEditAddressData(addressData);
    setOpenModalAddress(true);
  };

  useEffect(() => {
    if (!openModalAddress) setOnEditAddressData(null);
  }, [openModalAddress]);

  if (consumerId && isLoadingConsumer) {
    return (
      <Flex>
        <CircularProgress />
      </Flex>
    );
  }

  return (
    <StyledFormik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, dirty, setFieldValue }) => (
        <StyledForm>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} centered>
                <Tab label="Dados Pessoais" value="1" />
                <Tab label="Dados do Contato" value="2" />
                <Tab label="Endereços e Pessoas de Contato" value="3" />
                <Tab label="Observações" value="4" />
              </TabList>
            </Box>
            <TabContent>
              <PersonalDataPanel value="1" consumerId={consumerId} />
              <ContactDataPanel
                value="2"
                telefoneConsumidor={telefoneConsumidor}
              />
              <TabPanel value="3">
                <FieldArray
                  name="enderecos"
                  render={({ push, replace }) => (
                    <Content>
                      <TableContainer>
                        <DataGrid
                          rows={values.enderecos?.filter(e => e.situacao === 1)}
                          columns={columns({
                            remove: id =>
                              removeAddress(
                                values.enderecos.findIndex(e => e.id === id),
                                setFieldValue
                              ),
                            handleChangePrincipal: id =>
                              handleChangePrincipal({
                                enderecos: values.enderecos,
                                id,
                                setFieldValue,
                              }),
                            editAddress: id =>
                              handleEditAddress({
                                id,
                                index: values.enderecos.findIndex(
                                  e => e.id === id
                                ),
                              }),
                          })}
                        />
                      </TableContainer>
                      <ModalAddAddress
                        externalOpen={openModalAddress}
                        setExternalOpen={setOpenModalAddress}
                        insertAddress={push}
                        updateAddress={values => {
                          replace(onEditAddressData.index, values);
                          setOnEditAddressData(null);
                        }}
                        consumerId={consumerId}
                        enderecoId={onEditAddressData?.id}
                      />
                    </Content>
                  )}
                />
              </TabPanel>
              <TabPanel value="4">
                <Content>
                  <Field
                    name="obs"
                    component={FormikTextField}
                    fullWidth
                    label="Observações"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 4000 }}
                    onKeyDown={e =>
                      onKeyDownBreakLineOnEnter(e, values.obs, text =>
                        setFieldValue("obs", text)
                      )
                    }
                  />
                </Content>
              </TabPanel>
            </TabContent>
          </TabContext>
          <TabFooter>
            <Button type="button" onClick={() => handleCancel()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!dirty}>
              Salvar
            </Button>
          </TabFooter>
        </StyledForm>
      )}
    </StyledFormik>
  );
};
