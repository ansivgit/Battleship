import dotenv from 'dotenv';
import { httpServer } from './src/http_server/index';
import { connectionHandler } from './src/websocket/server';

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 3000;

console.info(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

connectionHandler(WS_PORT);
