export class FantasyPlayer {
    constructor(private _id: number, private _name: string, private _positionId: number, private _teamId: number) { }

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

    get position() {
        return this._positionId;
    };

    set position(playerPosition: number) {
        this._positionId = playerPosition;
    };

    get teamId() {
        return this._teamId;
    };

    set team(playerTeam: number) {
        this._teamId = playerTeam;
    };
}
