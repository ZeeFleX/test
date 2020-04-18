import io from "socket.io-client";
import config from "../config/config";
import EntitiesStore from "../stores/entities.store";

interface IWebSocketClient {
  connection: any;
}

class WebSocketClient implements IWebSocketClient {
  connection: SocketIOClient.Socket;
  constructor() {
    this.connection = io(config.WS);
  }

  init() {
    const ws = this.connection;
    ws.on("updateEntity", (entity): void => {
      EntitiesStore.updateEntity(entity);
    });
    return ws;
  }
}

export default new WebSocketClient();
