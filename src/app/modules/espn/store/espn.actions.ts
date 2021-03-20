import { Sports } from './espn.state';

const scope = 'Espn';

export class EspnAction {
  public static readonly type = `[${scope}] Add item`;
  constructor(public payload: string) { }
}

export class EspnGetLeague {
  public static readonly type = `[${scope}] Get League`;
  constructor(public leagueId: number, public sport: Sports) { }
}

export class EspnGetTeamById {
  public static readonly type = `[${scope}] Get Team by Id`;
  constructor(public teamId: number) { }
}
