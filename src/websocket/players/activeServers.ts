import WebSocket from 'ws';
// eslint-disable-next-line import/no-cycle
import { PlayerIndex, PlayerName } from '../../models/types';

export const activeServers: Map<WebSocket, { index: PlayerIndex, name: PlayerName }> = new Map();
