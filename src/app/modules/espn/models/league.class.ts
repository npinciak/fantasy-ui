export class FantasyLeague {
    constructor(private _id: number, private _teams: Team[]) { }

    get id() {
        return this._id;
    };

    set id(leagueId: number) {
        this._id = leagueId;
    }

    get teams() {
        return this._teams;
    };

    set teams(leagueTeams: Team[]) {
        this._teams = leagueTeams;
    }

}

export interface Team {
    abbrev: string;
    id: number;
}

export interface League {
    id: number;
    teams: Team[];
}
