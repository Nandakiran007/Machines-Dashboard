import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MachinesGateway {
  @WebSocketServer()
  server: Server;

  emitReadingsUpdated(payload: any) {
    this.server?.emit('machine.readings.updated', payload);
  }
}
