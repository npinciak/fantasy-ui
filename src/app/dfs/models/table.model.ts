export enum PlayerTableDataAccessor {
  Name = 'name',
}

/**
 * @deprecated
 */
interface TableProperties {
  columnLabel: string | null;
  columnDef: string | null;
  cellDataAccessor: <T>(data: T[]) => PlayerTableDataAccessor | null;
  tooltip: string | null;
}
/**
 * @deprecated
 */
export type TableColumn = TableProperties;
