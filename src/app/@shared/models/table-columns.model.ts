import { cellDataAccessor } from '@sports-ui/ui-sdk/helpers';

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
  // eslint-disable-next-line id-blacklist
  Number,
  // eslint-disable-next-line id-blacklist
  String,
  Percentage,
}

export function transformTableColumnsToTableRows<T>(cols: BaseTableColumn<T>[]): BaseTableRow<T>[] {
  return cols.map(col => {
    const { columnDef, headerLabel, dataType } = col;
    return { columnDef, cellData: data => cellDataAccessor(data, col.columnDef), headerLabel, dataType };
  });
}

export function getTableHeaders<T>(rows: BaseTableRow<T>[]): (keyof T)[] {
  return rows.map(row => row.columnDef);
}
