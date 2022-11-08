import { SportsUiClientLeague } from '../models/sports-ui-league.model';

export namespace SportsUiLeagues {
  export const name = 'sportsUiLeagues';

  export class VerifyLeagues {
    static readonly type = `[${name}] VerifyLeagues`;
  }

  export class CreateLeague {
    static readonly type = `[${name}] CreateLeague`;
  }

  export class FetchLeagues {
    static readonly type = `[${name}] FetchLeagues`;
  }

  export class DeleteLeague {
    static readonly type = `[${name}] DeleteLeague`;
    constructor(public payload: { leagueId: string }) {}
  }

  export class SetLeagues {
    static readonly type = `[${name}] SetLeagues`;
    constructor(public payload: SportsUiClientLeague[]) {}
  }

  export class ClearAndAddLeagues {
    static readonly type = `[${name}] ClearAndAddLeagues`;
    constructor(public payload: SportsUiClientLeague[]) {}
  }
}
