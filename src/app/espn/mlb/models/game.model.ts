import { ScoreboardGameStart, ScoreboardGameStatus } from '@app/espn/mlb/interface/game';

export interface Game {
  gameId: string;
  gameDate: ScoreboardGameStart;
  status: ScoreboardGameStatus;
  teams: ScoreboardGameStatus;
}
