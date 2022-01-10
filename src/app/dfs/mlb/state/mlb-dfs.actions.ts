import { DfsSite, DfsSport } from '../../dfs.const';
import { DfsSlate } from '../models/slateMaster.interface';

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class FetchResources {
  public static readonly type = `[Mlb DFS] FetchResources`;
  constructor(public site: DfsSite, public slate: DfsSlate) {}
}

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class FetchSlateConfigs {
  public static readonly type = `[Mlb DFS] FetchSlateConfigs`;
  constructor() {}
}

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class FetchSlates {
  public static readonly type = `[Mlb DFS] FetchSlates`;
  constructor(public site: string, public sport: string) {}
}

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class UpdateStatLine {
  public static readonly type = `[Mlb DFS] UpdateStatLine`;
  constructor(public statLine: string) {}
}
