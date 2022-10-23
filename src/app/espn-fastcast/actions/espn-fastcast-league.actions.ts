import { FastcastLeague } from '../models/fastcast-league.model';

export class SetFastcastLeague {
  static readonly type = `[espnFastcastLeague] SetFastcastLeague`;
  constructor(public payload: FastcastLeague[]) {}
}

export class ClearAndAddFastcastLeague {
  static readonly type = `[espnFastcastLeague] ClearAndAddFastcastLeague`;
  constructor(public payload: FastcastLeague[]) {}
}
