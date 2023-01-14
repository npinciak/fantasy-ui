import { StatThresholdClass } from '@app/@shared/models/stat-threshold.model';

export function matchupThreshold(val: number): string {
  const thresholds = [
    { range: [0, 7], class: StatThresholdClass.excellent },
    { range: [7, 11], class: StatThresholdClass.aboveAvg },
    { range: [11, 16], class: StatThresholdClass.avg },
    { range: [16, 20], class: StatThresholdClass.belowAvg },
    { range: [20, 25], class: StatThresholdClass.poor },
    { range: [25, 32], class: StatThresholdClass.awful },
  ];

  const threshold = thresholds.find(t => range(val, t.range[0], t.range[1]));
  return `status-indicator ${threshold?.class || ''}`;
}

export function matchupThresholdInverse(val: number): string {
  const thresholds = [
    { range: [0, 7], class: StatThresholdClass.awful },
    { range: [7, 11], class: StatThresholdClass.poor },
    { range: [11, 16], class: StatThresholdClass.belowAvg },
    { range: [16, 20], class: StatThresholdClass.avg },
    { range: [20, 25], class: StatThresholdClass.aboveAvg },
    { range: [25, 32], class: StatThresholdClass.excellent },
  ];

  const threshold = thresholds.find(t => range(val, t.range[0], t.range[1]));
  return `status-indicator ${threshold?.class || ''}`;
}

function range(val: number, min: number, max: number): boolean {
  return val > min && val <= max;
}
