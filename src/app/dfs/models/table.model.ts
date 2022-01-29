export enum PlayerTableDataAccessor {
  Name = 'name',
}

/**
 * Base table model
 */
interface TableProperties {
  columnLabel: string | null;
  columnDef: string | null;
  cellDataAccessor: <T>(data: T[]) => PlayerTableDataAccessor | null;
  tooltip: string | null;
}

export type TableColumn = TableProperties;
