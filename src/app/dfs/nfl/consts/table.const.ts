import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';

export const STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: 'position',
    headerCell: 'position',
    headerLabel: 'pos',
    dataType: TableColumnDataType.String,
  },
  { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
  { columnDef: 'salary', headerCell: 'salary', headerLabel: 'salary', dataType: TableColumnDataType.Number },
  { columnDef: 'pown', headerCell: 'pown', headerLabel: 'pown', dataType: TableColumnDataType.Number },
  { columnDef: 'smash', headerCell: 'smash', headerLabel: 'smash', dataType: TableColumnDataType.Number },
  { columnDef: 'val', headerCell: 'val', headerLabel: 'val', dataType: TableColumnDataType.Number },
  { columnDef: 'fpts', headerCell: 'fpts', headerLabel: 'fpts', dataType: TableColumnDataType.Number },
  { columnDef: 'fptsPerK', headerCell: 'fptsPerK', headerLabel: 'FPts/$', dataType: TableColumnDataType.Number },
  { columnDef: 'ceil', headerCell: 'ceil', headerLabel: 'ceil', dataType: TableColumnDataType.Number },
  { columnDef: 'floor', headerCell: 'floor', headerLabel: 'floor', dataType: TableColumnDataType.Number },
  { columnDef: 'tar', headerCell: 'tar', headerLabel: 'tar', dataType: TableColumnDataType.Number },
  { columnDef: 'salaryDiff.rank', headerCell: 'salaryDiff.rank', headerLabel: 'sal rank', dataType: TableColumnDataType.Number },
];

export const STATS_ROWS = transformTableColumnsToTableRows(STATS_COLUMNS);
export const STATS_HEADERS = STATS_ROWS.map(r => r.columnDef);
