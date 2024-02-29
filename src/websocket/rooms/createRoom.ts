import WebSocket from 'ws';
import { db, PlayerStorage } from '../../db/playerStorage';
import { activeServers } from '../players/activeServers';
import { activeRooms } from './activeRooms';
import { updateRoom } from './updateRoom';
import { Player, PlayerIndex, Room } from '../../models/types';
import { getResStringify } from '../../helpers';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export const createRoom = (ws: WebSocket): void => {
  try {
    const playerIndex: PlayerIndex | undefined = activeServers.get(ws)?.index;
    const roomCreator: Player | undefined = db.getPlayersList().find((player) => player.index === playerIndex);

    if ((playerIndex !== 0 && !playerIndex) || !roomCreator) {
      throw new Error();
    }

    const roomId = Date.now();

    const newRoom: Room = {
      roomId,
      roomUsers: [{ name: roomCreator.name, index: roomCreator.index, ws }],
    };

    activeRooms.set(roomId, newRoom);
    updateRoom();
  } catch {
    const rejData = {
      name: '',
      index: -1,
      error: true,
      errorText: MESSAGES.playerNotFound,
    };
    ws.send(getResStringify(COMMAND_TYPES.createRoom, rejData));
  }
};
