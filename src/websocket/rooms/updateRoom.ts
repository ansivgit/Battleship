import WebSocket from 'ws';
// import { db, PlayerStorage } from '../../db/playerStorage';
import { activeServers } from '../players/activeServers';
import { activeRooms } from './activeRooms';
import { Player, Room } from '../../models/types';
import { getResStringify } from '../../helpers';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export const updateRoom = (): void => {
  try {
    const rooms: Room[] = [...activeRooms.values()];
    const resData = rooms.filter((room: Room) => room.roomUsers.length === 1);
    const res = getResStringify(COMMAND_TYPES.updateRoom, resData);

    activeServers.forEach((_, ws: WebSocket) => ws.send(res));
  } catch {
    const rejData = {
      name: '',
      index: -1,
      error: true,
      errorText: MESSAGES.playerNotFound,
    };
    // ws.send(getResStringify(COMMAND_TYPES.updateRoom, rejData));
  }
};
