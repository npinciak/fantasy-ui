import { BaseballPlayer } from '../models/baseball-player.model';

export class PatchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] PatchFantasyBaseballFreeAgents`;
  constructor(public payload: BaseballPlayer[]) {}
}

export class FetchFantasyBaseballFreeAgents {
  static readonly type = `[fantasyBaseballFreeAgents] FetchFantasyBaseballFreeAgents`;
  constructor(public payload: { leagueId; scoringPeriodId }) {}
}
