import { ChartConfiguration, ChartDataset } from 'chart.js';
import { MOCK_NFL_PLAYER_TABLE_ROW } from '../../models/nfl-player.model.mock';

export const MOCK_CHART_DATA_SET: ChartDataset = {
  data: [MOCK_NFL_PLAYER_TABLE_ROW.fpts],
  label: '',
  borderColor: '#000',
  backgroundColor: '#000',
  type: 'bar',
  order: 0,
};

export const MOCK_CHART_CONFIGURATION: ChartConfiguration['data'] = {
  labels: [MOCK_NFL_PLAYER_TABLE_ROW.name],
  datasets: [MOCK_CHART_DATA_SET],
};
