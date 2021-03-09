import { FantasyTeam, MLBFantasyTeam } from './fantasy-team.class';
import { Player } from './fantasy-player.class';
import { Sports } from '../espn.service';

export class FantasyLeague {
    constructor(_league: League) { }
}

export class MLBFantasyLeague extends FantasyLeague {
    constructor(private _league: League) {
        super(_league);
    }


    get teams() {
        return this._league.teams.map(res => new MLBFantasyTeam(
            res.id,
            `${res.location} ${res.nickname}`,
            res.roster.entries,
            res.points,
            res.draftDayProjectedRank,
            res.currentProjectedRank,
            res.rankCalculatedFinal
        ));
    }

}



export interface Roster {
    entries: Array<Player>;
}

export interface Team {
    id: number;
    abbrev: string;
    location: string;
    nickname: string;
    roster: Roster;
    points: number;
    draftDayProjectedRank: number;
    currentProjectedRank: number;
    rankCalculatedFinal: number;
}

export interface League {
    id: number;
    teams: Array<Team>;
}
