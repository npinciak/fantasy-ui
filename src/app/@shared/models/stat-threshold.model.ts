export enum StatThreshold {
  excellent,
  great,
  aboveAvg,
  avg,
  belowAvg,
  poor,
  awful,
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

export const StatThresholdMap: { [key in StatThreshold]: StatThresholdClass } = {
  [StatThreshold.excellent]: StatThresholdClass.excellent,
  [StatThreshold.great]: StatThresholdClass.great,
  [StatThreshold.aboveAvg]: StatThresholdClass.aboveAvg,
  [StatThreshold.avg]: StatThresholdClass.avg,
  [StatThreshold.belowAvg]: StatThresholdClass.belowAvg,
  [StatThreshold.poor]: StatThresholdClass.poor,
  [StatThreshold.awful]: StatThresholdClass.awful,
};
