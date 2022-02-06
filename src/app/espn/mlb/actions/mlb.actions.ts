export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] Fetch Baseball League`;
  constructor(public payload: { leagueId: number }) {}
}

/**
 * @deprecated
 *
 */
export class UpdateStatType {
  public static readonly type = `[Mlb] Update stat type`;
  constructor(public statTypeId: number) {}
}
