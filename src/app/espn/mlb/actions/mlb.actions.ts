import { EspnClient } from '@espnClient/espn-client.model';

export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] FetchBaseballLeague`;
  constructor(public payload: { leagueId: string | null }) {}
}

export class SetSeasonId {
  public static readonly type = `[fantasyBaseballLeague] SetSeasonId`;
  constructor(public payload: { seasonId: string }) {}
}

export class SetLeagueId {
  public static readonly type = `[fantasyBaseballLeague] SetLeagueId`;
  constructor(public payload: { leagueId: string | null }) {}
}

export class SetCurrentScoringPeriodId {
  public static readonly type = `[fantasyBaseballLeague] SetCurrentScoringPeriodId`;
  constructor(public payload: { currentScoringPeriodId: number | null }) {}
}

export class SetLiveSchedule {
  public static readonly type = `[fantasyBaseballLeague] SetLiveSchedule`;
  constructor(public payload: { schedule: EspnClient.ScheduleEntity }) {}
}
