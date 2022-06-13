import { StatThreshold } from '@app/@shared/models/stat-threshold.model';

export type StatByThreshold = {
  [key in StatThreshold]: number;
};

export type StatThresholdByStat = { [x: number]: StatByThreshold };
