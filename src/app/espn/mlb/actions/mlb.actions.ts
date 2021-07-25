export class FetchBaseballLeague {
  public static readonly type = `[Mlb] Fetch Baseball League`;
  constructor(public leagueId: number) {}
}

export class UpdateStatType {
  public static readonly type = `[Mlb] Update stat type`;
  constructor(public statTypeId: number) {}
}
