export enum StatThreshold {
  Excellent,
  Great,
  AboveAvg,
  Avg,
  BelowAvg,
  Poor,
  Awful,
}

export const StatThresholdColors = {
  excellent: '#00876c',
  great: '#71a879',
  aboveAvg: '#b6c794',
  avg: '#f4e8bc',
  belowAvg: '#eab780',
  poor: '#e2805b',
  awful: '#d43d51',
} as const;

export const StatThresholdClass = {
  excellent: 'excellent',
  great: 'great',
  aboveAvg: 'above-avg',
  avg: 'avg',
  belowAvg: 'below-avg',
  poor: 'poor',
  awful: 'awful',
} as const;

export const StatThresholdLabel = {
  excellent: 'Excellent',
  great: 'Great',
  aboveAvg: 'Above Avg',
  avg: 'Avg',
  belowAvg: 'Below Avg',
  poor: 'Poor',
  awful: 'Awful',
} as const;

export type StatThresholdT = typeof StatThresholdLabel[keyof typeof StatThresholdLabel];

export type StatByThreshold = { [key in StatThreshold]: number };
export type StatThresholdByStat = { [key in StatThreshold]: StatByThreshold };

export type StatThresholdByStatThresholdLabel = { [key in keyof typeof StatThresholdLabel]: number };

export const StatThresholdLabelByStatThreshold: { [key in StatThreshold]: string } = {
  [StatThreshold.Excellent]: StatThresholdLabel.excellent,
  [StatThreshold.Great]: StatThresholdLabel.great,
  [StatThreshold.AboveAvg]: StatThresholdLabel.aboveAvg,
  [StatThreshold.Avg]: StatThresholdLabel.avg,
  [StatThreshold.BelowAvg]: StatThresholdLabel.belowAvg,
  [StatThreshold.Poor]: StatThresholdLabel.poor,
  [StatThreshold.Awful]: StatThresholdLabel.awful,
} as const;

export const StatThresholdClassByStatThreshold = {
  [StatThreshold.Excellent]: StatThresholdClass.excellent,
  [StatThreshold.Great]: StatThresholdClass.great,
  [StatThreshold.AboveAvg]: StatThresholdClass.aboveAvg,
  [StatThreshold.Avg]: StatThresholdClass.avg,
  [StatThreshold.BelowAvg]: StatThresholdClass.belowAvg,
  [StatThreshold.Poor]: StatThresholdClass.poor,
  [StatThreshold.Awful]: StatThresholdClass.awful,
} as const;

export const StatThresholdColorByStatThreshold = {
  [StatThreshold.Excellent]: StatThresholdColors.excellent,
  [StatThreshold.Great]: StatThresholdColors.great,
  [StatThreshold.AboveAvg]: StatThresholdColors.aboveAvg,
  [StatThreshold.Avg]: StatThresholdColors.avg,
  [StatThreshold.BelowAvg]: StatThresholdColors.belowAvg,
  [StatThreshold.Poor]: StatThresholdColors.poor,
  [StatThreshold.Awful]: StatThresholdColors.awful,
} as const;
