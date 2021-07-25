import { EspnClientPlayer } from '@app/espn/mlb/interface';

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

  get id() {
    return this._player.playerId;
  }

  get name() {
    return this._player.playerPoolEntry.player.fullName;
  }

  get isInjured() {
    return this._player.playerPoolEntry.player.injured;
  }

  get injuryStatus() {
    return this._player.playerPoolEntry.player.injuryStatus;
  }

  get playerRatings() {
    return this._player.playerPoolEntry.ratings;
  }

  get playerOwnership() {
    return {
      change: this._player.playerPoolEntry.player.ownership.percentChange,
      percentOwned: this._player.playerPoolEntry.player.ownership.percentOwned,
    };
  }
}
