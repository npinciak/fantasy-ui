export class FetchFootballLeague {
  public static readonly type = `[fantasyFootballLeague] FetchFootballLeague`;
  constructor(public payload: { leagueId: string }) {}
}

export class SetCurrentScoringPeriodId {
  public static readonly type = `[fantasyFootballLeague] SetCurrentScoringPeriodId`;
  constructor(public payload: { currentScoringPeriodId: number | null }) {}
}
