import { SportsUiClientLeague } from '../../espn/models/league.model';

export namespace SportsUiLeagues {
  export const name = 'sportsUiLeagues';

  export class VerifyLeagues {
    static readonly type = `[espnLeagues] VerifyEspnLeagues`;
  }

  export class CreateLeague {
    static readonly type = `[espnLeagues] CreateLeague`;
    // constructor(public payload: { leagueSport: FantasySports; leagueId: string; leagueYear: string; leagueName: string }) {}
  }

  export class FetchLeagues {
    static readonly type = `[espnLeagues] FetchEspnLeagues`;
  }

  export class DeleteLeague {
    static readonly type = `[espnLeagues] DeleteEspnLeague`;
    constructor(public payload: { leagueId: string }) {}
  }

  export class SetLeagues {
    static readonly type = `[espnLeagues] SetEspnLeagues`;
    constructor(public payload: SportsUiClientLeague[]) {}
  }

  export class ClearAndAddLeagues {
    static readonly type = `[espnLeagues] ClearAndAddEspnLeagues`;
    constructor(public payload: SportsUiClientLeague[]) {}
  }
}
