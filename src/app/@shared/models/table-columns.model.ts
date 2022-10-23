import { cellDataAccessor } from '../helpers/utils';

export interface BaseTableColumn<T> {
  columnDef: keyof T;
  headerCell: keyof T;
  headerLabel: string;
  dataType: TableColumnDataType;
}

export interface BaseTableRow<T> {
  columnDef: keyof T;
  cellData: (data: T) => T;
  headerLabel: string;
}

/**
 * @deprecated
 */
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

export function transformTableColumnsToTableRows<T>(cols: BaseTableColumn<T>[]): BaseTableRow<T>[] {
  return cols.map(col => ({
    columnDef: col.columnDef,
    cellData: data => cellDataAccessor(data, col.columnDef),
    headerLabel: col.headerLabel,
  }));
}
