import { StatThresholdClass } from '@app/@shared/models/stat-threshold.model';

export function matchupThreshold(val: number): string {
  let thresholdClass = '';
  if (range(val, 0, 7)) {
    thresholdClass = StatThresholdClass.excellent;
  } else if (range(val, 7, 11)) {
    thresholdClass = StatThresholdClass.aboveAvg;
  } else if (range(val, 11, 16)) {
    thresholdClass = StatThresholdClass.avg;
  } else if (range(val, 16, 20)) {
    thresholdClass = StatThresholdClass.belowAvg;
  } else if (range(val, 20, 25)) {
    thresholdClass = StatThresholdClass.poor;
  } else if (range(val, 25, 32)) {
    thresholdClass = StatThresholdClass.awful;
  }
  return `status-indicator ${thresholdClass}`;
}

export function matchupThresholdInverse(val: number): string {
  let thresholdClass = '';
  if (range(val, 0, 7)) {
    thresholdClass = StatThresholdClass.awful;
  } else if (range(val, 7, 11)) {
    thresholdClass = StatThresholdClass.poor;
  } else if (range(val, 11, 16)) {
    thresholdClass = StatThresholdClass.belowAvg;
  } else if (range(val, 16, 20)) {
    thresholdClass = StatThresholdClass.avg;
  } else if (range(val, 20, 25)) {
    thresholdClass = StatThresholdClass.aboveAvg;
  } else if (range(val, 25, 32)) {
    thresholdClass = StatThresholdClass.excellent;
  }
  return `status-indicator ${thresholdClass}`;
}

function range(val: number, min: number, max: number): boolean {
  return val > min && val <= max;
}
