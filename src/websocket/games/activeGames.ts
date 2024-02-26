// eslint-disable-next-line import/no-cycle
import { GameId, ActiveGame } from '../../models/types';

export const activeGames: Map<GameId, ActiveGame> = new Map();
