import io, { Socket, Server } from 'socket.io';
import { IEntity } from '../api/repositories/entities.repo';

interface IWebSocket {
  connections: Socket[];
  ws: Server;
  init(http): void;
  onConnection(socket: Socket): void;
  sendMessage(event: string, message: IEntity, targetSocket?: Socket): void;
}

class WebSocket implements IWebSocket {
  connections: Socket[];
  ws: Server;
  constructor() {
    this.connections = [];
  }

  init(http): void {
    this.ws = io(http);
    this.ws.on('connection', this.onConnection.bind(this));
    console.log('WS server started');
  }

  onConnection(socket: Socket): void {
    this.connections.push(socket);
    console.log('client connected');
  }

  sendMessage(event: string, message: any, targetSocket: Socket = null): void {
    if (!targetSocket) {
      this.ws.emit(event, message);
    } else {
      targetSocket.emit(event, message);
    }
  }
}

export default new WebSocket();
