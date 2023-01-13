import { EspnClient } from 'sports-ui-sdk';

export class FetchBaseballLeague {
  public static readonly type = `[fantasyBaseballLeague] FetchBaseballLeague`;
  constructor(public payload: { leagueId: string | null; year: string }) {}
}

export class SetSeasonId {
  public static readonly type = `[fantasyBaseballLeague] SetSeasonId`;
  constructor(public payload: { seasonId: string }) {}
}

export class SetLeagueId {
  public static readonly type = `[fantasyBaseballLeague] SetLeagueId`;
  constructor(public payload: { id: string | null }) {}
}

export class SetCurrentScoringPeriodId {
  public static readonly type = `[fantasyBaseballLeague] SetCurrentScoringPeriodId`;
  constructor(public payload: { currentScoringPeriodId: string | null }) {}
}

export class SetLiveSchedule {
  public static readonly type = `[fantasyBaseballLeague] SetLiveSchedule`;
  constructor(public payload: { schedule: EspnClient.ScheduleEntity }) {}
}
