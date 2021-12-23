import { NFLPlayerTableRow } from '../models/nfl-player-table-row.model';

const $scope = 'NflDfsLineup';

export class AddPlayer {
  static readonly type = `[${$scope}] AddPlayer`;
  constructor(public payload: { player: NFLPlayerTableRow }) {}
}

export class RemovePlayer {
  static readonly type = `[${$scope}] RemovePlayer`;
  constructor(public payload: { player: NFLPlayerTableRow }) {}
}
