import { FantasyTeam } from '.';
import { FantasyPlayer, Player } from './fantasy-player.class';

export class FantasyLeague {
    constructor(private _league: League) { }

    get league() {
        return this._league;
    };

    get leagueId() {
        return this._league.id;
    }

    get teams() {
        return this._league.teams.map(res => new FantasyTeam(res.id, res.abbrev, res.roster.entries));
    }

}

export interface Roster {
    entries: Array<Player>;
}

export interface Team {
    id: number;
    abbrev: string;
    roster: Roster;
}

export interface League {
    id: number;
    teams: Array<Team>;
}
