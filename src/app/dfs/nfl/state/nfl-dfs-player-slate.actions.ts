import { DfsSlatePlayer } from '@app/dfs/mlb/models/dfsPlayer.interface';

const $scope = 'NflProfilerDfs';

export class PatchPlayerSlate {
  static readonly type = `[${$scope}] PatchPlayerSlate`;
  constructor(public dfsPlayers: DfsSlatePlayer[]) {}
}
