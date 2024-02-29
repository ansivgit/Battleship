import WebSocket from 'ws';
// eslint-disable-next-line import/no-cycle
import { Game } from './Game';
import { db, PlayerStorage } from '../../db/playerStorage';
import { activeServers } from '../players/activeServers';
import { activeGames } from './activeGames';
import { updateRoom } from '../rooms/updateRoom';
import { Player, PlayerIndex, Room, RoomUser, GameId } from '../../models/types';
import { getResStringify } from '../../helpers';
import { MESSAGES, COMMAND_TYPES } from '../../constants';

export const createGame = (roomUsers: RoomUser[]): GameId | undefined => {
  try {
    const newGame = new Game();

    roomUsers.forEach((player) => newGame.addPlayer(player.index));
    const gamePlayers = new Map(roomUsers.map((user) => [user.index, { ships: [], ...user }]));

    activeGames.set(newGame.gameId, { game: newGame, players: gamePlayers });
    return newGame.gameId;
  } catch {
    const rejData = {
      name: '',
      index: -1,
      error: true,
      errorText: MESSAGES.playerNotFound,
    };
    // ws.send(getResStringify(COMMAND_TYPES.createRoom, rejData));
  }
};
