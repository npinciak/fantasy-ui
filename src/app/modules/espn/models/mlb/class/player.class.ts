import { statsKeyMap } from '../helpers';
import { Player, Team } from '../interface';
import { SeasonConst } from '../interface/adv.stats';
import { mlbLineupMap } from '../maps/mlb-lineup.map';
import { mlbPositionMap } from '../maps/mlb-position.map';
import { mlbStatMap, StatAbbrev } from '../maps/mlb-stat.map';
import { mlbTeamMap } from '../maps/mlb-team.map';
import { StatTypeId } from '../mlb.enums';
import { AdvStats } from './advStats.class';

export class BaseballPlayer {
    private _player: Player;

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

    get statsL7() {
        const stats = this.statsBase.find(entry => entry.statSplitTypeId === 1);
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

    get wOBAL7() {
        return ;//new AdvStats(this.statsL7, this.weights2021).wOBA;
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

    private get weights2020(): SeasonConst {
        return {
            wBB: 0.699,
            wHBP: 0.728,
            w1B: 0.883,
            w2B: 1.238,
            w3B: 1.558,
            wHR: 1.979,
        };
    }

    private get weights2021(): SeasonConst {
        return {
            wBB: 0.711,
            wHBP: 0.742,
            w1B: 0.901,
            w2B: 1.269,
            w3B: 1.600,
            wHR: 2.035,
        };
    }
}
