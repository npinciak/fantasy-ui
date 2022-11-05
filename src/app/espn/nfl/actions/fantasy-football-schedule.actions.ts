import { EspnClientScheduleEntity } from '@espnClient/espn-client.model';

export namespace FantasyFootballSchedule {
  export const name = 'fantasyFootballSchedule';
  type Entity = EspnClientScheduleEntity;

  export class AddOrUpdate {
    public static readonly type = `[${name}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
