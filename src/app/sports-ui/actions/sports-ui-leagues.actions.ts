import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SupaClientTableRelationRow } from '@sports-ui/ui-sdk/supabase';

export class SportsUiLeagues extends GenericActions<SupaClientTableRelationRow<'league'>>({ stateName: 'sportsUiLeagues' }) {
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
