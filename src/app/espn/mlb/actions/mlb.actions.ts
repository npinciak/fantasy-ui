export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] FetchBaseballLeague`;
  constructor(public payload: { leagueId: number }) {}
}

export class PatchSeasonId {
  public static readonly type = `[fantasyBaseballLeague] PatchSeasonId`;
  constructor(public payload: { seasonId: string }) {}
}

export class PatchScoringPeriodId {
  public static readonly type = `[fantasyBaseballLeague] PatchScoringPeriodId`;
  constructor(public payload: { scoringPeriodId: number }) {}
}
