import { StatByThreshold, StatThreshold } from '@app/@shared/models/stat-threshold.model';
import { Stat } from '../models/mlb-stats.model';

export const opsThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 1.0,
  [StatThreshold.great]: 0.9,
  [StatThreshold.aboveAvg]: 0.8,
  [StatThreshold.avg]: 0.71,
  [StatThreshold.belowAvg]: 0.67,
  [StatThreshold.poor]: 0.6,
  [StatThreshold.awful]: 0.57,
};

export const wraaThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 40,
  [StatThreshold.great]: 20,
  [StatThreshold.aboveAvg]: 10,
  [StatThreshold.avg]: 0,
  [StatThreshold.belowAvg]: -5,
  [StatThreshold.poor]: -10,
  [StatThreshold.awful]: -20,
};

export const wobaThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 0.4,
  [StatThreshold.great]: 0.37,
  [StatThreshold.aboveAvg]: 0.34,
  [StatThreshold.avg]: 0.32,
  [StatThreshold.belowAvg]: 0.31,
  [StatThreshold.poor]: 0.3,
  [StatThreshold.awful]: 0.29,
};

export const k9Threshold: StatByThreshold = {
  [StatThreshold.excellent]: 10,
  [StatThreshold.great]: 9,
  [StatThreshold.aboveAvg]: 8.2,
  [StatThreshold.avg]: 7.7,
  [StatThreshold.belowAvg]: 7.0,
  [StatThreshold.poor]: 6.0,
  [StatThreshold.awful]: 5.0,
};

export const kPctThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 27,
  [StatThreshold.great]: 24,
  [StatThreshold.aboveAvg]: 22,
  [StatThreshold.avg]: 20,
  [StatThreshold.belowAvg]: 17,
  [StatThreshold.poor]: 15,
  [StatThreshold.awful]: 13,
};

export const bb9Threshold: StatByThreshold = {
  [StatThreshold.excellent]: 1.5,
  [StatThreshold.great]: 1.9,
  [StatThreshold.aboveAvg]: 2.5,
  [StatThreshold.avg]: 2.9,
  [StatThreshold.belowAvg]: 3.2,
  [StatThreshold.poor]: 3.5,
  [StatThreshold.awful]: 4.0,
};

export const bbPctThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 4.5,
  [StatThreshold.great]: 5.5,
  [StatThreshold.aboveAvg]: 6.5,
  [StatThreshold.avg]: 7.7,
  [StatThreshold.belowAvg]: 8.0,
  [StatThreshold.poor]: 8.5,
  [StatThreshold.awful]: 9.0,
};

export const lobPctThreshold: StatByThreshold = {
  [StatThreshold.excellent]: 80,
  [StatThreshold.great]: 78,
  [StatThreshold.aboveAvg]: 75,
  [StatThreshold.avg]: 72,
  [StatThreshold.belowAvg]: 70,
  [StatThreshold.poor]: 65,
  [StatThreshold.awful]: 60,
};

export const THRESHOLD_MAP: {
  [x: number]: StatByThreshold;
} = {
  [Stat.wRAA]: wraaThreshold,
  [Stat.wOBA]: wobaThreshold,
  [Stat.OPS]: opsThreshold,
  [Stat.K_9]: k9Threshold,
  [Stat.LOB_PCT]: lobPctThreshold,
};
