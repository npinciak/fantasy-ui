import { FastcastLeague } from '../models/fastcast-league.model';

export class SetFastcastLeague {
  static readonly type = `[espnFastcastLeague] SetFastcastLeague`;
  constructor(public payload: FastcastLeague[]) {}
}
