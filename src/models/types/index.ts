export interface NewPlayer {
  name: string,
  password: string,
}

export interface Player extends NewPlayer {
  index: number,
  wins: number,
}

export interface WsRequest {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any, //! fix later
  id: number,
}

export interface WsResponse {
  type: string,
  data: {
    name: string,
    index: number,
    error: boolean,
    errorText: string,
  }
  id: number,
}
