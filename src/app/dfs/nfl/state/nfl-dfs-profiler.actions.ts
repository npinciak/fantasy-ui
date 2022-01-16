import { NFLClientStatGroup } from '../models/nfl-client.model';

const $scope = 'NflProfilerDfs';

export class PatchProfiler {
  static readonly type = `[${$scope}] Add item`;
  constructor(public payload: { profiler: NFLClientStatGroup }) {}
}
