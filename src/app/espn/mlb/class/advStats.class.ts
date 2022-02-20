import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { SeasonConst } from '../models/adv-stats.model';
import { Stat } from '../models/mlb-stats.model';

export class AdvStats {
  private _stats: EspnClientPlayerStatsEntity;
  private _seasonConst: SeasonConst;

  constructor(stats: EspnClientPlayerStatsEntity) {
    this._stats = stats;
  }

  get seasonConst(): SeasonConst {
    return this._seasonConst;
  }

  set seasonConst(seasonConst: SeasonConst) {
    this._seasonConst = seasonConst;
  }

  get wOBA(): number {
    return this.weightedHits / this.nonHits;
  }

  get wRAA(): number {
    return ((this.wOBA - this.seasonConst.wOBA) / this.seasonConst.wOBAScale) * this._stats[Stat.PA];
  }

  get fip(): number {
    return (
      (13 * this._stats[Stat.HRA] + 3 * (this._stats[Stat.BBI] + this._stats[Stat.HB]) - 2 * this._stats[Stat.K]) / this._stats[Stat.IP] +
      this.seasonConst.cFIP
    );
  }

  private get weightedHits(): number {
    return (
      this.seasonConst.wBB * this.unintentionalBB +
      this.seasonConst.wHBP * this._stats[Stat.HBP] +
      this.seasonConst.w1B * this._stats[Stat['1B']] +
      this.seasonConst.w2B * this._stats[Stat['2B']] +
      this.seasonConst.w3B * this._stats[Stat['3B']] +
      this.seasonConst.wHR * this._stats[Stat.HR]
    );
  }

  private get nonHits(): number {
    return this._stats[Stat.AB] + this._stats[Stat.BB] - (this._stats[Stat.IBB] + this._stats[Stat.SF] + this._stats[Stat.HBP]);
  }

  private get unintentionalBB(): number {
    return this._stats[Stat.BB] - this._stats[Stat.IBB];
  }
}
