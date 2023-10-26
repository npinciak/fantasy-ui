import { cellDataAccessor } from '@sports-ui/ui-sdk/helpers';

export interface BaseTableColumn<T> {
  columnDef: keyof T;
  headerCell: keyof T;
  headerLabel: string;
  dataType: TableColumnDataType;
  sortable?: boolean;
}

export interface BaseTableRow<T> {
  columnDef: keyof T;
  cellData: (data: T) => T;
  headerLabel: string;
}

export enum TableColumnDataType {
  // eslint-disable-next-line id-blacklist
  Number,
  // eslint-disable-next-line id-blacklist
  String,
  Percentage,
}

export function transformTableColumnsToTableRows<T>(cols: BaseTableColumn<T>[]): BaseTableRow<T>[] {
  return cols.map(col => {
    const { columnDef, headerLabel, dataType, sortable } = col;
    return { columnDef, cellData: data => cellDataAccessor(data, col.columnDef), headerLabel, dataType, sortable };
  });
}

export function getTableHeaders<T>(rows: BaseTableRow<T>[]): (keyof T)[] {
  return rows.map(row => row.columnDef);
}
