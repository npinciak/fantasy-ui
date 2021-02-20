export class FantasyTeam {
    constructor(private _id: number, private _name: string, private _roster: unknown[]) { }

    get id() {
        return this._id;
    };

    set id(teamId: number) {
        this._id = teamId;
    }

    get name() {
        return this._name;
    };

    set name(teamName: string) {
        this._name = teamName;
    };

    get roster() {
        return this._roster;
    };

    set roster(teamRoster: unknown[]) {
        this._roster = teamRoster;
    };
}
