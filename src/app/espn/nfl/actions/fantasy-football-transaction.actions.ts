import { EspnClient } from '@espnClient/espn-client.model';

export namespace FantasyFootballTransaction {
  export const name = 'fantasyFootballTransaction';
  type Entity = EspnClient.LeagueTransaction;

  export class AddOrUpdate {
    public static readonly type = `[${name}}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
