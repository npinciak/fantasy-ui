export class FetchFootballLeague {
  public static readonly type = `[NFL] Fetch Football League`;
  constructor(public payload: { leagueId: string }) {}
}
