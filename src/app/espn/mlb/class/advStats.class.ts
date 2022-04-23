import { exists } from '@app/@shared/helpers/utils';
import { EspnClientPlayerStatsEntity } from '@app/espn/espn-client.model';
import { SeasonConst } from '../models/adv-stats.model';
import { Stat } from '../models/mlb-stats.model';

export class AdvStats {
  private _stats: EspnClientPlayerStatsEntity;
  private _seasonConst: SeasonConst;

  constructor(configs: { seasonConst: SeasonConst; statsEntity: EspnClientPlayerStatsEntity }) {
    this._stats = exists(configs.statsEntity) ? configs.statsEntity : [];
    this._seasonConst = configs.seasonConst;
  }

  get wOBA(): number {
    if (!this.wOBAValid) return 0;
    return this.weightedHits / this.nonHits;
  }

  get wRAA(): number {
    if (!this.wRAAValid) return 0;
    return ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale) * this._stats[Stat.PA];
  }

  get wRC(): number {
    if (!this.wRCValid) return 0;
    return ((this.wOBA - this._seasonConst.wOBA) / this._seasonConst.wOBAScale + this._seasonConst['r/PA']) * this._stats[Stat.PA];
  }

  get fip(): number {
    if (!this.fipValid) return 0;
    return (
      (13 * this._stats[Stat.HRA] + 3 * (this._stats[Stat.BBI] + this._stats[Stat.HB]) - 2 * this._stats[Stat.K]) / this._stats[Stat.IP] +
      this._seasonConst.cFIP
    );
  }

  get babip(): number {
    if (!this.babipValid) return 0;
    return (
      (this._stats[Stat.H] - this._stats[Stat.HR]) /
      (this._stats[Stat.AB] - this._stats[Stat.K] - this._stats[Stat.HR] + this._stats[Stat.SF])
    );
  }

  get iso(): number {
    if (!this.isoValid) return 0;
    return this._stats[Stat.SLG] - this._stats[Stat.AVG];
  }

  get weightedHits(): number {
    if (!this.weightedHitsValid) return 0;
    return (
      this._seasonConst.wBB * this.unintentionalBB +
      this._seasonConst.wHBP * this._stats[Stat.HBP] +
      this._seasonConst.w1B * this._stats[Stat['1B']] +
      this._seasonConst.w2B * this._stats[Stat['2B']] +
      this._seasonConst.w3B * this._stats[Stat['3B']] +
      this._seasonConst.wHR * this._stats[Stat.HR]
    );
  }

  get nonHits(): number {
    if (!this.nonHitsValid) return 0;
    return this._stats[Stat.AB] + this._stats[Stat.BB] - (this._stats[Stat.IBB] + this._stats[Stat.SF] + this._stats[Stat.HBP]);
  }

  get unintentionalBB(): number {
    if (!this.unintentionalBBValid) return 0;
    return this._stats[Stat.BB] - this._stats[Stat.IBB];
  }

  private get babipValid(): boolean {
    return (
      this._stats.hasOwnProperty(Stat.H) &&
      this._stats.hasOwnProperty(Stat.HR) &&
      this._stats.hasOwnProperty(Stat.AB) &&
      this._stats.hasOwnProperty(Stat.K) &&
      this._stats.hasOwnProperty(Stat.HR) &&
      this._stats.hasOwnProperty(Stat.SF)
    );
  }

  private get wRCValid(): boolean {
    return this.wRAAValid;
  }

  private get wRAAValid(): boolean {
    return this.wOBAValid && this._stats.hasOwnProperty(Stat.PA);
  }

  private get wOBAValid(): boolean {
    return this.weightedHitsValid && this.nonHitsValid;
  }

  private get fipValid(): boolean {
    return (
      this._stats.hasOwnProperty(Stat.HRA) &&
      this._stats.hasOwnProperty(Stat.BBI) &&
      this._stats.hasOwnProperty(Stat.HB) &&
      this._stats.hasOwnProperty(Stat.K) &&
      this._stats.hasOwnProperty(Stat.IP)
    );
  }

  private get unintentionalBBValid(): boolean {
    return this._stats.hasOwnProperty(Stat.BB) && this._stats.hasOwnProperty(Stat.IBB);
  }

  private get weightedHitsValid(): boolean {
    return (
      this._stats.hasOwnProperty(Stat.HBP) &&
      this._stats.hasOwnProperty(Stat['1B']) &&
      this._stats.hasOwnProperty(Stat['2B']) &&
      this._stats.hasOwnProperty(Stat['3B']) &&
      this._stats.hasOwnProperty(Stat.HR)
    );
  }

  private get nonHitsValid(): boolean {
    return (
      this._stats.hasOwnProperty(Stat.AB) &&
      this._stats.hasOwnProperty(Stat.BB) &&
      this._stats.hasOwnProperty(Stat.IBB) &&
      this._stats.hasOwnProperty(Stat.SF) &&
      this._stats.hasOwnProperty(Stat.HBP)
    );
  }

  private get isoValid(): boolean {
    return this._stats.hasOwnProperty(Stat.SLG) && this._stats.hasOwnProperty(Stat.AVG);
  }
}
