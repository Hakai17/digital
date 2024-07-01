import { Switch } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";

import { get, post } from "../../../../../../../../utils/api";
import {
  ROUTINES_WITHOUT_EMAIL_CHECKBOX,
  ROUTINES_WITHOUT_USER_FIELD,
} from "../../../../../../constants";
import { ControlLabel, SelectField, SelectFieldWithoutFormik } from "./styles";
import { useConditionalFields } from "./useConditionalFields";

const FIELD_TYPE_RECEIVE = {
  GROUP: 1,
  USER: 2,
};

const fieldTypeOptions = [
  { id: FIELD_TYPE_RECEIVE.GROUP, descricao: "Grupo" },
  { id: FIELD_TYPE_RECEIVE.USER, descricao: "Usuário" },
];

export const ConditionalFields = () => {
  const [userFieldType, setUserFieldType] = useState(FIELD_TYPE_RECEIVE.USER);
  const { values, setFieldValue } = useFormikContext();
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    query: ["users"],
    queryFn: () => post("/usuario/listar"),
  });
  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ["userGroups"],
    queryFn: () => get("/usuario/buscarGrupos"),
  });
  const { data: actions } = useQuery({
    queryKey: ["actions"],
    queryFn: () => get("/acao/listar?somenteAtivo=true"),
  });
  const actionSelected = useMemo(
    () =>
      actions?.find(action => Number(action.id) === Number(values.acaoId)) || 0,
    [actions, values.acaoId]
  );
  values.rotinaId = actionSelected.rotinaId;
  const { fields: Fields } = useConditionalFields(actionSelected.rotinaId);

  useEffect(() => {
    if (values.usuarioRecebimento) setUserFieldType(FIELD_TYPE_RECEIVE.USER);

    if (values.grupoUsuarioId) setUserFieldType(FIELD_TYPE_RECEIVE.GROUP);
  }, []);

  return (
    <>
      {Fields && <Fields actionName={actionSelected.descricao} />}

      {!!actionSelected.rotinaId &&
        !ROUTINES_WITHOUT_USER_FIELD.includes(actionSelected.rotinaId) && (
          <>
            <SelectFieldWithoutFormik
              value={userFieldType}
              label="Tipo de recebimento (Usuários/Grupos)"
              options={fieldTypeOptions}
              onChange={e => {
                setUserFieldType(parseInt(e.target.value));
                setFieldValue("usuarioRecebimento", "");
                setFieldValue("grupoUsuarioId", "");
              }}
            />
            {userFieldType === FIELD_TYPE_RECEIVE.USER && (
              <Field
                name="usuarioRecebimento"
                component={SelectField}
                label="Usuário"
                options={users}
                isLoading={isLoadingUsers}
              />
            )}
            {userFieldType === FIELD_TYPE_RECEIVE.GROUP && (
              <Field
                name="grupoUsuarioId"
                component={SelectField}
                label="Grupo"
                options={groups}
                isLoading={isLoadingGroups}
              />
            )}
          </>
        )}

      {!!actionSelected.rotinaId &&
        !ROUTINES_WITHOUT_EMAIL_CHECKBOX.includes(actionSelected.rotinaId) && (
          <ControlLabel
            label="Enviar e-mail"
            control={<Field component={Switch} name="enviaEmail" />}
          />
        )}
    </>
  );
};
