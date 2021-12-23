import { DfsSiteType, DFS_MLB_TEAM_MAP } from '../../dfs.const';
import { TeamAttributes } from '../models/slate.interface';
import { Plateiq, SlatePlayerAttr } from '../models/slatePlayer.interface';

export class DfsMatchup {
  protected _matchupAttr: TeamAttributes;
  protected _teamId: string;

  constructor(teamId: string, matchupAttr: TeamAttributes) {
    this._matchupAttr = matchupAttr;
    this._teamId = teamId;
  }



  get vegas() {
    return this._matchupAttr.vegas;
  }
}
