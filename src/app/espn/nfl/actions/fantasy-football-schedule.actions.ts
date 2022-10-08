import { EspnClientScheduleEntity } from '@espnClient/espn-client.model';

export class SetFantasyFootballSchedule {
  public static readonly type = `[fantasyFootballSchedule] SetFantasyFootballSchedule`;
  constructor(public payload: EspnClientScheduleEntity[]) {}
}

export class ClearAndAddFantasyFootballSchedule {
  public static readonly type = `[fantasyFootballSchedule] ClearAndAddFantasyFootballSchedule`;
  constructor(public payload: EspnClientScheduleEntity[]) {}
}
