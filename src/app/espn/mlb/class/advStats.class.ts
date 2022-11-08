import { exists } from '@app/@shared/helpers/utils';
import { EspnClient } from '@espnClient/espn-client.model';
import { SeasonStatConst } from '../models/adv-stats.model';
import { EspnBaseballStat } from '../models/mlb-stats.model';

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
    return ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale) * this._stats[EspnBaseballStat.PA];
  }

  get wRC(): number {
    if (!this.wRCValid) return 0;
    return (
      ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale + this._seasonConst['r/PA']) * this._stats[EspnBaseballStat.PA]
    );
  }

  get fip(): number {
    if (!this.fipValid) return 0;
    // prettier-ignore
    return (
      (13 * this._stats[EspnBaseballStat.HRA] + 3 * (this._stats[EspnBaseballStat.BBI] + this._stats[EspnBaseballStat.HB]) - 2 * this._stats[EspnBaseballStat.K]) / (this._stats[EspnBaseballStat.IP]* 0.333) +
      this._seasonConst.cFIP
    );
  }

  get babip(): number {
    if (!this.babipValid) return 0;
    // prettier-ignore
    return (
      (this._stats[EspnBaseballStat.HA] - this._stats[EspnBaseballStat.HRA]) /
      (this._stats[EspnBaseballStat.BF] - this._stats[EspnBaseballStat.K] - this._stats[EspnBaseballStat.HRA] + this._stats[EspnBaseballStat.SFA])
    );
  }

  get iso(): number {
    if (!this.isoValid) return 0;
    return this._stats[EspnBaseballStat.SLG] - this._stats[EspnBaseballStat.AVG];
  }

  get weightedHits(): number {
    if (!this.weightedHitsValid) return 0;
    return (
      this._seasonConst.wBB * this.unintentionalBB +
      this._seasonConst.wHBP * this._stats[EspnBaseballStat.HBP] +
      this._seasonConst.w1B * this._stats[EspnBaseballStat.SINGLE] +
      this._seasonConst.w2B * this._stats[EspnBaseballStat.DOUBLE] +
      this._seasonConst.w3B * this._stats[EspnBaseballStat.TRIPLE] +
      this._seasonConst.wHR * this._stats[EspnBaseballStat.HR]
    );
  }

  get leftOnBasePercent(): number {
    if (!this.lobPercentValid) return 0;
    const batting = this._stats[EspnBaseballStat.HA] + this._stats[EspnBaseballStat.BBI] + this._stats[EspnBaseballStat.HB];
    // prettier-ignore
    return ((batting - this._stats[EspnBaseballStat.RA]) / (batting - 1.4 * this._stats[EspnBaseballStat.HRA])) * 100;
  }

  get nonHits(): number {
    if (!this.nonHitsValid) return 0;
    return (
      this._stats[EspnBaseballStat.AB] +
      this._stats[EspnBaseballStat.BB] -
      (this._stats[EspnBaseballStat.IBB] + this._stats[EspnBaseballStat.SF] + this._stats[EspnBaseballStat.HBP])
    );
  }

  get unintentionalBB(): number {
    if (!this.unintentionalBBValid) return 0;
    return this._stats[EspnBaseballStat.BB] - this._stats[EspnBaseballStat.IBB];
  }

  private get babipValid(): boolean {
    return (
      EspnBaseballStat.HA in this._stats &&
      EspnBaseballStat.HRA in this._stats &&
      EspnBaseballStat.BF in this._stats &&
      EspnBaseballStat.K in this._stats &&
      EspnBaseballStat.SFA in this._stats
    );
  }

  private get wRCValid(): boolean {
    return this.wRAAValid;
  }

  private get wRAAValid(): boolean {
    return this.wOBAValid && EspnBaseballStat.PA in this._stats;
  }

  private get wOBAValid(): boolean {
    return this.weightedHitsValid && this.nonHitsValid;
  }

  private get fipValid(): boolean {
    return (
      EspnBaseballStat.HRA in this._stats &&
      EspnBaseballStat.BBI in this._stats &&
      EspnBaseballStat.HB in this._stats &&
      EspnBaseballStat.K in this._stats &&
      EspnBaseballStat.IP in this._stats
    );
  }

  private get unintentionalBBValid(): boolean {
    return EspnBaseballStat.BB in this._stats && EspnBaseballStat.IBB in this._stats;
  }

  private get weightedHitsValid(): boolean {
    return (
      EspnBaseballStat.HBP in this._stats &&
      EspnBaseballStat.SINGLE in this._stats &&
      EspnBaseballStat.DOUBLE in this._stats &&
      EspnBaseballStat.TRIPLE in this._stats &&
      EspnBaseballStat.HR in this._stats
    );
  }

  private get nonHitsValid(): boolean {
    return (
      EspnBaseballStat.AB in this._stats &&
      EspnBaseballStat.BB in this._stats &&
      EspnBaseballStat.IBB in this._stats &&
      EspnBaseballStat.SF in this._stats &&
      EspnBaseballStat.HBP in this._stats
    );
  }

  private get isoValid(): boolean {
    return EspnBaseballStat.SLG in this._stats && EspnBaseballStat.AVG in this._stats;
  }

  private get lobPercentValid(): boolean {
    return (
      EspnBaseballStat.HA in this._stats &&
      EspnBaseballStat.BBI in this._stats &&
      EspnBaseballStat.HB in this._stats &&
      EspnBaseballStat.RA in this._stats &&
      EspnBaseballStat.HRA in this._stats
    );
  }
}
