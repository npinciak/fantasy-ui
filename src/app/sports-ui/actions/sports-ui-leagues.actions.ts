import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';

export class SportsUiLeagues extends GenericActions<SportsUiClientLeague>({ stateName: 'sportsUiLeagues' }) {
  static VerifyLeagues = class {
    static readonly type = `[${SportsUiLeagues.stateName}] VerifyLeagues`;
  };

  static CreateLeague = class {
    static readonly type = `[${SportsUiLeagues.stateName}] CreateLeague`;
  };

  static DeleteLeague = class {
    static readonly type = `[${SportsUiLeagues.stateName}] DeleteLeague`;
    constructor(public payload: { leagueId: string }) {}
  };
}
