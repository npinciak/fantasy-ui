import { StatThresholdRatings } from '@app/@shared/models/stat-threshold.model';
import { BaseballStat } from 'sports-ui-sdk';

export const OpsThreshold = {
  [StatThresholdRatings.excellent]: 1.0,
  [StatThresholdRatings.great]: 0.9,
  [StatThresholdRatings.aboveAvg]: 0.8,
  [StatThresholdRatings.avg]: 0.71,
  [StatThresholdRatings.belowAvg]: 0.67,
  [StatThresholdRatings.poor]: 0.6,
  [StatThresholdRatings.awful]: 0.57,
} as const;

export const WraaThreshold = {
  [StatThresholdRatings.excellent]: 40,
  [StatThresholdRatings.great]: 20,
  [StatThresholdRatings.aboveAvg]: 10,
  [StatThresholdRatings.avg]: 0,
  [StatThresholdRatings.belowAvg]: -5,
  [StatThresholdRatings.poor]: -10,
  [StatThresholdRatings.awful]: -20,
} as const;

export const wobaThreshold = {
  [StatThresholdRatings.excellent]: 0.4,
  [StatThresholdRatings.great]: 0.37,
  [StatThresholdRatings.aboveAvg]: 0.34,
  [StatThresholdRatings.avg]: 0.32,
  [StatThresholdRatings.belowAvg]: 0.31,
  [StatThresholdRatings.poor]: 0.3,
  [StatThresholdRatings.awful]: 0.29,
} as const;

export const k9Threshold = {
  [StatThresholdRatings.excellent]: 10,
  [StatThresholdRatings.great]: 9,
  [StatThresholdRatings.aboveAvg]: 8.2,
  [StatThresholdRatings.avg]: 7.7,
  [StatThresholdRatings.belowAvg]: 7.0,
  [StatThresholdRatings.poor]: 6.0,
  [StatThresholdRatings.awful]: 5.0,
} as const;

export const kPctThreshold = {
  [StatThresholdRatings.excellent]: 27,
  [StatThresholdRatings.great]: 24,
  [StatThresholdRatings.aboveAvg]: 22,
  [StatThresholdRatings.avg]: 20,
  [StatThresholdRatings.belowAvg]: 17,
  [StatThresholdRatings.poor]: 15,
  [StatThresholdRatings.awful]: 13,
} as const;

export const bb9Threshold = {
  [StatThresholdRatings.excellent]: 1.5,
  [StatThresholdRatings.great]: 1.9,
  [StatThresholdRatings.aboveAvg]: 2.5,
  [StatThresholdRatings.avg]: 2.9,
  [StatThresholdRatings.belowAvg]: 3.2,
  [StatThresholdRatings.poor]: 3.5,
  [StatThresholdRatings.awful]: 4.0,
} as const;

export const bbPctThreshold = {
  [StatThresholdRatings.excellent]: 4.5,
  [StatThresholdRatings.great]: 5.5,
  [StatThresholdRatings.aboveAvg]: 6.5,
  [StatThresholdRatings.avg]: 7.7,
  [StatThresholdRatings.belowAvg]: 8.0,
  [StatThresholdRatings.poor]: 8.5,
  [StatThresholdRatings.awful]: 9.0,
} as const;

export const lobPctThreshold = {
  [StatThresholdRatings.excellent]: 80,
  [StatThresholdRatings.great]: 78,
  [StatThresholdRatings.aboveAvg]: 75,
  [StatThresholdRatings.avg]: 72,
  [StatThresholdRatings.belowAvg]: 70,
  [StatThresholdRatings.poor]: 65,
  [StatThresholdRatings.awful]: 60,
} as const;

export const THRESHOLD_MAP = {
  [BaseballStat.wRAA]: WraaThreshold,
  [BaseballStat.wOBA]: wobaThreshold,
  [BaseballStat.OPS]: OpsThreshold,
  [BaseballStat.K_9]: k9Threshold,
  [BaseballStat.LOB_PCT]: lobPctThreshold,
} as const;
