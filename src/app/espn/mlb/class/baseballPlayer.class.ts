import { isPitcher, statsKeyMap } from '../helpers';
import { EspnClientPlayerRatings, EspnClientGameStatus, EspnClientPlayer } from '../interface/player';
import { MLB_LINEUP } from '../consts/lineup.const';
import { MLB_POSITION } from '../consts/position.const';
import { MLB_TEAM } from '../consts/team.const';
import { weights2021 } from '../mlb.const';

/**
 * This is a description of the BaseballPlayer constructor function.
 *
 * @class
 * @classdesc This is a description of the BaseballPlayer class.
 */
export class BaseballPlayer {
  readonly weights21 = weights2021;

  private _player: EspnClientPlayer;
  private _startingStatus: EspnClientGameStatus;
  private _isStarting = true;

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

  get playerImg() {
    return `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${this._player.playerId}.png&w=96&h=70&cb=1`;
  }

  get lineupSlot() {
    return MLB_LINEUP[this._player.lineupSlotId];
  }

  get defaultPosition() {
    return MLB_POSITION[this._player.playerPoolEntry.player.defaultPositionId].abbrev;
  }

  get proTeam() {
    return MLB_TEAM[this._player.playerPoolEntry.player.proTeamId];
  }

  get playerStats() {
    return this._stats;
  }

  get ratings() {
    return this._ratings;
  }

  private get _stats() {
    const map = new Map<number, any>();
    const stats = this._player.playerPoolEntry.player.stats;
    for (const stat of stats) {
      map.set(stat.statSplitTypeId, statsKeyMap(stat.stats));
    }
    return map;
  }

  set gameStatus(val: EspnClientGameStatus) {
    for (const game in val) {
      if (Object.prototype.hasOwnProperty.call(val, game)) {
        const element = val[game];
        this._startingStatus[game] = element;
      }
    }
  }

  get isStarting() {
    return this._isStarting;
  }

  set isStarting(val: boolean) {
    this._isStarting = val;
  }

  get startingStatus() {
    return this._startingStatus;
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

  get isPitcher() {
    return isPitcher(this._eligibleLineupSlots);
  }

  private get _eligibleLineupSlots() {
    const map = {};
    const slots = this._player.playerPoolEntry.player.eligibleSlots;
    for (const slot of slots) {
      map[slot] = slot;
    }
    return map;
  }

  private get _ratings(): EspnClientPlayerRatings {
    const ratings = this._player.playerPoolEntry.ratings;
    const map: EspnClientPlayerRatings = {};
    for (const key in ratings) {
      if (Object.prototype.hasOwnProperty.call(ratings, key)) {
        const element = ratings[key];
        map[Number(key)] = element;
      }
    }
    return map;
  }
}
