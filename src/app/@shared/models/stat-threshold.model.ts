export enum StatThreshold {
  excellent,
  great,
  aboveAvg,
  avg,
  belowAvg,
  poor,
  awful,
}

export enum StatThresholdColor {
  excellent = '#00876c',
  great = '#71a879',
  aboveAvg = '#b6c794',
  avg = '#f4e8bc',
  belowAvg = '#eab780',
  poor = '#e2805b',
  awful = '#d43d51',
}

export enum StatThresholdClass {
  excellent = 'excellent',
  great = 'great',
  aboveAvg = 'above-avg',
  avg = 'avg',
  belowAvg = 'below-avg',
  poor = 'poor',
  awful = 'awful',
}

export type StatByThreshold = {
  [key in StatThreshold]: number;
};

export const StatThresholdByClassMap: { [key in StatThreshold]: StatThresholdClass } = {
  [StatThreshold.excellent]: StatThresholdClass.excellent,
  [StatThreshold.great]: StatThresholdClass.great,
  [StatThreshold.aboveAvg]: StatThresholdClass.aboveAvg,
  [StatThreshold.avg]: StatThresholdClass.avg,
  [StatThreshold.belowAvg]: StatThresholdClass.belowAvg,
  [StatThreshold.poor]: StatThresholdClass.poor,
  [StatThreshold.awful]: StatThresholdClass.awful,
};

export const StatThresholdByColorMap: { [key in StatThreshold]: StatThresholdColor } = {
  [StatThreshold.excellent]: StatThresholdColor.excellent,
  [StatThreshold.great]: StatThresholdColor.great,
  [StatThreshold.aboveAvg]: StatThresholdColor.aboveAvg,
  [StatThreshold.avg]: StatThresholdColor.avg,
  [StatThreshold.belowAvg]: StatThresholdColor.belowAvg,
  [StatThreshold.poor]: StatThresholdColor.poor,
  [StatThreshold.awful]: StatThresholdColor.awful,
};
