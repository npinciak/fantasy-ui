import { FangraphsWobaFipConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { BaseballStat, EspnClient } from 'sports-ui-sdk';

export class AdvStats {
  private _stats: EspnClient.PlayerStatsEntity;
  private _seasonConst: FangraphsWobaFipConstants;

  constructor({ seasonConst, statsEntity }: { seasonConst: FangraphsWobaFipConstants; statsEntity: EspnClient.PlayerStatsEntity | null }) {
    this._stats = exists(statsEntity) ? statsEntity : [];
    this._seasonConst = seasonConst;
  }

  get wOBA(): number {
    if (!this.wOBAValid) return 0;
    return this.weightedHits / this.nonHits;
  }

  get wRAA(): number {
    if (!this.wRAAValid) return 0;
    const { wOBA, wOBAScale } = this._seasonConst;
    return ((this.wOBA - wOBA) / wOBAScale) * this._stats[BaseballStat.PA];
  }

  get wRC(): number {
    if (!this.wRCValid) return 0;
    return this.wRAA + this._seasonConst['r/PA'] * this._stats[BaseballStat.PA];
  }

  get fip(): number {
    if (!this.fipValid) return 0;
    const { cFIP } = this._seasonConst;
    // prettier-ignore
    return (
      (13 * this._stats[BaseballStat.HRA] + 3 * (this._stats[BaseballStat.BBI] + this._stats[BaseballStat.HB]) - 2 * this._stats[BaseballStat.K]) / (this._stats[BaseballStat.IP]* 0.333) +
     cFIP
    );
  }

  get babip(): number {
    if (!this.babipValid) return 0;
    // prettier-ignore
    return (
      (this._stats[BaseballStat.HA] - this._stats[BaseballStat.HRA]) /
      (this._stats[BaseballStat.BF] - this._stats[BaseballStat.K] - this._stats[BaseballStat.HRA] + this._stats[BaseballStat.SFA])
    );
  }

  get iso(): number {
    if (!this.isoValid) return 0;
    return this._stats[BaseballStat.SLG] - this._stats[BaseballStat.AVG];
  }

  get weightedHits(): number {
    if (!this.weightedHitsValid) return 0;
    const { wBB, wHBP, w1B, w2B, w3B, wHR } = this._seasonConst;

    return (
      wBB * this.unintentionalBB +
      wHBP * this._stats[BaseballStat.HBP] +
      w1B * this._stats[BaseballStat.SINGLE] +
      w2B * this._stats[BaseballStat.DOUBLE] +
      w3B * this._stats[BaseballStat.TRIPLE] +
      wHR * this._stats[BaseballStat.HR]
    );
  }

  get leftOnBasePercent(): number {
    if (!this.lobPercentValid) return 0;
    const batting = this._stats[BaseballStat.HA] + this._stats[BaseballStat.BBI] + this._stats[BaseballStat.HB];
    // prettier-ignore
    return ((batting - this._stats[BaseballStat.RA]) / (batting - 1.4 * this._stats[BaseballStat.HRA])) * 100;
  }

  get nonHits(): number {
    if (!this.nonHitsValid) return 0;
    return (
      this._stats[BaseballStat.AB] +
      this._stats[BaseballStat.BB] -
      (this._stats[BaseballStat.IBB] + this._stats[BaseballStat.SF] + this._stats[BaseballStat.HBP])
    );
  }

  get unintentionalBB(): number {
    if (!this.unintentionalBBValid) return 0;
    return this._stats[BaseballStat.BB] - this._stats[BaseballStat.IBB];
  }

  private get babipValid(): boolean {
    return this.validate([BaseballStat.HA, BaseballStat.HRA, BaseballStat.BF, BaseballStat.K, BaseballStat.SFA]);
  }

  private get wRCValid(): boolean {
    return this.wRAAValid;
  }

  private get wRAAValid(): boolean {
    return this.wOBAValid && this.validate([BaseballStat.PA]);
  }

  private get wOBAValid(): boolean {
    return this.weightedHitsValid && this.nonHitsValid;
  }

  private get fipValid(): boolean {
    return this.validate([BaseballStat.HRA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.K, BaseballStat.IP]);
  }

  private get unintentionalBBValid(): boolean {
    return this.validate([BaseballStat.BB, BaseballStat.IBB]);
  }

  private get weightedHitsValid(): boolean {
    return this.validate([BaseballStat.HBP, BaseballStat.SINGLE, BaseballStat.DOUBLE, BaseballStat.TRIPLE, BaseballStat.HR]);
  }

  private get nonHitsValid(): boolean {
    return this.validate([BaseballStat.AB, BaseballStat.BB, BaseballStat.IBB, BaseballStat.SF, BaseballStat.HBP]);
  }

  private get isoValid(): boolean {
    return this.validate([BaseballStat.SLG, BaseballStat.AVG]);
  }

  private get lobPercentValid(): boolean {
    return this.validate([BaseballStat.HA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.RA, BaseballStat.HRA]);
  }

  private validate(stats: BaseballStat[]) {
    return stats.every(stat => stat in this._stats);
  }
}
