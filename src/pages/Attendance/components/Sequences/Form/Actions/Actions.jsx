import { Switch, Table, TableBody, TableCell, TableHead } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { IconButton } from "../../../../../../components/_UI/IconButton/IconButton";

import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { get, post } from "../../../../../../utils/api";
import { ModalAddAction } from "./ModalAddAction";

import { FUNCAO, STATUS } from "../../../../constants";
import {
  Container,
  RowActions,
  TableActions,
  TableContainer,
  TableRow,
} from "./styles";

const columns = [
  { id: "descricao", label: "Descrição" },
  { id: "nomeReferencia", label: "Referência" },
  { id: "destinatario", label: "Destinatário" },
  { id: "statusAcaoContato", label: "Concluído" },
  { id: "inicio", label: "Início" },
];

export const Actions = ({
  insertAction,
  removeAction,
  updateAction,
  index,
}) => {
  const { values, isSubmitting } = useFormikContext();
  const { data: actions } = useQuery({
    queryKey: ["actions"],
    queryFn: () => get("/acao/listar?somenteAtivo=true"),
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => post("/usuario/listar"),
  });

  const handleChangeStatusAction = ({ action, indexAction }) => {
    updateAction(indexAction, {
      ...action,
      statusAcaoContato:
        action.statusAcaoContato === STATUS.P ? STATUS.C : STATUS.P,
    });
  };

  const removeActionRow = indexAction => {
    let action = values.sequencias[index].acaoContato.find(
      (a, i) => i === indexAction
    );

    if (action.funcao === FUNCAO.U) {
      action.funcao = FUNCAO.D;
      updateAction(indexAction, action);
      return;
    }

    removeAction(indexAction);
  };

  const renderCellsBody = ({ column, action, indexAction }) => {
    switch (column.id) {
      case "descricao": {
        const descricaoAcao = actions?.find(
          a => a.id === Number(action.acaoId)
        )?.descricao;

        return <TableCell key={column.id}>{descricaoAcao}</TableCell>;
      }

      case "destinatario": {
        const descricaoUsuario =
          action.usuarioRecebimento !== ""
            ? users?.find(u => u.id === Number(action.usuarioRecebimento))
                ?.descricao
            : "";

        return <TableCell key={column.id}>{descricaoUsuario}</TableCell>;
      }

      case "statusAcaoContato": {
        return (
          <TableCell key={column.id} role="checkbox">
            <Switch
              checked={action.statusAcaoContato === STATUS.C}
              onChange={() => handleChangeStatusAction({ action, indexAction })}
            />
          </TableCell>
        );
      }

      default:
        return <TableCell key={column.id}>{action[column.id]}</TableCell>;
    }
  };

  return (
    <>
      <Container>
        <TableContainer>
          <Table stickyHeader aria-label="actions table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {values.sequencias[index].acaoContato && (
              <TableBody>
                {values.sequencias[index].acaoContato.map(
                  (action, indexAction) => (
                    <TableRow key={action.contatoId} hover>
                      {columns.map(column =>
                        renderCellsBody({ column, action, indexAction })
                      )}

                      <RowActions>
                        <ModalAddAction
                          action={action}
                          index={index}
                          insertAction={valuesToUpdate =>
                            updateAction(indexAction, valuesToUpdate)
                          }
                        >
                          {props => (
                            <IconButton {...props}>
                              <PencilSimple size={22} weight="fill" />
                            </IconButton>
                          )}
                        </ModalAddAction>

                        <IconButton
                          onClick={() => removeActionRow(indexAction)}
                        >
                          <TrashSimple size={22} weight="fill" />
                        </IconButton>
                      </RowActions>
                    </TableRow>
                  )
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Container>

      <TableActions container>
        <ModalAddAction
          insertAction={valueToInsert =>
            insertAction(
              values?.sequencias[index]?.acaoContato?.length || 0,
              valueToInsert
            )
          }
          index={index}
          isDisabled={isSubmitting}
        />
      </TableActions>
    </>
  );
};

Actions.propTypes = {
  insertAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
