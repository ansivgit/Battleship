import WebSocket from 'ws';
import { PlayerIndex, PlayerName } from '../../models/types';

export const activeServers: Map<WebSocket, { index: PlayerIndex, name: PlayerName }> = new Map();
