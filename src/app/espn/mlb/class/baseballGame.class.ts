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
import { MLB_STADIUM_MAP, mlbTeamMap } from '../maps/mlb-team.map';
import { domeStadiums } from '../mlb.const';

export class BaseballGame {
  private _event: EspnClientEvent;
  private _competitors: { [id: number]: EspnClientCompetitor } = {};
  private _homeTeam: number;
  private _awayTeam: number;
  private _currentConditions: CurrentConditions;

  constructor(event: EspnClientEvent) {
    this._event = event;
  }

  get gameId() {
    return this._event.id;
  }

  set currentConditions(val: CurrentConditions) {
    this._currentConditions = val;
  }

  set competitors(val: EspnClientCompetitor[]) {
    const map: { [id: number]: EspnClientCompetitor } = {};
    for (const comp of val) {
      map[Number(comp.id)] = comp;

      if (comp.homeAway === 'home') {
        this._homeTeam = Number(comp.id);
      } else {
        this._awayTeam = Number(comp.id);
      }
    }
    this._competitors = map;
  }

  get homeTeam(): ScoreboardGameTeam {
    return {
      score: Number(this._competitors[this._homeTeam].score),
      abbrev: mlbTeamMap[this._homeTeam],
      logo: logoImgBuilder('mlb', mlbTeamMap[this._homeTeam]),
      isWinner:
        this._competitors[this._homeTeam].winner || this._competitors[this._homeTeam].score > this._competitors[this._awayTeam].score,
    };
  }

  get awayTeam(): ScoreboardGameTeam {
    return {
      score: Number(this._competitors[this._awayTeam].score),
      abbrev: mlbTeamMap[this._awayTeam],
      logo: logoImgBuilder('mlb', mlbTeamMap[this._awayTeam]),
      isWinner:
        this._competitors[this._awayTeam].winner || this._competitors[this._awayTeam].score > this._competitors[this._homeTeam].score,
    };
  }

  get summary(): ScoreboardGameSummary {
    return {
      event: this._event.summary,
      game: `${mlbTeamMap[this._awayTeam]} at ${mlbTeamMap[this._homeTeam]}`,
    };
  }

  get gameDate(): ScoreboardGameStart {
    return {
      iso: this._event.date,
      milli: new Date(this._event.date).getTime(),
    };
  }

  get status(): ScoreboardGameStatus {
    return {
      isFinal: this._event.fullStatus.type.completed || this._event.fullStatus.type.name === 'STATUS_POSTPONED',
      completePerc: this._event.percentComplete,
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
