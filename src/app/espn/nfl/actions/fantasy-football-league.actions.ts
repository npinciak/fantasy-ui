export namespace FantasyFootballLeague {
  export const name = 'fantasyFootballLeague';

  export class Fetch {
    public static readonly type = `[${name}]  FetchFootballLeague`;
    constructor(public payload: { leagueId: string; year: string }) {}
  }

  export class Refresh {
    public static readonly type = `[${name}] Refresh`;
  }

  export class SetCurrentScoringPeriodId {
    public static readonly type = `[${name}] SetCurrentScoringPeriodId`;
    constructor(public payload: { scoringPeriodId: string | null }) {}
  }
}
