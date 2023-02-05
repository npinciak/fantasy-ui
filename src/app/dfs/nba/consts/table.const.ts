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
  { columnDef: 'pown', headerCell: 'pown', headerLabel: 'pOwn', dataType: TableColumnDataType.Percentage },
  { columnDef: 'smash', headerCell: 'smash', headerLabel: 'Smash', dataType: TableColumnDataType.Percentage },
  { columnDef: 'val', headerCell: 'val', headerLabel: 'Value', dataType: TableColumnDataType.Number },
  { columnDef: 'fpts', headerCell: 'fpts', headerLabel: 'FPts', dataType: TableColumnDataType.Number },
  { columnDef: 'fptsPerK', headerCell: 'fptsPerK', headerLabel: 'FPts/$', dataType: TableColumnDataType.Number },
  { columnDef: 'ceil', headerCell: 'ceil', headerLabel: 'Ceil', dataType: TableColumnDataType.Number },
  { columnDef: 'floor', headerCell: 'floor', headerLabel: 'Floor', dataType: TableColumnDataType.Number },
];

export namespace DfsNBATableColumns {
  export const COLUMNS_BY_POS = BASE_STATS_COLUMNS;

  export const ROWS_BY_POS = transformTableColumnsToTableRows(COLUMNS_BY_POS);

  export const HEADERS_BY_POS = getTableHeaders(ROWS_BY_POS);
}
