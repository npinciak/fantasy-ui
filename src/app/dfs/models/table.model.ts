export enum PlayerTableDataAccessor {
  Name = 'name',
}

/**
 * Base table model
 */
interface TableProperties {
  columnLabel: string | null;
  columnDef: string | null;
  cellDataAccessor: PlayerTableDataAccessor | null;
  tooltip: string | null;
}

export type TableColumn = TableProperties;
