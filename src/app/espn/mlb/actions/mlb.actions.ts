import { EspnClientScheduleProperties } from '@app/espn/espn-client.model';

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
  constructor(public payload: { scoringPeriodId: string }) {}
}

export class PatchLiveSchedule {
  public static readonly type = `[fantasyBaseballLeague] PatchLiveSchedule`;
  constructor(public payload: { schedule: EspnClientScheduleProperties }) {}
}
