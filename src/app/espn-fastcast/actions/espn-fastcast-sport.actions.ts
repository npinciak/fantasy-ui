import { FastcastSport } from '../models/fastcast-sport.model';

export class SetFastcastSports {
  static readonly type = `[espnFastcastSport] SetFastcastSports`;
  constructor(public payload: FastcastSport[]) {}
}
