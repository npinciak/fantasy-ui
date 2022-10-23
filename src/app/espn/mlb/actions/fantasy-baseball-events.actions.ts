import { BaseballEvent } from '../models/baseball-event.model';

export class SetFantasyBaseballEvents {
  static readonly type = `[fantasyBaseballEvents] SetFantasyBaseballEvents`;
  constructor(public payload: BaseballEvent[]) {}
}

export class ClearAndAddFantasyBaseballEvents {
  static readonly type = `[fantasyBaseballEvents] ClearAndAddFantasyBaseballEvents`;
  constructor(public payload: BaseballEvent[]) {}
}
