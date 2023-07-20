import { BaseballStat } from '../../espn/baseball/stats/mlb-stats.m';
import { BaseTableColumn, BaseTableRow, TableColumnDataType, cellDataAccessor } from './table.model';

export function transformStatToTableColumn(
  stat: BaseballStat,
  statKey: string,
  statsMap: any,
  dataType: TableColumnDataType,
  sortable = true
) {
  return {
    columnDef: `${[statKey]}.${stat}`,
    headerCell: `${[statKey]}.${stat}`,
    headerLabel: statsMap[stat].abbrev,
    dataType,
    sortable,
  };
}

export function transformTableColumnsToTableRows<T>(cols: BaseTableColumn<T>[]): BaseTableRow<T>[] {
  return cols.map(col => {
    const { columnDef, headerLabel, dataType, sortable } = col;
    return { columnDef, cellData: data => cellDataAccessor(data, col.columnDef), headerLabel, dataType, sortable: sortable ?? true };
  });
}

export function getTableHeaders<T>(rows: BaseTableRow<T>[]): (keyof T)[] {
  return rows.map(row => row.columnDef);
}
