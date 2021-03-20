import { FantasyLeague, League } from '../league.class';
import { MLBFantasyTeam } from './team.class';

export class MLBFantasyLeague extends FantasyLeague {
    constructor(private _league: League) {
        super(_league);
    }

    get teams() {
        return this._league.teams.map(res => new MLBFantasyTeam(res));
    }
}
