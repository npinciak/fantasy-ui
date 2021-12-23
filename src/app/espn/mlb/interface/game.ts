import { CurrentConditions } from '@espn/weather/weather/models/class';

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
  isoStartTime: string;
  milli: number;
  isoEstEndTime: string;
}

interface ScoreboardGameStatus {
  isFinal: boolean;
  completePerc: number;
}

interface ScoreboardGameLocation {
  img: string;
  imgCss: string;
  name: string;
  isDome: boolean;
  latLng: string;
  currentConditions: CurrentConditions;
  disableWeather: boolean;
}

export { ScoreboardGameTeam, ScoreboardGameSummary, ScoreboardGameStart, ScoreboardGameStatus, ScoreboardGameLocation };
