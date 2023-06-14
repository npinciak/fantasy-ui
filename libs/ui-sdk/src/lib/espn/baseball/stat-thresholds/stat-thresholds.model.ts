export enum StatThreshold {
  Excellent,
  Great,
  AboveAvg,
  Avg,
  BelowAvg,
  Poor,
  Awful,
}

export const StatThresholdColors: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: '#00876c',
  [StatThreshold.Great]: '#71a879',
  [StatThreshold.AboveAvg]: '#b6c794',
  [StatThreshold.Avg]: '#f4e8bc',
  [StatThreshold.BelowAvg]: '#eab780',
  [StatThreshold.Poor]: '#e2805b',
  [StatThreshold.Awful]: '#d43d51',
} as const;

export const StatThresholdClass: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: 'excellent',
  [StatThreshold.Great]: 'great',
  [StatThreshold.AboveAvg]: 'above-avg',
  [StatThreshold.Avg]: 'avg',
  [StatThreshold.BelowAvg]: 'below-avg',
  [StatThreshold.Poor]: 'poor',
  [StatThreshold.Awful]: 'awful',
} as const;

export const StatThresholdLabel: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: 'Excellent',
  [StatThreshold.Great]: 'Great',
  [StatThreshold.AboveAvg]: 'Above Avg',
  [StatThreshold.Avg]: 'Avg',
  [StatThreshold.BelowAvg]: 'Below Avg',
  [StatThreshold.Poor]: 'Poor',
  [StatThreshold.Awful]: 'Awful',
} as const;

export type StatValueByThreshold<T> = { readonly [key in StatThreshold]: T };

export const StatThresholdLabelByStatThreshold: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: StatThresholdLabel[StatThreshold.Excellent],
  [StatThreshold.Great]: StatThresholdLabel[StatThreshold.Great],
  [StatThreshold.AboveAvg]: StatThresholdLabel[StatThreshold.AboveAvg],
  [StatThreshold.Avg]: StatThresholdLabel[StatThreshold.Avg],
  [StatThreshold.BelowAvg]: StatThresholdLabel[StatThreshold.BelowAvg],
  [StatThreshold.Poor]: StatThresholdLabel[StatThreshold.Poor],
  [StatThreshold.Awful]: StatThresholdLabel[StatThreshold.Awful],
} as const;

export const StatThresholdClassByStatThreshold: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: StatThresholdClass[StatThreshold.Excellent],
  [StatThreshold.Great]: StatThresholdClass[StatThreshold.Great],
  [StatThreshold.AboveAvg]: StatThresholdClass[StatThreshold.AboveAvg],
  [StatThreshold.Avg]: StatThresholdClass[StatThreshold.Avg],
  [StatThreshold.BelowAvg]: StatThresholdClass[StatThreshold.BelowAvg],
  [StatThreshold.Poor]: StatThresholdClass[StatThreshold.Poor],
  [StatThreshold.Awful]: StatThresholdClass[StatThreshold.Awful],
} as const;

export const StatThresholdColorByStatThreshold: StatValueByThreshold<string> = {
  [StatThreshold.Excellent]: StatThresholdColors[StatThreshold.Excellent],
  [StatThreshold.Great]: StatThresholdColors[StatThreshold.Great],
  [StatThreshold.AboveAvg]: StatThresholdColors[StatThreshold.AboveAvg],
  [StatThreshold.Avg]: StatThresholdColors[StatThreshold.Avg],
  [StatThreshold.BelowAvg]: StatThresholdColors[StatThreshold.BelowAvg],
  [StatThreshold.Poor]: StatThresholdColors[StatThreshold.Poor],
  [StatThreshold.Awful]: StatThresholdColors[StatThreshold.Awful],
} as const;
