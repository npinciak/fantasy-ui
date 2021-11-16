import { DfsSite } from '../../dfs.const';
import { DfsSlate } from '../models/slateMaster.interface';

export class DfsSlateAction {
  static readonly type = '[DfsSlate] Add item';
  constructor(public payload: string) {}
}

const scope = '[DfsSlate]';

export class FetchResources {
  public static readonly type = `${scope} FetchResources`;
  constructor(public sport: string, public site: DfsSite, public slate: DfsSlate) {}
}

export class FetchNFLResources {
  public static readonly type = `${scope} FetchNFLResources`;
  constructor(public sport: string, public site: DfsSite, public slate: DfsSlate) {}
}

export class FetchSlates {
  public static readonly type = `${scope} FetchSlates`;
  constructor(public site: string, public sport: string) {}
}
