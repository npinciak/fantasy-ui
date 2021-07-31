import { EspnClientCompetitor, EspnClientEvent } from '@app/espn/mlb/interface';
import { ScoreboardGameStart, ScoreboardGameStatus } from '@app/espn/mlb/interface/game';
import { addHoursToDate } from '../helpers/date';
import { entityMap } from '../operators';

/**
 * Base/Parent Class for all ESPN games/events
 *
 * @description FootballGame, BaseballGame classes should _extend_ this class. Ingests EspnClientEvent
 * @constructor EspnClientEvent
 */
export class Game {
  protected _event: EspnClientEvent;
  protected _competitors: { [id: number]: EspnClientCompetitor };
  protected _homeTeam: number;
  protected _awayTeam: number;

  constructor(event: EspnClientEvent) {
    this._event = event;
    this.teams();
  }

  get gameId() {
    return this._event.id;
  }

  get gameDate(): ScoreboardGameStart {
    return {
      isoStartTime: this._event.date,
      milli: new Date(this._event.date).getTime(),
      isoEstEndTime: addHoursToDate(new Date(this._event.date), 3).toISOString(),
    };
  }

  get status(): ScoreboardGameStatus {
    return {
      isFinal: this._event.fullStatus.type.completed || this._event.fullStatus.type.name === 'STATUS_POSTPONED',
      completePerc: this._event.percentComplete,
    };
  }

  private teams(): void {
    this._competitors = entityMap(this._event.competitors);
    this._event.competitors.map(comp => {
      if (comp.homeAway === 'home') {
        this._homeTeam = Number(comp.id);
      } else {
        this._awayTeam = Number(comp.id);
      }
    });
  }
}
