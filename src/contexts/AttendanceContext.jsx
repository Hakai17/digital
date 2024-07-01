import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { initialValuesSequence } from "../pages/Attendance/constants";

const AttendanceContext = createContext();

export const AttendanceContextProvider = ({ children }) => {
  const [isAttendanceOn, setIsAttendanceOn] = useState(false);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeSequence, setActiveSequence] = useState(initialValuesSequence);
  const [attachments, setAttachments] = useState([]);

  const setResponsesInSequence = respostas => {
    const newActiveSequence = { ...activeSequence };
    newActiveSequence.respostas = respostas;
    setActiveSequence(newActiveSequence);
  };

  return (
    <AttendanceContext.Provider
      value={{
        activeSequence,
        isAttendanceOn,
        activeSequenceIndex,
        setActiveSequence,
        setIsAttendanceOn,
        setResponsesInSequence,
        setActiveSequenceIndex,
        attachments,
        setAttachments,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

AttendanceContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAttendanceContext = () => useContext(AttendanceContext);

export default AttendanceContextProvider;
