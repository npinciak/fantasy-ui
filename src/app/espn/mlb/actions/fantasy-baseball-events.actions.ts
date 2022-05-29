import { BaseballEvent } from '../models/baseball-event.model';

export class PatchFantasyBaseballEvents {
  static readonly type = `[fantasyBaseballEvents] PatchFantasyBaseballEvents`;
  constructor(public payload: BaseballEvent[]) {}
}
