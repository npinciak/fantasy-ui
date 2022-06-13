import { EspnClientScheduleProperties } from '@app/espn/espn-client.model';

export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] FetchBaseballLeague`;
  constructor(public payload: { leagueId: number }) {}
}

export class SetSeasonId {
  public static readonly type = `[fantasyBaseballLeague] SetSeasonId`;
  constructor(public payload: { seasonId: string }) {}
}

export class SetScoringPeriodId {
  public static readonly type = `[fantasyBaseballLeague] SetScoringPeriodId`;
  constructor(public payload: { scoringPeriodId: string }) {}
}

export class SetLiveSchedule {
  public static readonly type = `[fantasyBaseballLeague] SetLiveSchedule`;
  constructor(public payload: { schedule: EspnClientScheduleProperties }) {}
}
