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

export interface BaseTableRow {
  columnDef: string;
  cellData: (data: any) => any;
  headerLabel: string;
}
