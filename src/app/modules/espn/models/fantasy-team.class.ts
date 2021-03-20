import { Team } from './league.class';

export class FantasyTeam {
    constructor(public _team: Team) { }

    get teamId() {
        return this._team.id;
    }

    get name() {
        return `${this._team.location} ${this._team.nickname}`;
    }

}
