import {
  BaseTableColumn,
  getTableHeaders,
  TableColumnDataType,
  transformTableColumnsToTableRows,
} from '@app/@shared/models/table-columns.model';

const BASE_STATS_COLUMNS: BaseTableColumn<any>[] = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
  { columnDef: 'salary', headerCell: 'salary', headerLabel: 'Sal', dataType: TableColumnDataType.Number },
  { columnDef: 'pown', headerCell: 'pown', headerLabel: 'pOwn', dataType: TableColumnDataType.Number },
  { columnDef: 'smash', headerCell: 'smash', headerLabel: 'Smash', dataType: TableColumnDataType.Number },
  { columnDef: 'val', headerCell: 'val', headerLabel: 'Value', dataType: TableColumnDataType.Number },
  { columnDef: 'fpts', headerCell: 'fpts', headerLabel: 'FPts', dataType: TableColumnDataType.Number },
  { columnDef: 'fptsPerK', headerCell: 'fptsPerK', headerLabel: 'FPts/$', dataType: TableColumnDataType.Number },
  { columnDef: 'ceil', headerCell: 'ceil', headerLabel: 'Ceil', dataType: TableColumnDataType.Number },
  { columnDef: 'floor', headerCell: 'floor', headerLabel: 'Floor', dataType: TableColumnDataType.Number },
];

export const RECEIVER_STATS_COLUMNS = [
  { columnDef: 'tar', headerCell: 'tar', headerLabel: 'Tar', dataType: TableColumnDataType.Number },
  {
    columnDef: 'productionPremium',
    headerCell: 'productionPremium',
    headerLabel: 'productionPremium',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'matchupRtg',
    headerCell: 'matchupRtg',
    headerLabel: 'matchupRtg',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'redZoneTargetShare',
    headerCell: 'redZoneTargetShare',
    headerLabel: 'redZoneTargetShare',
    dataType: TableColumnDataType.Percentage,
  },
  {
    columnDef: 'targetShare',
    headerCell: 'targetShare',
    headerLabel: 'targetShare',
    dataType: TableColumnDataType.Percentage,
  },
  {
    columnDef: 'dominatorRating',
    headerCell: 'dominatorRating',
    headerLabel: 'dominatorRating',
    dataType: TableColumnDataType.Number,
  },
];

export const PASSING_STATS_COLUMNS = [
  {
    columnDef: 'protectionRate',
    headerCell: 'protectionRate',
    headerLabel: 'protectionRate',
    dataType: TableColumnDataType.Percentage,
  },
  {
    columnDef: 'truePasserRating',
    headerCell: 'truePasserRating',
    headerLabel: 'truePasserRating',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'pressuredCompletionPercentage',
    headerCell: 'pressuredCompletionPercentage',
    headerLabel: 'pressuredCompletionPercentage',
    dataType: TableColumnDataType.Percentage,
  },
];

export namespace DfsNflTableColumns {
  export const COLUMNS_BY_POS = {
    All: [...BASE_STATS_COLUMNS],
    QB: [...BASE_STATS_COLUMNS, ...PASSING_STATS_COLUMNS],
    RB: [...BASE_STATS_COLUMNS, ...RECEIVER_STATS_COLUMNS],
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
}
