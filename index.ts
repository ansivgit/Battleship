import dotenv from 'dotenv';
import { httpServer } from './src/http_server/index.js';

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 8181;

console.info(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
