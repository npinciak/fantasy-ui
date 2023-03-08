export namespace FantasyBaseballLeague {
  export const stateName = 'fantasyBaseballLeague';

  export class Fetch {
    public static readonly type = `[${stateName}] FetchBaseballLeague`;
    constructor(public payload: { leagueId: string; year: string }) {}
  }

  export class Refresh {
    public static readonly type = `[${stateName}] Refresh`;
  }

  export class SetCurrentScoringPeriodId {
    public static readonly type = `[${stateName}] SetCurrentScoringPeriodId`;
    constructor(public payload: { scoringPeriodId: string | null }) {}
  }
}
