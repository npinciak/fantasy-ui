import { MLBFantasyTeam } from './fantasy-team.class';
import { Player } from './fantasy-player.class';

export class FantasyLeague {
    constructor(_league: League) { }
}

export class MLBFantasyLeague extends FantasyLeague {
    constructor(private _league: League) {
        super(_league);
    }

    get teams() {
        return this._league.teams.map(res => new MLBFantasyTeam(res));
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
    logo: string;
    draftDayProjectedRank: number;
    currentProjectedRank: number;
    rankCalculatedFinal: number;
    pointsByStat: {
        [key: number]: number;
    };
    valuesByStat: {
        [key: number]: number;
    };
}

export interface League {
    id: number;
    teams: Array<Team>;
}
