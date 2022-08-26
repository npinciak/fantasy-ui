import { EspnClientScheduleEntity } from '@client/espn-client.model';

export class SetFantasyFootballSchedule {
  public static readonly type = `[fantasyFootballSchedule] SetFantasyFootballSchedule`;
  constructor(public payload: EspnClientScheduleEntity[]) {}
}
