import { DFS_MLB_TEAM_MAP } from '../../dfs.const';
import { DfsMatchup } from './matchup.class';

export class MLBDfsMatchup extends DfsMatchup {
  get opponentPitcher() {
    return {
      name: this._matchupAttr.pitcher.first_name + ' ' + this._matchupAttr.pitcher.last_name,
      id: this._matchupAttr.pitcher.id,
    };
  }

  get teamTotal() {
    return this._matchupAttr.team_total;
  }

  get team(): string {
    return DFS_MLB_TEAM_MAP[Number(this._teamId)];
  }

  get stackValue() {
    return this.percToFloat(this._matchupAttr.stack_value.draftkings) ?? 0;
  }

  get topValue() {
    return this.percToFloat(this._matchupAttr.top_value.draftkings) ?? 0;
  }

  get smashVal() {
    return this.percToFloat(this._matchupAttr.smash_value.draftkings) ?? 0;
  }

  get stackLeverage() {
    return Number(this._matchupAttr.stack_leverage.draftkings) ?? 0;
  }

  get stackDiff() {
    return this.percToFloat(this._matchupAttr.stack_diff.draftkings) ?? 0;
  }

  private percToFloat(val: string | null) {
    if (!val) {
      return 0;
    }
    return Number(val.split('%')[0]);
  }
}
