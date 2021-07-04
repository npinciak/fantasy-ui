import { isPitcher, statsKeyMap } from '../helpers';
import { PlayerStatsYear, PlayerRatings, PlayerOwnership, GameStatus, Player } from '../interface/player';
import { mlbLineupMap } from '../maps/mlb-lineup.map';
import { mlbPositionMap } from '../maps/mlb-position.map';
import { mlbTeamMap } from '../maps/mlb-team.map';
import { weights2021 } from '../mlb.const';
import { MLBLineup, StatTypeId } from '../mlb.enums';
import { AdvStats } from './advStats.class';
import { Game } from './game.class';


/**
 * This is a description of the BaseballPlayer constructor function.
 *
 * @class
 * @classdesc This is a description of the BaseballPlayer class.
 */
export class BaseballPlayer {
    readonly weights21 = weights2021;

    private _player: Player;
    private _eligibleSlots = {};
    private _ownership;
    private _ratings = new Map<number, any>();
    private _startingStatus = new Map<string, string>();
    private _isStarting = false;

    constructor(player: Player) {
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
        return mlbLineupMap[this._player.lineupSlotId];
    }

    get defaultPosition() {
        return mlbPositionMap[this._player.playerPoolEntry.player.defaultPositionId].abbrev;
    }

    get proTeam() {
        return mlbTeamMap[this._player.playerPoolEntry.player.proTeamId];
    }

    get playerStats() {
        return this._stats;
    }

    private get _stats() {
        const map = new Map<number, any>();
        const stats = this._player.playerPoolEntry.player.stats;
        for (const stat of stats) {
            map.set(stat.statSplitTypeId, statsKeyMap(stat.stats));

        }
        return map;
    }

    get eligibleLineupSlots() {
        return this._eligibleSlots;
    }

    set eligibleSlots(slots: number[]) {
        for (const slot of slots) {
            this._eligibleSlots[slot] = slot;
        }
    }

    set ownership(val: PlayerOwnership) {
        this._ownership = val;
    }

    set ratings(val: PlayerRatings) {
        for (const key in val) {
            if (Object.prototype.hasOwnProperty.call(val, key)) {
                const element = val[key];
                this._ratings.set(Number(key), element);
            }
        }
    }

    set gameStatus(val: GameStatus) {
        for (const game in val) {
            if (Object.prototype.hasOwnProperty.call(val, game)) {
                const element = val[game];
                this._startingStatus.set(game, element);
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
            percentOwned: this._player.playerPoolEntry.player.ownership.percentOwned
        };
    }

    get isPitcher() {
        return isPitcher(this._eligibleSlots);
    }

}
