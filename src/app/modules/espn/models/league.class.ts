export class League {
    constructor(private _id: number, private _teams: Team[]) {
        this.id = _id;
        this.teams = _teams;
    }

    get id() {
        return this.id;
    };

    set id(id: number) {
        this.id = id;
    }

    get teams() {
        return this.teams;
    };

    set teams(teams: Team[]) {
        this.teams = teams;
    }

}

export interface Team {
    abbrev: string;
    id: number;
}
