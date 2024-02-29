import WebSocket from 'ws';
import { db, PlayerStorage } from '../../db/playerStorage';
import { activeServers } from './activeServers';
import { WsRequest, WsResponse, Player } from '../../models/types';
import { getResStringify } from '../../helpers';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export class HandleEntry {
  private db: PlayerStorage;

  constructor() {
    this.db = db;
  }

  handleEntry(ws: WebSocket, req: WsRequest): void {
    const { name, password } = JSON.parse(req.data);
    try {
      const player: Player | null = this.db.loginPlayer(name, password);

      if (!player) {
        throw new Error();
      }

      activeServers.set(ws, { index: player.index, name: player.name });

      const resData = {
        name,
        index: player.index,
        error: false,
        errorText: '',
      };

      ws.send(getResStringify(COMMAND_TYPES.reg, resData));
    } catch {
      const rejData = {
        name: name || '',
        index: -1,
        error: true,
        errorText: MESSAGES.invalidCreds,
      };

      ws.send(getResStringify(COMMAND_TYPES.reg, rejData));
    }
  }
}
