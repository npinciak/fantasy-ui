import { FangraphsConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { BaseballStat } from '@sports-ui/ui-sdk/espn';
import { PlayerStatsEntity } from '@sports-ui/ui-sdk/espn-client';

export function MlbAdvancedStats(
  fangraphsConstants: FangraphsConstants,
  playerStatsEntity: PlayerStatsEntity | null
): MlbAdvancedStatsClass {
  return class MlbAdvancedStatsClass {
    private static _playerStatsEntity: PlayerStatsEntity = playerStatsEntity ?? [];
    private static _fangraphsConstants: FangraphsConstants = fangraphsConstants;

    private static _wOBACache: number | null = null;
    private static _wRAACache: number | null = null;
    private static _wRCCache: number | null = null;
    private static _fipCache: number | null = null;
    private static _babipCache: number | null = null;
    private static _isoCache: number | null = null;
    private static _weightedHitsCache: number | null = null;
    private static _leftOnBasePercentCache: number | null = null;
    private static _nonHitsCache: number | null = null;
    private static _unintentionalBBCache: number | null = null;

    static get wOBA(): number {
      if (this._wOBACache != null) return this._wOBACache;

      if (!this.wOBAValid) {
        this._wOBACache = 0;
      } else {
        const { wBB, wHBP, w1B, w2B, w3B, wHR } = this._fangraphsConstants;
        const stats = this._playerStatsEntity;
        const weightedHits =
          wBB * this.unintentionalBB +
          wHBP * stats[BaseballStat.HBP] +
          w1B * stats[BaseballStat.SINGLE] +
          w2B * stats[BaseballStat.DOUBLE] +
          w3B * stats[BaseballStat.TRIPLE] +
          wHR * stats[BaseballStat.HR];
        const nonHits =
          stats[BaseballStat.AB] + stats[BaseballStat.BB] - stats[BaseballStat.IBB] + stats[BaseballStat.SF] + stats[BaseballStat.HBP];
        this._wOBACache = weightedHits / nonHits;
      }

      return this._wOBACache;
    }

    static get wRAA(): number {
      if (this._wRAACache !== null) return this._wRAACache;

      if (!this.wRAAValid) {
        this._wRAACache = 0;
      } else {
        const { wOBAScale } = this._fangraphsConstants;
        const wOBA = this.wOBA;
        const pa = this._playerStatsEntity[BaseballStat.PA];
        this._wRAACache = ((wOBA - this._fangraphsConstants.wOBA) / wOBAScale) * pa;
      }

      return this._wRAACache;
    }

    static get wRC(): number {
      if (this._wRCCache != null) return this._wRCCache;

      if (!this.wRCValid) {
        this._wRCCache = 0;
      } else {
        const { wOBA, wOBAScale } = this._fangraphsConstants;
        const rpa = this._fangraphsConstants['R/PA'];
        const pa = this._playerStatsEntity[BaseballStat.PA];
        this._wRCCache = ((this.wOBA - wOBA) / wOBAScale + rpa) * pa;
      }

      return this._wRCCache;
    }

    static get fip(): number {
      if (this._fipCache != null) return this._fipCache;

      if (!this.fipValid) {
        this._fipCache = 0;
      } else {
        const { cFIP } = this._fangraphsConstants;
        // prettier-ignore
        this._fipCache = (
          (13 * this._playerStatsEntity[BaseballStat.HRA] + 3 * (this._playerStatsEntity[BaseballStat.BBI] + this._playerStatsEntity[BaseballStat.HB]) - 2 * this._playerStatsEntity[BaseballStat.K]) / (this._playerStatsEntity[BaseballStat.IP]* 0.333) +
         cFIP
        );
      }

      return this._fipCache;
    }

    static get babip(): number {
      if (this._babipCache != null) return this._babipCache;

      if (!this.babipValid) {
        this._babipCache = 0;
      } else {
        // prettier-ignore
        this._babipCache = (
        (this._playerStatsEntity[BaseballStat.HA] - this._playerStatsEntity[BaseballStat.HRA]) /
        (this._playerStatsEntity[BaseballStat.BF] - this._playerStatsEntity[BaseballStat.K] - this._playerStatsEntity[BaseballStat.HRA] + this._playerStatsEntity[BaseballStat.SFA]))
      }

      return this._babipCache;
    }

    static get iso(): number {
      if (this._isoCache != null) return this._isoCache;

      if (!this.isoValid) {
        this._isoCache = 0;
      } else {
        return this._playerStatsEntity[BaseballStat.SLG] - this._playerStatsEntity[BaseballStat.AVG];
      }
      return this._isoCache;
    }

    static get weightedHits(): number {
      if (this._weightedHitsCache !== null) {
        return this._weightedHitsCache;
      }

      if (!this.weightedHitsValid) {
        this._weightedHitsCache = 0;
      } else {
        const { wBB, wHBP, w1B, w2B, w3B, wHR } = this._fangraphsConstants;
        const stats = this._playerStatsEntity;
        const unintentionalBB = this.unintentionalBB;
        const weightedHits =
          wBB * unintentionalBB +
          wHBP * stats[BaseballStat.HBP] +
          w1B * stats[BaseballStat.SINGLE] +
          w2B * stats[BaseballStat.DOUBLE] +
          w3B * stats[BaseballStat.TRIPLE] +
          wHR * stats[BaseballStat.HR];
        this._weightedHitsCache = weightedHits;
      }

      return this._weightedHitsCache;
    }

    static get leftOnBasePercent(): number {
      if (this._leftOnBasePercentCache != null) {
        return this._leftOnBasePercentCache;
      }

      if (!this.lobPercentValid) {
        this._leftOnBasePercentCache = 0;
      } else {
        const batting =
          this._playerStatsEntity[BaseballStat.HA] + this._playerStatsEntity[BaseballStat.BBI] + this._playerStatsEntity[BaseballStat.HB];
        // prettier-ignore
        this._leftOnBasePercentCache = ((batting - this._playerStatsEntity[BaseballStat.RA]) / (batting - 1.4 * this._playerStatsEntity[BaseballStat.HRA])) * 100;
      }

      return this._leftOnBasePercentCache;
    }

    static get nonHits(): number {
      if (this._nonHitsCache !== null) {
        return this._nonHitsCache;
      }

      if (!this.nonHitsValid) {
        this._nonHitsCache = 0;
      } else {
        this._nonHitsCache =
          this._playerStatsEntity[BaseballStat.AB] +
          this._playerStatsEntity[BaseballStat.BB] -
          this._playerStatsEntity[BaseballStat.IBB] +
          this._playerStatsEntity[BaseballStat.SF] +
          this._playerStatsEntity[BaseballStat.HBP];
      }

      return this._nonHitsCache;
    }

    static get unintentionalBB(): number {
      if (this._unintentionalBBCache !== null) {
        return this._unintentionalBBCache;
      }
      if (!this.unintentionalBBValid) {
        this._unintentionalBBCache = 0;
      } else {
        this._unintentionalBBCache = this._playerStatsEntity[BaseballStat.BB] - this._playerStatsEntity[BaseballStat.IBB];
      }

      return this._unintentionalBBCache;
    }

    private static get babipValid(): boolean {
      return this.validate([BaseballStat.HA, BaseballStat.HRA, BaseballStat.BF, BaseballStat.K, BaseballStat.SFA]);
    }

    private static get wRCValid(): boolean {
      return this.wRAAValid;
    }

    private static get wRAAValid(): boolean {
      return this.wOBAValid && this.validate([BaseballStat.PA]);
    }

    private static get wOBAValid(): boolean {
      return this.weightedHitsValid && this.nonHitsValid;
    }

    private static get fipValid(): boolean {
      return this.validate([BaseballStat.HRA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.K, BaseballStat.IP]);
    }

    private static get unintentionalBBValid(): boolean {
      return this.validate([BaseballStat.BB, BaseballStat.IBB]);
    }

    private static get weightedHitsValid(): boolean {
      return this.validate([BaseballStat.HBP, BaseballStat.SINGLE, BaseballStat.DOUBLE, BaseballStat.TRIPLE, BaseballStat.HR]);
    }

    private static get nonHitsValid(): boolean {
      return this.validate([BaseballStat.AB, BaseballStat.BB, BaseballStat.IBB, BaseballStat.SF, BaseballStat.HBP]);
    }

    private static get isoValid(): boolean {
      return this.validate([BaseballStat.SLG, BaseballStat.AVG]);
    }

    private static get lobPercentValid(): boolean {
      return this.validate([BaseballStat.HA, BaseballStat.BBI, BaseballStat.HB, BaseballStat.RA, BaseballStat.HRA]);
    }

    private static validate(stats: BaseballStat[]) {
      return stats.every(stat => stat in this._playerStatsEntity);
    }
  };
}

export type MlbAdvancedStatsClass = {
  new (...args: unknown[]): unknown;
  fip: number;
  wOBA: number;
  wRAA: number;
  babip: number;
  iso: number;
  leftOnBasePercent: number;
  wRC: number;
};
