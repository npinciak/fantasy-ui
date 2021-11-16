import { DfsSite, DfsSport } from '../../dfs.const';
import { DfsSlate } from '../models/slateMaster.interface';

export class FetchResources {
  public static readonly type = `[Mlb DFS] FetchResources`;
  constructor(public site: DfsSite, public slate: DfsSlate) {}
}

export class FetchSlateConfigs {
  public static readonly type = `[Mlb DFS] FetchSlateConfigs`;
  constructor() {}
}

export class FetchSlates {
  public static readonly type = `[Mlb DFS] FetchSlates`;
  constructor(public site: string, public sport: string) {}
}

export class UpdateStatLine {
  public static readonly type = `[Mlb DFS] UpdateStatLine`;
  constructor(public statLine: string) {}
}
