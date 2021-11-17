import { ScoreboardGameLocation, ScoreboardGameSummary, ScoreboardGameTeam } from '../interface/game';
import { Game } from './game.model';

export interface BaseballGameProperties {
  homeTeam: ScoreboardGameTeam;
  awayTeam: ScoreboardGameTeam;
  summary: ScoreboardGameSummary;
  location: ScoreboardGameLocation;
  disableWeather: boolean;
}

export type BaseballGame = BaseballGameProperties & Game;
