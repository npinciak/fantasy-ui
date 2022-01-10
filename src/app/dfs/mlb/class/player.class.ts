import { DfsSiteType, DFS_MLB_TEAM_MAP } from '../../dfs.const';
import { DfsSlatePlayer } from '../models/dfsPlayer.interface';
import { Plateiq, SlatePlayerAttr, StatSplit } from '../models/slatePlayer.interface';

/**
 * moved to mlb-player.model.ts
 *
 * @deprecated
 *
 */
export class DfsPlayer {
  protected _slateAttr: SlatePlayerAttr;
  protected _dfsPlayer: DfsSlatePlayer;

  constructor(slateAttr?: SlatePlayerAttr, dfsPlayer?: DfsSlatePlayer) {
    this._slateAttr = slateAttr;
    this._dfsPlayer = dfsPlayer ?? null;
  }

  get team(): string | null {
    if (!this._dfsPlayer) {
      return null;
    }
    return DFS_MLB_TEAM_MAP[Number(this._dfsPlayer.player.rg_team_id)];
  }

  get opponent(): string {
    if (!this._dfsPlayer) {
      return null;
    }
    return this._opponentMap;
  }

  get name(): string | null {
    if (!this._dfsPlayer) {
      return null;
    }
    return `${this._dfsPlayer.player.first_name} ${this._dfsPlayer.player.last_name}`;
  }

  get ranking() {
    if (this._slateAttr.ecr) {
      if (this._slateAttr.ecr[DfsSiteType.DraftKings]) {
        return this._slateAttr.ecr[DfsSiteType.DraftKings].rank;
      }
    }
    return 0;
  }

  get position(): string {
    if (!this._dfsPlayer) {
      return null;
    }
    return this._dfsPlayer.player.position;
  }

  get inLineup(): boolean {
    return this._slateAttr.batting_order ? this._slateAttr.batting_order.confirmed === 1 : false;
  }

  get salary() {
    return { dk: this._slateAttr.salary_diff[DfsSiteType.DraftKings] ? this._slateAttr.salary_diff[DfsSiteType.DraftKings].salary : 0 };
  }

  get ownership() {
    return { dk: this.percToFloat(this._slateAttr.ownership[DfsSiteType.DraftKings]) ?? null };
  }

  get isBatter(): boolean {
    return this._slateAttr.stat_group === 'mlb-hitter';
  }

  get isPitcher(): boolean {
    return this._slateAttr.stat_group === 'mlb-pitcher';
  }

  get plateIq(): Plateiq {
    return this._slateAttr.plateiq;
  }

  get muwoba(): number {
    return Number(this._slateAttr.stats.season.muwoba);
  }

  get stats() {
    return {
      oneWeek: this.statsStringToNum(this._slateAttr.stats, '1week'),
      twoWeeks: this.statsStringToNum(this._slateAttr.stats, '2weeks'),
      fourWeeks: this.statsStringToNum(this._slateAttr.stats, '4weeks'),
    };
  }

  private statsStringToNum(stats: StatSplit, timePeriod: string) {
    const map = {};
    if (stats && stats[timePeriod]) {
      for (const [key, val] of Object.entries(stats[timePeriod])) {
        if (key) {
          map[key] = key === 'name' ? val : Number(val);
        }
      }
    }
    return map;
  }

  private percToFloat(val: string | null) {
    if (!val) {
      return 0;
    }
    return Number(val.split('%')[0]);
  }

  private get _opponentMap() {
    let team = '';

    if (Number(this._dfsPlayer.schedule.team_home.rg_id) === Number(this._dfsPlayer.player.rg_team_id)) {
      team = DFS_MLB_TEAM_MAP[Number(this._dfsPlayer.schedule.team_away.rg_id)];
    } else {
      team = DFS_MLB_TEAM_MAP[Number(this._dfsPlayer.schedule.team_home.rg_id)];
    }
    return team;
  }
}
