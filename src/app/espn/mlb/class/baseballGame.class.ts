import { CurrentConditions } from '@espn/weather/weather/models/class';
import { logoImgBuilder } from '../helpers';
import { EspnClientCompetitor, EspnClientEvent } from '../interface';
import {
  ScoreboardGameLocation,
  ScoreboardGameStart,
  ScoreboardGameStatus,
  ScoreboardGameSummary,
  ScoreboardGameTeam,
} from '../interface/game';
import { MLB_STADIUM_MAP, MLB_TEAM } from '../consts/team.const';
import { domeStadiums } from '../mlb.const';
import { Game } from '@app/@shared/class';

export class BaseballGame extends Game {
  private _currentConditions: CurrentConditions;

  set currentConditions(val: CurrentConditions) {
    this._currentConditions = val;
  }

  get homeTeam(): ScoreboardGameTeam {
    return {
      score: Number(this._competitors[this._homeTeam].score),
      abbrev: MLB_TEAM[this._homeTeam],
      logo: logoImgBuilder('mlb', MLB_TEAM[this._homeTeam]),
      isWinner:
        this._competitors[this._homeTeam].winner || this._competitors[this._homeTeam].score > this._competitors[this._awayTeam].score,
    };
  }

  get awayTeam(): ScoreboardGameTeam {
    return {
      score: Number(this._competitors[this._awayTeam].score),
      abbrev: MLB_TEAM[this._awayTeam],
      logo: logoImgBuilder('mlb', MLB_TEAM[this._awayTeam]),
      isWinner:
        this._competitors[this._awayTeam].winner || this._competitors[this._awayTeam].score > this._competitors[this._homeTeam].score,
    };
  }

  get summary(): ScoreboardGameSummary {
    return {
      event: this._event.summary,
      game: `${MLB_TEAM[this._awayTeam]} at ${MLB_TEAM[this._homeTeam]}`,
    };
  }

  get location(): ScoreboardGameLocation {
    return {
      img: `${MLB_STADIUM_MAP[this._homeTeam].img}`,
      imgCss: `url('${MLB_STADIUM_MAP[this._homeTeam].img}')`,
      name: MLB_STADIUM_MAP[this._homeTeam].name,
      isDome: domeStadiums.includes(this._homeTeam),
      latLng: `${MLB_STADIUM_MAP[this._homeTeam].lat}, ${MLB_STADIUM_MAP[this._homeTeam].lng}`,
      currentConditions: this._currentConditions ?? null,
      disableWeather: this.disableWeather,
    };
  }

  private get disableWeather(): boolean {
    return (
      this._event.fullStatus.type.completed ||
      this._event.fullStatus.type.name === 'STATUS_POSTPONED' ||
      this._event.percentComplete === 100 ||
      domeStadiums.includes(this._homeTeam)
    );
  }
}
