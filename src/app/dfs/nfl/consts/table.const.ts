import { getTableHeaders, TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { BaseTableColumn } from '@sports-ui/ui-sdk';
import { NflDfsPlayerTableData } from '../models/nfl-player.model';

const BASE_STATS_COLUMNS: BaseTableColumn<NflDfsPlayerTableData>[] = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
  { columnDef: 'salary', headerCell: 'salary', headerLabel: 'Sal', dataType: TableColumnDataType.Number },
  { columnDef: 'pown', headerCell: 'pown', headerLabel: 'pOwn', dataType: TableColumnDataType.Percentage },
  { columnDef: 'smash', headerCell: 'smash', headerLabel: 'Smash', dataType: TableColumnDataType.Percentage },
  { columnDef: 'value', headerCell: 'value', headerLabel: 'Value', dataType: TableColumnDataType.Number },
  { columnDef: 'fpts', headerCell: 'fpts', headerLabel: 'FPts', dataType: TableColumnDataType.Number },
  { columnDef: 'valueTargetGPPs', headerCell: 'valueTargetGPPs', headerLabel: 'GPP', dataType: TableColumnDataType.Number },
  {
    columnDef: 'targetValueDiffGPPs',
    headerCell: 'targetValueDiffGPPs',
    headerLabel: 'Gpp Diff',
    dataType: TableColumnDataType.Number,
  },
  { columnDef: 'valueTargetCash', headerCell: 'valueTargetCash', headerLabel: 'Cash', dataType: TableColumnDataType.Number },
  { columnDef: 'fptsPerDollar', headerCell: 'fptsPerDollar', headerLabel: 'FPts/$', dataType: TableColumnDataType.Number },
  { columnDef: 'ceil', headerCell: 'ceil', headerLabel: 'Ceil', dataType: TableColumnDataType.Number },
  { columnDef: 'floor', headerCell: 'floor', headerLabel: 'Floor', dataType: TableColumnDataType.Number },
];

export const RECEIVER_STATS_COLUMNS: BaseTableColumn<NflDfsPlayerTableData>[] = [
  { columnDef: 'oppPassDefRank', headerCell: 'oppPassDefRank', headerLabel: 'oppPassDefRank', dataType: TableColumnDataType.Number },
  { columnDef: 'tar', headerCell: 'tar', headerLabel: 'Tar', dataType: TableColumnDataType.Number },
];

export const RUSH_STATS_COLUMNS: BaseTableColumn<NflDfsPlayerTableData>[] = [
  { columnDef: 'oppRushDefRank', headerCell: 'oppRushDefRank', headerLabel: 'Opp Rush D', dataType: TableColumnDataType.Number },
];

export const PASSING_STATS_COLUMNS: BaseTableColumn<NflDfsPlayerTableData>[] = [
  { columnDef: 'oppPassDefRank', headerCell: 'oppPassDefRank', headerLabel: 'Opp Pass D', dataType: TableColumnDataType.Number },
];

export const COLUMNS_BY_POS = {
  All: [...BASE_STATS_COLUMNS],
  QB: [...BASE_STATS_COLUMNS, ...PASSING_STATS_COLUMNS],
  RB: [...BASE_STATS_COLUMNS, ...RUSH_STATS_COLUMNS],
  WR: [...BASE_STATS_COLUMNS, ...RECEIVER_STATS_COLUMNS],
  TE: [...BASE_STATS_COLUMNS, ...RECEIVER_STATS_COLUMNS],
  DST: [...BASE_STATS_COLUMNS],
};

export const ROWS_BY_POS = {
  All: transformTableColumnsToTableRows(COLUMNS_BY_POS['All']),
  QB: transformTableColumnsToTableRows(COLUMNS_BY_POS['QB']),
  RB: transformTableColumnsToTableRows(COLUMNS_BY_POS['RB']),
  WR: transformTableColumnsToTableRows(COLUMNS_BY_POS['WR']),
  TE: transformTableColumnsToTableRows(COLUMNS_BY_POS['TE']),
  DST: transformTableColumnsToTableRows(COLUMNS_BY_POS['DST']),
};

export const HEADERS_BY_POS = {
  All: getTableHeaders(ROWS_BY_POS['All']),
  QB: getTableHeaders(ROWS_BY_POS['QB']),
  RB: getTableHeaders(ROWS_BY_POS['RB']),
  WR: getTableHeaders(ROWS_BY_POS['WR']),
  TE: getTableHeaders(ROWS_BY_POS['TE']),
  DST: getTableHeaders(ROWS_BY_POS['DST']),
};
