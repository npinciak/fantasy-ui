import { StatThresholds } from '@app/@shared/models/stat-threshold.model';
import { EspnBaseballStat } from '../models/mlb-stats.model';

export const OpsThreshold = {
  [StatThresholds.excellent]: 1.0,
  [StatThresholds.great]: 0.9,
  [StatThresholds.aboveAvg]: 0.8,
  [StatThresholds.avg]: 0.71,
  [StatThresholds.belowAvg]: 0.67,
  [StatThresholds.poor]: 0.6,
  [StatThresholds.awful]: 0.57,
} as const;

export const WraaThreshold = {
  [StatThresholds.excellent]: 40,
  [StatThresholds.great]: 20,
  [StatThresholds.aboveAvg]: 10,
  [StatThresholds.avg]: 0,
  [StatThresholds.belowAvg]: -5,
  [StatThresholds.poor]: -10,
  [StatThresholds.awful]: -20,
} as const;

export const wobaThreshold = {
  [StatThresholds.excellent]: 0.4,
  [StatThresholds.great]: 0.37,
  [StatThresholds.aboveAvg]: 0.34,
  [StatThresholds.avg]: 0.32,
  [StatThresholds.belowAvg]: 0.31,
  [StatThresholds.poor]: 0.3,
  [StatThresholds.awful]: 0.29,
} as const;

export const k9Threshold = {
  [StatThresholds.excellent]: 10,
  [StatThresholds.great]: 9,
  [StatThresholds.aboveAvg]: 8.2,
  [StatThresholds.avg]: 7.7,
  [StatThresholds.belowAvg]: 7.0,
  [StatThresholds.poor]: 6.0,
  [StatThresholds.awful]: 5.0,
} as const;

export const kPctThreshold = {
  [StatThresholds.excellent]: 27,
  [StatThresholds.great]: 24,
  [StatThresholds.aboveAvg]: 22,
  [StatThresholds.avg]: 20,
  [StatThresholds.belowAvg]: 17,
  [StatThresholds.poor]: 15,
  [StatThresholds.awful]: 13,
} as const;

export const bb9Threshold = {
  [StatThresholds.excellent]: 1.5,
  [StatThresholds.great]: 1.9,
  [StatThresholds.aboveAvg]: 2.5,
  [StatThresholds.avg]: 2.9,
  [StatThresholds.belowAvg]: 3.2,
  [StatThresholds.poor]: 3.5,
  [StatThresholds.awful]: 4.0,
} as const;

export const bbPctThreshold = {
  [StatThresholds.excellent]: 4.5,
  [StatThresholds.great]: 5.5,
  [StatThresholds.aboveAvg]: 6.5,
  [StatThresholds.avg]: 7.7,
  [StatThresholds.belowAvg]: 8.0,
  [StatThresholds.poor]: 8.5,
  [StatThresholds.awful]: 9.0,
} as const;

export const lobPctThreshold = {
  [StatThresholds.excellent]: 80,
  [StatThresholds.great]: 78,
  [StatThresholds.aboveAvg]: 75,
  [StatThresholds.avg]: 72,
  [StatThresholds.belowAvg]: 70,
  [StatThresholds.poor]: 65,
  [StatThresholds.awful]: 60,
} as const;

export const THRESHOLD_MAP = {
  [EspnBaseballStat.wRAA]: WraaThreshold,
  [EspnBaseballStat.wOBA]: wobaThreshold,
  [EspnBaseballStat.OPS]: OpsThreshold,
  [EspnBaseballStat.K_9]: k9Threshold,
  [EspnBaseballStat.LOB_PCT]: lobPctThreshold,
} as const;
