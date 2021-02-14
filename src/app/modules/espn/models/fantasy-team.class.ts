export class FantasyTeam {
    private _id: number;
    private _name: string;
    private _roster: any;

    constructor(id: number, name: string, roster: any[]) {
        this._id = id;
        this._name = name;
        this._roster = roster;
    }

    get Id() {
        return this._id
    };
    set Id(id: number) {
        this._id = id
    }

    get Name() {
        return this._name
    };

    set Name(name: string) {
        this._name = name
    };

    get Roster() {
        return this._roster
    };

    set Roster(roster: any[]) {
        this._roster = roster
    };
}
