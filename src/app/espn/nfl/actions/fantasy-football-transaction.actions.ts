import { EspnClientLeagueTransaction } from '@espnClient/espn-client.model';

export const name = 'fantasyFootballTransaction';

export class SetFantasyFootballTransactions {
  public static readonly type = `[${name}}] SetFantasyFootballTransactions`;
  constructor(public payload: EspnClientLeagueTransaction[]) {}
}

export class ClearAndAddFantasyFootballTransactions {
  public static readonly type = `[${name}}] ClearAndAddFantasyFootballTransactions`;
  constructor(public payload: EspnClientLeagueTransaction[]) {}
}
