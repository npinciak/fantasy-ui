import { statsKeyMap } from '../helpers';
import { Player, Team } from '../interface';
import { mlbStatMap, StatAbbrev } from '../maps/mlb-stat.map';
import { BaseballPlayer } from './player.class';

export class BaseballTeam {
    private _team: Team;
    private _roster;

    constructor(_team: Team) {
        this._team = _team;
    }

    get teamId() {
        return this.teamBase.id;
    }

    get teamName() {
        return `${this.teamBase.location} ${this.teamBase.nickname}`;
    }

    get teamLogo() {
        return this.teamBase.logo;
    }

    get roster() {
        return this._roster;
    }

    set roster(roster: Player[]) {
        const arr = [];
        roster.forEach(player => {
            arr.push(new BaseballPlayer(player));
        });
        this._roster = arr;
    }

    get totalPoints() {
        return this.teamBase.points;
    }

    get currentRank() {
        return this.teamBase.playoffSeed;
    }

    get rankDiff() {
        return this.teamBase.draftDayProjectedRank - this.teamBase.playoffSeed;
    }

    get stats() {
        return statsKeyMap(this.valuesByStat);
    }

    get rotoStats() {
        return statsKeyMap(this.rotoPointsByStats);
    }

    private get rotoPointsByStats() {
        return this.teamBase.pointsByStat;
    }

    private get valuesByStat() {
        return this.teamBase.valuesByStat;
    }

    private get teamBase() {
        return this._team;
    }
}
