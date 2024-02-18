import WebSocket, { WebSocketServer } from 'ws';
import { db } from '../db/db-service';
import { HandleEntry } from './handleEntry';
import { WsRequest } from '../models/types';

export const handleRequest = (ws: WebSocket, req: WsRequest) => {
  console.log('db', db);

  const handleEntry = new HandleEntry();

  switch (req.type) {
    case 'reg':
      if (db.isPlayerExist(req.data?.name)) {
        handleEntry.handleLogin(ws, req);
      } else {
        handleEntry.handleSignIn(ws, req);
      }
      break;
    default:
      console.log('Bad request');
  }
};

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
