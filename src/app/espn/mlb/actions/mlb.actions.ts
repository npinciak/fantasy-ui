export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] Fetch Baseball League`;
  constructor(public payload: { leagueId: number }) {}
}
