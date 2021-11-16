import { NFLClientStatGroup } from '../models/nfl-slate-attr.model';

const $scope = 'NflProfilerDfs';

export class PatchProfiler {
  static readonly type = `[${$scope}] Add item`;
  constructor(public payload: { profiler: NFLClientStatGroup }) {}
}
