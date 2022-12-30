import { StatThresholds } from '@app/@shared/models/stat-threshold.model';

export type StatByThreshold = {
  [key in StatThresholds]: number;
};

export type StatThresholdByStat = { [x: number]: StatByThreshold };
