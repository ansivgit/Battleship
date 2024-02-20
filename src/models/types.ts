import WebSocket from 'ws';

export type PlayerName = string;
export type PlayerPassword = string;
export type PlayerIndex = number;
export type PlayerWins = number;
export type CommandType = string;

export type RoomId = number;

export type GameId = number;

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
