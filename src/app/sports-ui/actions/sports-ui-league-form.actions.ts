import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';

export namespace SportsUiLeagueForm {
  export const name = 'sportsUiLeagueForm';

  export class SetLeagueSportValue {
    static readonly type = `[${name}] SetLeagueSportValue`;
    constructor(public payload: { leagueSport: FantasySports }) {}
  }

  export class SetLeagueIdValue {
    static readonly type = `[${name}] SetLeagueIdValue`;
    constructor(public payload: { leagueId: string }) {}
  }

  export class SetLeagueNameValue {
    static readonly type = `[${name}] SetLeagueNameValue`;
    constructor(public payload: { leagueName: string }) {}
  }

  export class Reset {
    static readonly type = `[${name}] Reset`;
  }

  export class Submit {
    static readonly type = `[${name}] Submit`;
  }

  export class VerifyLeague {
    static readonly type = `[${name}] VerifyLeague`;
  }
}
