export class FantasyTeam {
    constructor(private _id: number, private _name: string, private _roster: any[]) {
        this.id = _id;
        this.name = _name;
        this.roster = _roster;
    }

    get id() {
        return this.id;
    };

    set id(id: number) {
        this.id = id;
    }

    get name() {
        return this.name;
    };

    set name(name: string) {
        this.name = name;
    };

    get roster() {
        return this.roster;
    };

    set roster(roster: any[]) {
        this.roster = roster;
    };
}
