import { NewPlayer, Player } from '../models/types';
import { MESSAGES } from '../constants';

export class DbService {
  players: Player[] | [];

  constructor() {
    this.players = [];
  }

  isPlayerExist(name: string) {
    if (this.players.some((player) => player.name === name)) {
      console.info(`Player ${name} already exist!`);
      console.log('From check: ', this.players);

      return true;
    }
    return false;
  }

  async signInPlayer(name: string, password: string): Promise<Player | null> {
    if (this.isPlayerExist(name)) {
      console.log('From signIn: ', this.players);
      const registeredPlayer = await this.loginPlayer(name, password);
      return registeredPlayer;
    }

    const newPlayerId: number = this.players.length;
    const newPlayer: Player = { name, password, index: newPlayerId, wins: 0 };
    // @ts-expect-error - ignore as this.players type is defined
    this.players.push(newPlayer);
    console.log('Players', this.players);

    return newPlayer;
  }

  async loginPlayer(name: string, password: string): Promise<Player | null> {
    const registeredPlayer: Player | undefined = this.players.find(
      (player) => player.name === name,
    );
    console.log('From logIn: ', this.players);

    if (!registeredPlayer) {
      const newPlayer = await this.signInPlayer(name, password);
      return newPlayer;
    }

    if (registeredPlayer && registeredPlayer.password !== password) {
      console.info(MESSAGES.invalidCreds);
      return null;
    }

    return registeredPlayer;
  }
}

export const db = new DbService();
