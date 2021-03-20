import { FantasyTeam } from '../fantasy-team.class';
import { Team } from '../league.class';
import { mlbStatMap } from '../mlb-stat.map';
import { MLBFantasyPlayer } from './player.class';

export class MLBFantasyTeam extends FantasyTeam {

    constructor(public _team: Team) {
        super(_team);
    }

    get rotoStats() {
        const pointsByStat = this._team.pointsByStat;

        const final = {};
        for (const key in pointsByStat) {
            if (key) {
                const statAbbrev = mlbStatMap[key].abbrev;
                const statValue = pointsByStat[key];
                final[statAbbrev] = statValue;
            }
        }

        return final;
    }

    get stats() {
        const valuesByStat = this._team.valuesByStat;

        const final = {};
        for (const key in valuesByStat) {
            if (key) {
                const statAbbrev = mlbStatMap[key].abbrev;
                const statValue = valuesByStat[key];
                final[statAbbrev] = statValue;
            }
        }

        return final;
    }

    get id() {
        return this._team.id;
    }

    get logo() {
        return this._team.logo;
    }

    get totalPoints() {
        return this._team.points;
    }

    get currentProjectedRank() {
        return this._team.currentProjectedRank;
    }

    get rankDiff() {
        return this._team.draftDayProjectedRank - this._team.currentProjectedRank;
    }

    get bench() {
        return this._roster.filter(p => !p.isStarter);
    }

    get starter() {
        return this._roster.filter(p => p.isStarter);
    }

    get batters() {
        return this._roster.filter(p => !p.isPitcher);
    }

    get pitchers() {
        return this._roster.filter(p => p.isPitcher);
    }

    private get _roster() {
        return this._team.roster.entries.map(rosterEntry => new MLBFantasyPlayer(rosterEntry));
    }
}
