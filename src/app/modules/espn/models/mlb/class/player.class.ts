import { statsKeyMap } from '../helpers';
import { Player } from '../interface';
import { SeasonConst } from '../interface/adv.stats';
import { mlbLineupMap } from '../maps/mlb-lineup.map';
import { mlbPositionMap } from '../maps/mlb-position.map';
import { mlbTeamMap } from '../maps/mlb-team.map';
import { weights2021 } from '../mlb.const';
import { StatTypeId } from '../mlb.enums';
import { AdvStats } from './advStats.class';


/**
 * This is a description of the BaseballPlayer constructor function.
 *
 * @class
 * @classdesc This is a description of the BaseballPlayer class.
 */
export class BaseballPlayer {
    readonly weights21 = weights2021;
    private _player: Player;
    private _seasonConst: SeasonConst;

    constructor(_player: Player) {
        this._player = _player;
    }

    get id() {
        return this._player.playerId;
    }

    get name() {
        return this.playerInfo.fullName;
    }

    get playerImg() {
        return `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${this._player.playerId}.png&w=96&h=70&cb=1`;
    }

    get lineupSlot() {
        return mlbLineupMap[this._player.lineupSlotId].abbrev;
    }

    get defaultPosition() {
        return mlbPositionMap[this.playerInfo.defaultPositionId].abbrev;
    }

    get proTeam() {
        return mlbTeamMap[this.playerInfo.proTeamId];
    }

    get ownershipChange() {
        return this.ownership.percentChange;
    }

    get percentOwned() {
        return this.ownership.percentOwned;
    }

    get isPitcher() {
        return this.isPitcherAlgo(this._player.playerPoolEntry.player.eligibleSlots);
    }

    get statsL7() {
        const stats = this.statsBase.find(entry => entry.statSplitTypeId === StatTypeId.last7Days);
        if (!stats) {
            return;
        }

        return statsKeyMap(stats.stats);
    }

    get statsL15() {
        const stats = this.statsBase.find(entry => entry.statSplitTypeId === StatTypeId.last15Days);
        if (!stats) {
            return;
        }

        return statsKeyMap(stats.stats);
    }

    get statsL30() {
        const stats = this.statsBase.find(entry => entry.statSplitTypeId === StatTypeId.last30Days);
        if (!stats) {
            return;
        }

        return statsKeyMap(stats.stats);
    }

    get statsLive() {
        const stats = this.statsBase.find(entry => entry.statSplitTypeId === 5);
        if (!stats) {
            return;
        }
        return statsKeyMap(stats.stats);
    }

    get wOBA7() {
        return this.advStats.wOBA7; // this.advStats.wOBA7;
    }

    get ratingsL7() {
        return this.ratingsBase[StatTypeId.last7Days];
    }

    get ratingsL15() {
        return this.ratingsBase[StatTypeId.last15Days];
    }

    get fip() {
        return this.advStats.fip;
    }

    private get advStats() {
        const advStats = new AdvStats();
        advStats.seasonConst = this.weights21;
        advStats.stats = this.statsL7;

        return advStats;
    }

    private get statsBase() {
        return this.playerInfo.stats;
    }

    private get ownership() {
        return this.playerInfo.ownership;
    }

    private get playerInfo() {
        return this._player.playerPoolEntry.player;
    }

    private get ratingsBase() {
        return this._player.playerPoolEntry.ratings;
    }

    private isPitcherAlgo(eligiblePos: number[], pitcherPos = [13, 14, 15]) {
        const eligibility = eligiblePos.filter(num => pitcherPos.indexOf(num) !== -1);
        return [... new Set(eligibility)].length > 0;
    }
}
