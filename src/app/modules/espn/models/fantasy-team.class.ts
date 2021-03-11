import { MLBFantasyPlayer } from './fantasy-player.class';
import { Team } from './league.class';
import { mlbStatMap, StatsMap } from './mlb-stat.map';

export class FantasyTeam {
    constructor(public _team: Team) { }

    get teamId() {
        return this._team.id;
    }

    get name() {
        return `${this._team.location} ${this._team.nickname}`;
    }

}

export class MLBFantasyTeam extends FantasyTeam {

    constructor(public _team: Team) {
        super(_team);
    }

    get stats() {
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

    private get _roster() {
        return this._team.roster.entries.map(rosterEntry => new MLBFantasyPlayer(rosterEntry));
    }
}

// export class NFLFantasyTeam extends FantasyTeam {
//     constructor(public _id: number, public _name: string, public _roster: Player[]) {
//         super(_id, _name, _roster);
//     }

//     private get roster() {
//         return this._roster.map(rosterEntry => new NFLFantasyPlayer(
//             rosterEntry.playerId,
//             rosterEntry.playerPoolEntry.player.fullName,
//             rosterEntry.playerPoolEntry.player.proTeamId,
//             rosterEntry.playerPoolEntry.player.defaultPositionId,
//             rosterEntry.playerPoolEntry.player.injured
//         ));
//     }
// }
