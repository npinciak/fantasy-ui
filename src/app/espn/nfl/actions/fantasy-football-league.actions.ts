export namespace FantasyFootballLeague {
  export const name = 'fantasyFootballLeague';

  export class Fetch {
    public static readonly type = `[${name}]  FetchFootballLeague`;
    constructor(public payload: { leagueId: string }) {}
  }

  export class SetCurrentScoringPeriodId {
    public static readonly type = `[${name}] SetCurrentScoringPeriodId`;
    constructor(public payload: { currentScoringPeriodId: number | null }) {}
  }
}
