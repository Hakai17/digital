import { createContext, useContext, useState } from "react";

const BackdropContext = createContext();

export const BackdropContextProvider = ({ children }) => {
  const [opened, setOpen] = useState(false);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  return (
    <BackdropContext.Provider
      value={{
        open,
        close,
        opened,
      }}
    >
      {children}
    </BackdropContext.Provider>
  );
};

export const useBackdrop = () => useContext(BackdropContext);

export default BackdropContextProvider;
