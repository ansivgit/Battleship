import { Player } from '../models/types';
import { MESSAGES } from '../constants';

export class PlayerStorage {
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

  getPlayersList() {
    return this.players;
  }

  private signInPlayer(name: string, password: string): Player | null {
    if (this.isPlayerExist(name)) {
      console.log('From signIn: ', this.players);
      const registeredPlayer = this.loginPlayer(name, password);
      return registeredPlayer;
    }

    const newPlayerId: number = this.players.length;
    const newPlayer: Player = { name, password, index: newPlayerId, wins: 0 };

    (this.players as Player[]).push(newPlayer);
    console.log('Players', this.players);

    return newPlayer;
  }

  loginPlayer(name: string, password: string): Player | null {
    const registeredPlayer: Player | undefined = this.players.find(
      (player) => player.name === name,
    );
    console.log('From logIn: ', this.players);

    if (!registeredPlayer) {
      const newPlayer = this.signInPlayer(name, password);
      return newPlayer;
    }

    if (registeredPlayer && registeredPlayer.password !== password) {
      console.info(MESSAGES.invalidCreds);
      return null;
    }

    return registeredPlayer;
  }
}

export const db = new PlayerStorage();
