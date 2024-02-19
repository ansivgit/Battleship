import WebSocket from 'ws';

export interface WsRequest {
  type: string,
  data: string,
  id: number,
}

// export interface Response {
//   type: string,
//   data: unknown,
//   id: number,
// }

export interface WsResponse {
  type: string,
  data: string,
  id: number,
}

export interface WsReject {
  type: string,
  data: string,
  id: number,
}

export interface NewPlayer {
  name: string,
  password: string,
}

export interface Player extends NewPlayer {
  index: number,
  wins: number,
}

export interface Room {
  roomId: number,
  roomUsers:
  [
    {
      name: string,
      index: number,
      ws: WebSocket,
    }
  ],
}
