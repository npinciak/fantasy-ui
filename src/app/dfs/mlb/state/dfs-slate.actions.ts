import { DfsSite } from '../../dfs.const';
import { DfsSlate } from '../models/slateMaster.interface';

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class DfsSlateAction {
  static readonly type = '[DfsSlate] Add item';
  constructor(public payload: string) {}
}

const scope = '[DfsSlate]';
/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */ export class FetchResources {
  public static readonly type = `${scope} FetchResources`;
  constructor(public sport: string, public site: DfsSite, public slate: DfsSlate) {}
}
/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class FetchNFLResources {
  public static readonly type = `${scope} FetchNFLResources`;
  constructor(public sport: string, public site: DfsSite, public slate: DfsSlate) {}
}
/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
export class FetchSlates {
  public static readonly type = `${scope} FetchSlates`;
  constructor(public site: string, public sport: string) {}
}
