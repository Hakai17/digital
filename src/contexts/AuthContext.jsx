import { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { api } from "../utils/api";
import { maybeCallback } from "../utils/functionHelper";
import socket from "../socket";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const cachedUser = useMemo(
    () => user || JSON.parse(localStorage.getItem("user")),
    [user]
  );

  const login = value => {
    setUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };

  const logout = ({ callback }) => {
    localStorage.removeItem("user");
    setUser(null);
    maybeCallback(callback)();
    socket.disconnect();
  };

  const connectSocket = () => {
    socket
      .configure({
        maxReconnecAttempts: 5,
        reconnectTimeout: 6000,
        state: {
          id: cachedUser.id,
          identificadorUsuario: `GrupoDeAtividadeDeUsuario_${cachedUser.id.toString()}`,
        },
      })
      .connect();
  };

  useEffect(() => {
    if (cachedUser?.token) {
      api.defaults.headers.common["Authorization"] = cachedUser.token;

      connectSocket();
    } else {
      socket.disconnect();
    }
  }, [cachedUser, cachedUser?.token]);

  return (
    <AuthContext.Provider
      value={{
        user: cachedUser,
        isAuthenticated: cachedUser != null && cachedUser != undefined,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
