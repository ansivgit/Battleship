import WebSocket from 'ws';
// eslint-disable-next-line import/no-cycle
import { Game } from '../websocket/games/Game';

export type PlayerName = string;
export type PlayerPassword = string;
export type PlayerIndex = number;
export type PlayerWins = number;
export type CommandType = string;

export type RoomId = number;

export type GameId = number;
export type Coordinates = { x: number, y: number };
export type ShipType = 'huge' | 'large' | 'medium' | 'small';
export type ShipLength = 4 | 3 | 2 | 1;

export interface WsRequest {
  type: CommandType,
  data: string,
  id: number,
}

export interface WsResponse {
  type: CommandType,
  data: string,
  id: number,
}

export interface WsReject {
  type: CommandType,
  data: string,
  id: number,
}

export interface PlayerCreds {
  name: PlayerName,
  password: PlayerPassword,
}

export interface Player extends PlayerCreds {
  index: PlayerIndex,
  wins: PlayerWins,
}

export interface UserIdentification {
  name: PlayerName,
  index: PlayerIndex,
}

export interface RoomUser extends UserIdentification {
  ws: WebSocket,
}

export interface Room {
  roomId: RoomId,
  roomUsers:
  RoomUser[],
}

export interface AddToRoomData {
  indexRoom: RoomId,
}

export interface CreateGameData {
  idGame: number,
  idPlayer: number, // id for player in the game session, who have sent add_user_to_room request, not enemy *\
}

export interface ShipInfo {
  position: Coordinates,
  direction: boolean, // false - horizontal, true - vertical
  type: ShipType,
  length: ShipLength,
}

export interface AddShipsData {
  gameId: GameId,
  ships: ShipInfo[],
  indexPlayer: PlayerIndex,
}

export interface PlayerInGame extends RoomUser {
  ships: ShipInfo[];
}

export interface ActiveGame {
  game: Game;
  players: Map<PlayerIndex, PlayerInGame>;
}

export interface StartGameData {
  ships: ShipInfo[],
  currentPlayerIndex: PlayerIndex, /* id of the player in the current game session, who have sent his ships */
}

export interface TurnData {
  currentPlayer: PlayerIndex, /* id of the player in the current game session */
}
