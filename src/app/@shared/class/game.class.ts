import { EspnClientEvent } from '@app/espn/mlb/interface';

/**
 * Base/Parent Class for all ESPN games/events
 *
 * @description FootballGame, BaseballGame classes should _extend_ this class. Ingests EspnClientEvent
 * @constructor EspnClientEvent
 */
export class Game {
  protected _event: EspnClientEvent;

  constructor(event: EspnClientEvent) {
    this._event = event;
  }
}
