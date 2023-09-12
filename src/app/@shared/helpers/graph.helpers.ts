import { PropertyOfType, pickData } from '@sports-ui/ui-sdk/helpers';

export function transformScatterGraphData<DataEntityType, DataLabelProperty extends PropertyOfType<DataEntityType, string | number>>({
  data,
  x,
  y,
  xAxisLabel,
  yAxisLabel,
  dataLabels,
  graphType = 'scatter',
}: {
  data: DataEntityType[];
  x: number[];
  y: number[];
  xAxisLabel: string;
  yAxisLabel: string;
  dataLabels: DataLabelProperty;
  graphType?: 'scatter';
}) {
  const text = pickData(data, d => d[dataLabels]) as string[];

  return {
    x,
    y,
    text,
    type: graphType,
    mode: 'markers',
    textfont: {
      family: 'Roboto',
    },
    textposition: 'top center',
    marker: { size: 12 },
    hovertemplate: `
    <b>${yAxisLabel}</b>: %{y}
    <br>
    <b>${xAxisLabel}</b>: %{x}
    <br>
    <b>%{text}</b>`,
  };
}

export function linearRegression(
  x: number[],
  y: number[]
): {
  slope: number;
  yIntercept: number;
  r2: number;
} {
  const dataSetLength = y.length;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  let r2: number;
  let slope: number;
  let yIntercept: number;

  for (let i = 0; i < dataSetLength; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
    sumYY += y[i] * y[i];
  }

  // eslint-disable-next-line prefer-const
  slope = calculateSlope({ sumX, sumY, sumXY, sumXX, dataSetLength });
  // eslint-disable-next-line prefer-const
  yIntercept = calculateYIntercept({ sumX, sumY, slope, dataSetLength });
  // eslint-disable-next-line prefer-const
  r2 = calculateR2({ sumX, sumY, sumXX, sumYY, sumXY, dataSetLength });

  return { slope, yIntercept, r2 };
}

function calculateSlope({ sumX, sumY, sumXY, sumXX, dataSetLength }: SlopeInputs): number {
  return (dataSetLength * sumXY - sumX * sumY) / (dataSetLength * sumXX - sumX * sumX);
}

function calculateYIntercept({ sumX, sumY, slope, dataSetLength }: YInterceptInputs): number {
  return (sumY - slope * sumX) / dataSetLength;
}

function calculateR2({ sumX, sumY, sumXX, sumYY, sumXY, dataSetLength }: R2Inputs): number {
  return Math.pow(
    (dataSetLength * sumXY - sumX * sumY) / Math.sqrt((dataSetLength * sumXX - sumX * sumX) * (dataSetLength * sumYY - sumY * sumY)),
    2
  );
}

type attributes = 'sumX' | 'sumY' | 'sumXY' | 'sumXX' | 'sumYY' | 'r2' | 'slope' | 'yIntercept' | 'dataSetLength';
type LinearRegressionAttr = { [key in attributes]: number };

type SlopeInputs = Pick<LinearRegressionAttr, 'sumX' | 'sumY' | 'sumXY' | 'sumXX' | 'dataSetLength'>;
type YInterceptInputs = Pick<LinearRegressionAttr, 'sumX' | 'sumY' | 'slope' | 'dataSetLength'>;
type R2Inputs = Pick<LinearRegressionAttr, 'sumX' | 'sumY' | 'sumXX' | 'sumXY' | 'sumYY' | 'dataSetLength'>;

export type ScatterChartDataset = any;
