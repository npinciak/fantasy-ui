import { EspnClientEvent, EspnClientPlayer } from '@app/espn/mlb/interface';

/**
 * Base/Parent Class for all ESPN _fantasy_ players
 *
 * @description FootballPlayer, BaseballPlayer classes should _extend_ this class. Ingests EspnClientPlayer
 * @constructor EspnClientPlayer
 */
export class Player {
  protected _player: EspnClientPlayer;

  constructor(player: EspnClientPlayer) {
    this._player = player;
  }
}
