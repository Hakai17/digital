import { Grid, Toolbar } from "@mui/material";
import { useState } from "react";
import { ConsumerDataForm } from "..";
import { SideBarConsumer } from "./SideBarConsumer/SideBarConsumer";
import { TableConsumers } from "./TableConsumers/TableConsumers";
import { FormContainer, Main, Section } from "./styles";

const columns = (containsSelect, simpleView) => {
  const col = [
    { key: "id", title: "Código Consumidor" },
    { key: "nome", title: "Nome" },
    { key: "telefone", title: "Telefone" },
    { key: "celular", title: "Celular" },
  ];

  if (containsSelect) col.push({ key: "select", title: "Selecionar" });

  if (!simpleView) col.push({ key: "editar", title: "Editar" });

  return col;
};

export function ConsumerRegistration({
  onClickCallback = null,
  onSave = null,
  simpleView = false,
  telefoneConsumidor = undefined,
}) {
  const [consumers, setConsumers] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState({});
  const [editarAdicionar, setEditarAdicionar] = useState(false);

  const handleCancel = () => {
    setSelectedConsumer(null);
    setEditarAdicionar(false);
  };

  const handleEditar = values => {
    setSelectedConsumer(values);
    setEditarAdicionar(true);
  };

  return (
    <Grid container>
      <SideBarConsumer
        onSearch={setConsumers}
        setEditarAdicionar={setEditarAdicionar}
        simpleView={simpleView}
      />

      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft="1.5rem">
            {!editarAdicionar && (
              <TableConsumers
                consumers={consumers}
                onClickCallback={values =>
                  onClickCallback
                    ? onClickCallback(values)
                    : handleEditar(values)
                }
                handleEditar={handleEditar}
                columns={columns(!!onClickCallback, simpleView)}
              />
            )}

            {editarAdicionar && (
              <ConsumerDataForm
                consumerId={selectedConsumer?.id}
                handleCancel={handleCancel}
                onSave={values => {
                  onSave && onSave(values);
                  handleCancel();
                }}
                telefoneConsumidor={telefoneConsumidor}
              />
            )}
          </Section>
        </FormContainer>
      </Main>
    </Grid>
  );
}
