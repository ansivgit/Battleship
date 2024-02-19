import WebSocket from 'ws';

export const activeServers: Map<WebSocket, { playerIndex: number }> = new Map();
