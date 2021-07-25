import { Team } from '@app/@shared/class';
import { statsKeyMap } from '../helpers';

export class BaseballTeam extends Team {
  private _liveScore;

  get stats() {
    return statsKeyMap(this._valuesByStat);
  }

  get rotoStats() {
    return statsKeyMap(this._rotoPointsByStats);
  }

  get totalBattingRoto() {
    return this._calcBattingTotal;
  }

  get totalPitchingRoto() {
    return this._calcPitchingTotal;
  }

  get liveScore() {
    return this._liveScore;
  }

  set liveScore(points: number) {
    this._liveScore = points;
  }

  private get _calcPitchingTotal() {
    const stat = statsKeyMap(this._rotoPointsByStats);
    return stat.w + stat.k + stat.sv + stat.era + stat.whip;
  }

  private get _calcBattingTotal() {
    const stat = statsKeyMap(this._rotoPointsByStats);
    return stat.r + stat.hr + stat.rbi + stat.sb + stat.avg;
  }

  private get _rotoPointsByStats() {
    return this._team.pointsByStat;
  }

  private get _valuesByStat() {
    return this._team.valuesByStat;
  }
}
