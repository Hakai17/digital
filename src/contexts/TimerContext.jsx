import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { maybeCallback } from "../utils/functionHelper";
import {
  convertMilisecondsToMinutes,
  convertMilisecondsToSeconds,
} from "../utils/timeHelper";

const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [times, setTimes] = useState([0]);
  const [indexActiveTimer, setIndexActiveTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const totalTimer = useMemo(
    () => times.reduce((acumulator, timer) => acumulator + timer, 0),
    [times]
  );
  const activeTimer = useMemo(
    () => times[indexActiveTimer],
    [times, indexActiveTimer]
  );

  useEffect(() => {
    if (!isActive) return;

    let id = setTimeout(() => {
      setTimes(times =>
        times.map((time, i) => (i === indexActiveTimer ? time + 1 : time))
      );
    }, 1000);

    return () => clearTimeout(id);
  }, [activeTimer, isActive]);

  const selectTimer = index => {
    setIndexActiveTimer(index);
  };

  const addTimer = ({ timer = 0, index = 0 }) => {
    setTimes(times => [...times, (times[index] = timer)]);
  };

  const removeTimer = index => {
    setTimes(times => [...times.slice(0, index), ...times.slice(index + 1)]);
  };

  const startTimer = ({ timers }) => {
    setTimes(timers || [0]);
    setIsActive(true);
  };

  const stopTimer = () => {
    setTimes([0]);
    setIndexActiveTimer(0);
    setIsActive(false);
  };

  const getTimes = () => {
    return `${convertMilisecondsToMinutes(
      totalTimer
    )}:${convertMilisecondsToSeconds(totalTimer)}`;
  };

  const setTimers = callback => {
    maybeCallback(callback)(times);
  };

  const contextValues = useMemo(() => {
    return {
      totalTimerMinutes: convertMilisecondsToMinutes(totalTimer),
      totalTimerSeconds: convertMilisecondsToSeconds(totalTimer),
      activeTimerMinutes: convertMilisecondsToMinutes(activeTimer),
      activeTimerSeconds: convertMilisecondsToSeconds(activeTimer),
      startTimer,
      stopTimer,
      addTimer,
      selectTimer,
      removeTimer,
      setTimers,
      getTimes,
    };
  }, [totalTimer, activeTimer]);

  return (
    <TimerContext.Provider value={contextValues}>
      {children}
    </TimerContext.Provider>
  );
};

TimerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTimerContext = () => useContext(TimerContext);

export default TimerContextProvider;
