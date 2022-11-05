import { EspnClientLeagueTransaction } from '@espnClient/espn-client.model';

export namespace FantasyFootballTransaction {
  export const name = 'fantasyFootballTransaction';
  type Entity = EspnClientLeagueTransaction;

  export class AddOrUpdate {
    public static readonly type = `[${name}}] AddOrUpdate`;
    constructor(public payload: Entity[]) {}
  }

  export class ClearAndAdd {
    public static readonly type = `[${name}}] ClearAndAdd`;
    constructor(public payload: Entity[]) {}
  }
}
