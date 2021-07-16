import { CurrentConditions } from '@app/modules/weather/weather/models/class';

interface ScoreboardGameTeam {
  score: number | null;
  abbrev: string;
  logo: string;
  isWinner: boolean;
}

interface ScoreboardGameSummary {
  event: string;
  game: string;
}

interface ScoreboardGameStart {
  iso: string;
  milli: number;
}

interface ScoreboardGameStatus {
  isFinal: boolean;
  completePerc: number;
}

interface ScoreboardGameLocation {
  img: string;
  name: string;
  isDome: boolean;
  latLng: string;
  currentConditions: CurrentConditions;
}

export {
  ScoreboardGameTeam,
  ScoreboardGameSummary,
  ScoreboardGameStart,
  ScoreboardGameStatus,
  ScoreboardGameLocation,
};
