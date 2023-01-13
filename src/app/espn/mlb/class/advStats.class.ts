import { exists } from '@app/@shared/helpers/utils';
import { BaseballStat, EspnClient } from 'sports-ui-sdk';
import { SeasonStatConst } from '../models/adv-stats.model';

export class AdvStats {
  private _stats: EspnClient.PlayerStatsEntity;
  private _seasonConst: SeasonStatConst;

  constructor(configs: { seasonConst: SeasonStatConst; statsEntity: EspnClient.PlayerStatsEntity }) {
    this._stats = exists(configs.statsEntity) ? configs.statsEntity : [];
    this._seasonConst = configs.seasonConst;
  }

  get wOBA(): number {
    if (!this.wOBAValid) return 0;
    return this.weightedHits / this.nonHits;
  }

  get wRAA(): number {
    if (!this.wRAAValid) return 0;
    return ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale) * this._stats[BaseballStat.PA];
  }

  get wRC(): number {
    if (!this.wRCValid) return 0;
    return ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale + this._seasonConst['r/PA']) * this._stats[BaseballStat.PA];
  }

  get fip(): number {
    if (!this.fipValid) return 0;
    // prettier-ignore
    return (
      (13 * this._stats[BaseballStat.HRA] + 3 * (this._stats[BaseballStat.BBI] + this._stats[BaseballStat.HB]) - 2 * this._stats[BaseballStat.K]) / (this._stats[BaseballStat.IP]* 0.333) +
      this._seasonConst.cFIP
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
    return (
      this._seasonConst.wBB * this.unintentionalBB +
      this._seasonConst.wHBP * this._stats[BaseballStat.HBP] +
      this._seasonConst.w1B * this._stats[BaseballStat.SINGLE] +
      this._seasonConst.w2B * this._stats[BaseballStat.DOUBLE] +
      this._seasonConst.w3B * this._stats[BaseballStat.TRIPLE] +
      this._seasonConst.wHR * this._stats[BaseballStat.HR]
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
    const statConstraints = [BaseballStat.HA, BaseballStat.HRA, BaseballStat.BF, BaseballStat.K, BaseballStat.SFA];
    return this.validate(statConstraints);
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
    const statConstraints = [BaseballStat.HRA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.K, BaseballStat.IP];

    return this.validate(statConstraints);
  }

  private get unintentionalBBValid(): boolean {
    const statConstraints = [BaseballStat.BB, BaseballStat.IBB];
    return this.validate(statConstraints);
  }

  private get weightedHitsValid(): boolean {
    const statConstraints = [BaseballStat.HBP, BaseballStat.SINGLE, BaseballStat.DOUBLE, BaseballStat.TRIPLE, BaseballStat.HR];

    return this.validate(statConstraints);
  }

  private get nonHitsValid(): boolean {
    const statConstraints = [BaseballStat.AB, BaseballStat.BB, BaseballStat.IBB, BaseballStat.SF, BaseballStat.HBP];
    return this.validate(statConstraints);
  }

  private get isoValid(): boolean {
    return this.validate([BaseballStat.SLG, BaseballStat.AVG]);
  }

  private get lobPercentValid(): boolean {
    const statConstraints = [BaseballStat.HA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.RA, BaseballStat.HRA];
    return this.validate(statConstraints);
  }

  private validate(stats: BaseballStat[]) {
    return stats.every(stat => stat in this._stats);
  }
}
