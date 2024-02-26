import WebSocket from 'ws';
// eslint-disable-next-line import/no-cycle
import { activeGames } from './activeGames';
import { activeServers } from '../players/activeServers';
// import { updateRoom } from './updateRoom';
// import { createGame } from '../games';
import { getResStringify } from '../../helpers';
import {
  WsRequest, Room, AddToRoomData, UserIdentification, GameId, CreateGameData, ShipInfo, AddShipsData, ActiveGame, PlayerInGame, StartGameData, TurnData, PlayerIndex,
} from '../../models/types';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export const addShips = (ws: WebSocket, req: WsRequest): void => {
  try {
    const { gameId, ships, indexPlayer }: AddShipsData = JSON.parse(req.data);

    const gameInfo: ActiveGame | undefined = activeGames.get(gameId);
    if (!gameInfo) {
      throw new Error('Error from addShips');
    }

    const { game, players } = gameInfo;

    const currentPlayer: PlayerInGame | undefined = players.get(indexPlayer);
    if (!currentPlayer) {
      throw new Error('Error from addShips');
    }
    currentPlayer.ships = ships;
    game.addShips(currentPlayer.index, ships);

    console.log(222, gameInfo);

    if (game.isReadyToStart()) {
      players.forEach((player) => {
        if (!player.ships) {
          return null;
        }

        const resData: StartGameData = {
          currentPlayerIndex: player.index,
          ships: player.ships,
        };

        player.ws.send(getResStringify(COMMAND_TYPES.startGame, resData));

        const whoseTurn: PlayerIndex | undefined = game.whoseTurn();

        player.ws.send(getResStringify(COMMAND_TYPES.turn, whoseTurn));
        // ws.send(turnResponse);
        // turnBroadcast(player.ws, currentPlayer);
      });
    }

    // const { index, name } = newPlayer;

    // if (room.roomUsers[0]?.index === index) {
    //   throw new Error(MESSAGES.alreadyInRoom);
    // }

    // room.roomUsers.push({ name, index, ws });

    // const gameId: GameId | undefined = createGame(room.roomUsers);

    // if (!gameId) {
    //   throw new Error(MESSAGES.gameNotCreated);
    // }

    // room.roomUsers.forEach((player) => {
    //   // ? move to separate function?
    //   const resData: CreateGameData = { idGame: gameId, idPlayer: player.index };
    //   player.ws.send(getResStringify(COMMAND_TYPES.createGame, resData));
    //   console.log(333, player.name, 'idGame', gameId);
    // });

    // activeRooms.delete(room.roomId);
    // updateRoom();
  } catch {
    const rejData = {
      name: '',
      index: -1,
      error: true,
      errorText: `${MESSAGES.roomNotFound} or ${MESSAGES.playerNotFound}`,
    };
    // ws?.send(getResStringify(COMMAND_TYPES.updateRoom, rejData));
  }
};
