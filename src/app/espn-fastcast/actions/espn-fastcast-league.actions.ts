import { FastcastLeague } from '../models/fastcast-league.model';

export class PatchFastcastLeague {
  static readonly type = `[espnFastcastLeague] PatchFastcastLeague`;
  constructor(public payload: FastcastLeague[]) {}
}
