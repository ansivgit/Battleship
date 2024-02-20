import WebSocket from 'ws';
import { activeRooms } from './activeRooms';
import { activeServers } from '../players/activeServers';
import { updateRoom } from './updateRoom';
import { createGame } from '../games';
import { getResStringify } from '../../helpers';
import { WsRequest, Room, AddToRoomData, UserIdentification, GameId, CreateGameData } from '../../models/types';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export const addToRoom = (ws: WebSocket, req: WsRequest): void => {
  try {
    const { indexRoom }: AddToRoomData = JSON.parse(req.data);
    const room: Room | undefined = activeRooms.get(indexRoom);

    const newPlayer: UserIdentification | undefined = activeServers.get(ws);

    if (!room || !newPlayer) {
      throw new Error();
    }

    const { index, name } = newPlayer;

    if (room.roomUsers[0]?.index === index) {
      throw new Error(MESSAGES.alreadyInRoom);
    }

    room.roomUsers.push({ name, index, ws });

    const gameId: GameId | undefined = createGame(room.roomUsers);

    if (!gameId) {
      throw new Error(MESSAGES.gameNotCreated);
    }

    room.roomUsers.forEach((player) => {
      //? move to separate function?
      const resData: CreateGameData = { idGame: gameId, idPlayer: player.index };
      player.ws.send(getResStringify(COMMAND_TYPES.createGame, resData));
      console.log(333, player.name, 'idGame', gameId);
    });

    activeRooms.delete(room.roomId);
    updateRoom();
  } catch {
    const rejData = {
      name: '',
      index: -1,
      error: true,
      errorText: `${MESSAGES.roomNotFound} or ${MESSAGES.playerNotFound}`,
    };
    ws?.send(getResStringify(COMMAND_TYPES.updateRoom, rejData));
  }
};
