import { BaseballPlayer } from '../models/baseball-player.model';

export class SetFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] SetFantasyBaseballFreeAgents`;
  constructor(public payload: BaseballPlayer[]) {}
}

export class ClearFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] ClearFantasyBaseballFreeAgents`;
}

export class ClearAndAddFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] ClearAndAddFantasyBaseballFreeAgents`;
  constructor(public payload: BaseballPlayer[]) {}
}

export class FetchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] FetchFantasyBaseballFreeAgents`;
}
