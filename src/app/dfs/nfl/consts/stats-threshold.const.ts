import { StatThreshold, StatThresholdClass } from '@sports-ui/ui-sdk';

export function matchupThreshold(val: number): string {
  const thresholds = [
    { range: [0, 7], class: StatThresholdClass[StatThreshold.Excellent] },
    { range: [7, 11], class: StatThresholdClass[StatThreshold.Excellent] },
    { range: [11, 16], class: StatThresholdClass[StatThreshold.Excellent] },
    { range: [16, 20], class: StatThresholdClass[StatThreshold.Excellent] },
    { range: [20, 25], class: StatThresholdClass[StatThreshold.Excellent] },
    { range: [25, 32], class: StatThresholdClass[StatThreshold.Excellent] },
  ];

  const threshold = thresholds.find(t => range(val, t.range[0], t.range[1]));
  return `status-indicator ${threshold?.class || ''}`;
}

export function matchupThresholdInverse(val: number): string {
  const thresholds = [
    { range: [0, 7], class: StatThresholdClass[StatThreshold.Awful] },
    { range: [7, 11], class: StatThresholdClass[StatThreshold.Poor] },
    { range: [11, 16], class: StatThresholdClass[StatThreshold.BelowAvg] },
    { range: [16, 20], class: StatThresholdClass[StatThreshold.Avg] },
    { range: [20, 25], class: StatThresholdClass[StatThreshold.AboveAvg] },
    { range: [25, 32], class: StatThresholdClass[StatThreshold.Excellent] },
  ];

  const threshold = thresholds.find(t => range(val, t.range[0], t.range[1]));
  return `status-indicator ${threshold?.class || ''}`;
}

function range(val: number, min: number, max: number): boolean {
  return val > min && val <= max;
}
