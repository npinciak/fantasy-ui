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

export enum TableColumnDataType {
  Number,
  String,
  Percentage,
}

export function cellDataAccessor(obj: any, path: any) {
  return path.split('.').reduce((o: any, p: any) => o && o[p], obj);
}
