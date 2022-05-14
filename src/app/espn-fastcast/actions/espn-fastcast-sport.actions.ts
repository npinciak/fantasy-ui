import { FastcastSport } from '../models/fastcast-sport.model';

export class PatchFastcastSports {
  static readonly type = `[espnFastcastSport] PatchFastcastSports`;
  constructor(public payload: FastcastSport[]) {}
}
