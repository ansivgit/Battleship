import WebSocket from 'ws';
import { db, DbService } from '../db/db-service';
import { WsRequest, WsResponse } from '../models/types';
import { MESSAGES } from '../constants';

export class HandleEntry {
  private db: DbService;

  constructor() {
    this.db = db;
  }

  async handleSignIn(ws: WebSocket, req: WsRequest) {
    const { name, password } = JSON.parse(req.data);
    try {
      const playerData = await this.db.signInPlayer(name, password);

      if (!playerData) {
        throw new Error();
      }

      const resData = {
        name,
        index: playerData.index,
        error: false,
        errorText: '',
      };

      const res = {
        type: req.type,
        data: JSON.stringify(resData),
        id: req.id,
      };

      ws.send(JSON.stringify(res));
    } catch {
      const rejData = {
        name: name || '',
        index: -1,
        error: true,
        errorText: MESSAGES.invalidCreds,
      };

      const res = {
        type: req.type,
        data: JSON.stringify(rejData),
        id: req.id,
      };
      ws.send(JSON.stringify(res));
    }
  }

  async handleLogin(ws: WebSocket, req: WsRequest) {
    const { name, password } = JSON.parse(req.data);
    try {
      const registeredplayer = await this.db.loginPlayer(name, password);

      if (!registeredplayer) {
        throw new Error();
      }

      const resData = {
        name,
        index: registeredplayer.index,
        error: false,
        errorText: '',
      };

      const res = {
        type: req.type,
        data: JSON.stringify(resData),
        id: req.id,
      };

      ws.send(JSON.stringify(res));
    } catch {
      const rejData = {
        name: name || '',
        index: -1,
        error: true,
        errorText: MESSAGES.invalidCreds,
      };

      const res = {
        type: req.type,
        data: JSON.stringify(rejData),
        id: req.id,
      };

      ws.send(JSON.stringify(res));
    }
  }
}
