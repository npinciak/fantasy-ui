
const scope = 'Espn';

export class EspnAction {
  public static readonly type = `[${scope}] Add item`;
  constructor(public payload: string) { }
}

export class EspnGetBaseballLeague {
  public static readonly type = `[${scope}] Get Baseball League`;
  constructor(public leagueId: number) { }
}

export class EspnGetBaseballFA {
  public static readonly type = `[${scope}] Get Baseball Free Agents`;
  constructor(public leagueId: number) { }
}

export class EspnGetTeamById {
  public static readonly type = `[${scope}] Get Team by Id`;
  constructor(public teamId: number) { }
}
