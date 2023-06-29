import { BaseballStat } from '../../espn/baseball/stats/mlb-stats.m';
import { BaseTableColumn, BaseTableRow, TableColumnDataType, cellDataAccessor } from './table.model';

export function transformStatToTableColumn(stat: BaseballStat, statKey: string, statsMap: any, dataType: TableColumnDataType) {
  return {
    columnDef: `${[statKey]}.${stat}`,
    headerCell: `${[statKey]}.${stat}`,
    headerLabel: statsMap[stat].abbrev,
    dataType,
  };
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
