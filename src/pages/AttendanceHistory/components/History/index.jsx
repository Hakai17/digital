import { Grid, Toolbar } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, ModalPrintPdf, ViewAtendimento } from "../../../../components";
import { TableDefault } from "../../../../components/ModalSearchConsumer/TableDefault/TableDefault";
import { FilterSidebar } from "../FilterSidebar";
import { FormContainer, Main, Section } from "./styles";
import dayjs from "dayjs";

const columns = [
  { key: "contatoId", title: " Código" },
  { key: "sequenciaId", title: " Seq" },
  { key: "manifestacao", title: "Manifestação" },
  { key: "usuario", title: "Usuário" },
  { key: "data", title: "Data" },
  { key: "status", title: "Status" },
  { key: "select", title: "Selecionar" },
  { key: "ver", title: "Ver" },
  { key: "imprimir", title: "Imprimir" },
];

export function AttendanceHistory() {
  const navigate = useNavigate();
  const [atendimentos, setAtendimentos] = useState([]);
  const [atendimento, setAtendimento] = useState({});
  const [verDetalhes, setVerDetalhes] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEditar = values => {
    setAtendimento(values);
    setVerDetalhes(true);
  };

  const handleAtendimentos = atendimentos => {
    atendimentos = atendimentos.map(at => {
      const formattedDate = dayjs(at.data).format("DD-MM-YYYY");
      const formattedTime = dayjs(at.data).format("HH:mm:ss");
      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      at.data = formattedDateTime;
      return at;
    });
    setAtendimentos(atendimentos);
  };

  return (
    <Grid container>
      <FilterSidebar
        setAtendimentos={handleAtendimentos}
        setVerDetalhes={setVerDetalhes}
      />

      <Main>
        <FormContainer container direction="column" spacing={3}>
          <Toolbar />

          <Section marginLeft={"3rem"} marginTop={"1rem"}>
            {!verDetalhes && (
              <TableDefault
                data={atendimentos}
                onSelectRow={({ contatoId }) =>
                  navigate(`/atendimento/${contatoId}`)
                }
                openPreview={handleEditar}
                columns={columns}
                openPrintModal={item => {
                  setAtendimento(item);
                  setOpen(!open);
                }}
              />
            )}

            {verDetalhes && (
              <ViewAtendimento
                handleCancel={() => setVerDetalhes(false)}
                atendimento={atendimento}
                submitAction={() => (
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      navigate(`/atendimento/${atendimento.contatoId}`);
                    }}
                  >
                    Abrir atendimento
                  </Button>
                )}
              />
            )}
          </Section>
        </FormContainer>
        <ModalPrintPdf
          open={open}
          handleChangeOpen={() => setOpen(!open)}
          dataAttendance={atendimento}
        />
      </Main>
    </Grid>
  );
}
