import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab } from "@mui/material";
import { FilePlus, X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { useAttendanceContext } from "../../../../contexts/AttendanceContext";
import { useTimerContext } from "../../../../contexts/TimerContext";
import { get } from "../../../../utils/api";
import { Form } from "./Form/Form";
import {
  CloseTabButton,
  CloseTabContainer,
  LabelTabContainer,
  OpenTabButton,
} from "./styles";

export const Sequences = ({ increment, remove }) => {
  const [value, setValue] = useState(0);
  const { values, isSubmitting } = useFormikContext();
  const { addTimer, selectTimer, removeTimer } = useTimerContext();
  const {
    activeSequence,
    activeSequenceIndex,
    setActiveSequence,
    setActiveSequenceIndex,
  } = useAttendanceContext();

  const { data: manifestations } = useQuery({
    queryKey: ["manifestations"],
    queryFn: () => get("/manifestacao/listar"),
  });

  useEffect(() => {
    setActiveSequenceIndex(value);
    setActiveSequence(values.sequencias[value]);
  }, [value]);

  const handleChangeTabs = (e, newValue) => {
    if (activeSequence)
      values.sequencias[activeSequenceIndex].respostas =
        activeSequence.respostas;

    setValue(newValue);
    selectTimer(newValue);
  };

  const getLabelTab = useCallback(
    id =>
      manifestations?.find(manifestation => manifestation?.id === Number(id))
        ?.descricao,
    [manifestations, values.sequencias]
  );

  const handleIncrementTabs = () => {
    const indexSequencia = values.sequencias.length;
    increment(indexSequencia);
    addTimer({ index: indexSequencia });
    setValue(indexSequencia);
  };

  const handleDecrementTabs = index => {
    remove(index);
    removeTimer(index);
    if (value === index) {
      setValue(index - 1);
      selectTimer(index - 1);
    } else {
      setValue(value);
    }
  };

  return (
    <Paper>
      <TabContext value={value}>
        <TabList onChange={handleChangeTabs}>
          {values.sequencias?.map((sequencia, index) => (
            <Tab
              id={`tab-${index}`}
              key={index}
              aria-controls={`tabpanel-${index}`}
              label={
                <LabelTabContainer>
                  {getLabelTab(sequencia?.manifestacaoId)}

                  {index !== 0 && (
                    <CloseTabContainer>
                      <CloseTabButton
                        size="small"
                        onClick={() => handleDecrementTabs(index)}
                        disabled={isSubmitting}
                      >
                        <X size={16} weight="bold" />
                      </CloseTabButton>
                    </CloseTabContainer>
                  )}
                </LabelTabContainer>
              }
            />
          ))}

          <OpenTabButton onClick={handleIncrementTabs} disabled={isSubmitting}>
            <FilePlus size={22} />
          </OpenTabButton>
        </TabList>

        {values.sequencias?.map(
          (sequencia, index) =>
            value === index && (
              <TabPanel key={index} value={value} index={index}>
                <Form index={index} />
              </TabPanel>
            )
        )}
      </TabContext>
    </Paper>
  );
};

Sequences.propTypes = {
  increment: PropTypes.func,
  remove: PropTypes.func,
};
