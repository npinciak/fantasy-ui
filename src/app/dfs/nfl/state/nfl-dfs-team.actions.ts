import { Schedule } from '@app/dfs/mlb/models/dfsPlayer.interface';

const $scope = 'NflDfsTeam';

export class PatchTeamsFromSchedule {
  static readonly type = `[${$scope}] PatchTeams`;
  constructor(public schedule: { [id: string]: Schedule }) {}
}
