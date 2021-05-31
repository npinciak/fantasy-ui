export class MlbAction {
  public static readonly type = '[Mlb] Add item';
  constructor(public payload: string) { }
}

export class FetchBaseballLeague {
  public static readonly type = `[Mlb] Fetch Baseball League`;
  constructor(public leagueId: number) { }
}

