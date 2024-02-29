// import WebSocket from 'ws';
// import { db, PlayerStorage } from '../../db/playerStorage';
// import { activeServers } from './activeServers';
// eslint-disable-next-line import/no-cycle
import {
  WsRequest, WsResponse, Player, PlayerIndex, GameId, ShipInfo,
} from '../../models/types';
// import { getResStringify } from '../../helpers';
// import { MESSAGES, COMMAND_TYPES } from '../../constants';

interface PlayerState {
  // playerId: PlayerIndex,
  ships: ShipInfo[],
}

type PlayersState = Map<PlayerIndex, PlayerState>;
type Turn = PlayerIndex | undefined;

const VALUE_OF_SHIPS = 10;
const VALUE_OF_PLAYERS = 2;

export class Game {
  gameId: GameId;
  private gamePlayers: PlayerIndex[];
  private playersState: PlayersState;
  private turn: Turn;

  constructor() {
    this.gameId = Date.now();
    this.gamePlayers = [];
    this.playersState = new Map();
    this.turn = this.gamePlayers[0] || undefined;
  }

  addPlayer(indexPlayer: PlayerIndex) {
    this.gamePlayers.push(indexPlayer);
  }

  addShips(indexPlayer: PlayerIndex, ships: ShipInfo[]) {
    this.playersState.set(indexPlayer, { ships });
  }

  isReadyToStart(): boolean {
    return this.playersState.size === VALUE_OF_PLAYERS;
  }

  switchTurn() {
    const newTurn = this.gamePlayers.find((playerId) => playerId !== this.turn);
    this.turn = newTurn;
    return this.turn;
  }

  whoseTurn() {
    return this.turn;
  }
}
