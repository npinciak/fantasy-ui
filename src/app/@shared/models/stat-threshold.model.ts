export enum StatThresholds {
  excellent,
  great,
  aboveAvg,
  avg,
  belowAvg,
  poor,
  awful,
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

// type t = typeof StatThresholdColorss;
// type StatThresholdColorssType = keyof t; // 'low' | 'average' | 'high'
// type StatThresholdColorssValueType = t[keyof t]; // '1' | '2' | '3'

// // const hisPay: payValueType = '3'; //okay
// // const myPay: payValueType = '4'; // error

export type StatByThreshold = { [key in StatThresholds]: number };
export type StatThresholdByStat = { [key in StatThresholds]: StatByThreshold };

export type StatThresholdByStatThresholdLabel = { [key in keyof typeof StatThresholdLabel]: number };

export const StatThresholdLabelByStatThreshold = {
  [StatThresholds.excellent]: StatThresholdLabel.excellent,
  [StatThresholds.great]: StatThresholdLabel.great,
  [StatThresholds.aboveAvg]: StatThresholdLabel.aboveAvg,
  [StatThresholds.avg]: StatThresholdLabel.avg,
  [StatThresholds.belowAvg]: StatThresholdLabel.belowAvg,
  [StatThresholds.poor]: StatThresholdLabel.poor,
  [StatThresholds.awful]: StatThresholdLabel.awful,
} as const;

export const StatThresholdClassByStatThreshold = {
  [StatThresholds.excellent]: StatThresholdClass.excellent,
  [StatThresholds.great]: StatThresholdClass.great,
  [StatThresholds.aboveAvg]: StatThresholdClass.aboveAvg,
  [StatThresholds.avg]: StatThresholdClass.avg,
  [StatThresholds.belowAvg]: StatThresholdClass.belowAvg,
  [StatThresholds.poor]: StatThresholdClass.poor,
  [StatThresholds.awful]: StatThresholdClass.awful,
} as const;

export const StatThresholdColorByStatThreshold = {
  [StatThresholds.excellent]: StatThresholdColors.excellent,
  [StatThresholds.great]: StatThresholdColors.great,
  [StatThresholds.aboveAvg]: StatThresholdColors.aboveAvg,
  [StatThresholds.avg]: StatThresholdColors.avg,
  [StatThresholds.belowAvg]: StatThresholdColors.belowAvg,
  [StatThresholds.poor]: StatThresholdColors.poor,
  [StatThresholds.awful]: StatThresholdColors.awful,
} as const;
