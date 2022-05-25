import { cellDataAccessor } from '@app/@shared/helpers/utils';

export type TableColumn = {
  columnDef: string;
  headerCell: string;
  headerLabel: string;
  dataType: TableColumnDataType;
};

export enum TableColumnDataType {
  Number,
  String,
}

export interface BaseTableRow<T> {
  columnDef: string;
  cellData: (data: T) => T;
  headerLabel: string;
}

export function transformTableColumnsToTableRows(cols: TableColumn[]): BaseTableRow<TableColumn>[] {
  return cols.map(col => ({
    columnDef: col.columnDef,
    cellData: data => cellDataAccessor(data, col.columnDef),
    headerLabel: col.headerLabel,
  }));
}
