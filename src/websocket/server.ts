import WebSocket, { WebSocketServer } from 'ws';
import { db } from '../db/playerStorage';
// import { activeServers } from './players/activeServers';
import { HandleEntry, createRoom } from './index';
import { WsRequest } from '../models/types';
import { COMMAND_TYPES } from '../constants';

export const connectionHandler = (port: number) => {
  const wsServer = new WebSocketServer(
    { port, clientTracking: true },
    () => console.log(`WebSocket server started on ${port} port`),
  );

  wsServer.on('connection', (ws: WebSocket) => {
    console.info('Client connected');
    ws.on('error', console.error);

    ws.on('message', (message: string) => {
      const req = JSON.parse(message);
      console.info('received: %s', message);
      handleRequest(ws, req);
    });

    ws.send('connected');

    ws.on('close', () => {
      console.info('Client disconnected');
    });
  });
};

function handleRequest(ws: WebSocket, req: WsRequest) {
  console.log('db', db);

  const handleEntry = new HandleEntry();

  switch (req.type) {
    case COMMAND_TYPES.reg:
      handleEntry.handleEntry(ws, req);
      break;
    case COMMAND_TYPES.createRoom:
      createRoom(ws);
      break;
    default:
      console.log('Bad request');
  }
}
