import * as signalR from "@microsoft/signalr";

class SocketSignalR {
  constructor() {
    this.events = {};
    this.attemps = 0;
    this.connection = null;
    this.state = {};
  }

  configure({
    reconnectTimeout = 1000,
    maxReconnecAttempts = 1,
    state = {},
    ...options
  }) {
    this.state = state;
    this.reconnectTimeout = reconnectTimeout;
    this.maxReconnecAttempts = maxReconnecAttempts;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_SIGNALR_URL, { ...options })
      .configureLogging(signalR.LogLevel.Critical)
      .withAutomaticReconnect()
      .build();

    this.connection.on("Dispatch", ({ action, payload, clients }) => {
      let data = {};
      try {
        data = payload ? JSON.parse(payload) : {};
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error when converting payload signalr: ", error);
      } finally {
        const { identificadorUsuario } = this.state;
        if (Array.isArray(clients) && clients.includes(identificadorUsuario)) {
          this.dispatch(action, data);
        }
      }
    });

    this.connection.on("Auth", () => {
      this.connection.send("Register", this.state).then(() => {
        this.attemps = 0;
      });
    });

    return this;
  }

  async connect() {
    if (!this.state.identificadorUsuario) {
      throw new Error("It is necessary to provide a user identifier");
    }
    if (this.attemps > this.maxReconnecAttempts) {
      throw new Error("Maximum number of connection attempts exceeded");
    }
    try {
      await this.connection.start();
    } catch (error) {
      this.attemps += 1;

      //  Retry initial start failures
      setTimeout(() => {
        this.connect();
      }, this.reconnectTimeout);
    }
  }

  emit(action = "SendMessage", data) {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send(action, data);
    } else {
      throw new Error("The websocket connection has not been established");
    }
  }

  dispatch(event, ...rest) {
    if (typeof this.events[event] === "object") {
      this.events[event].forEach(listener => listener.apply(this, rest));
    }

    // if (event === eActions.TESTE_NOTIFICACAO_CONSOLE) {
    //   // eslint-disable-next-line no-console
    //   console.log("SignalR conectado");
    // }
  }

  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (typeof this.events[event] === "object") {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  once(event, listener) {
    const remove = this.on(event, (...rest) => {
      remove();
      listener.apply(this, rest);
    });
  }

  disconnect() {
    if (this.connection) {
      // eslint-disable-next-line
      this.connection.stop().then(() => console.log("Conexão encerrada."));
      this.connection = null;
    }
  }
}

const socket = new SocketSignalR();

export default socket;
