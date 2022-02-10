import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { TableColumn } from '../models/table.model';

export class EspnTableSelectors {
  @Selector()
  static standingsColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Team' },
      { columnDef: 'rotoStatsMap.r', headerCell: 'R', headerLabel: 'R' },
      { columnDef: 'rotoStatsMap.h', headerCell: 'H', headerLabel: 'H' },
      { columnDef: 'rotoStatsMap.rbi', headerCell: 'RBI', headerLabel: 'RBI' },
      { columnDef: 'rotoStatsMap.hr', headerCell: 'HR', headerLabel: 'HR' },
      { columnDef: 'rotoStatsMap.sb', headerCell: 'SB', headerLabel: 'SB' },
    ];
  }

  @Selector()
  static rosterColumns(): TableColumn[] {
    return [
      { columnDef: 'lineupSlot', headerCell: 'lineupSlot', headerLabel: '' },
      { columnDef: 'name', headerCell: 'name', headerLabel: '' },
      { columnDef: 'position', headerCell: 'position', headerLabel: 'Pos' },
      { columnDef: 'team', headerCell: 'team', headerLabel: 'Team' },
    ];
  }

  @Selector([EspnTableSelectors.standingsColumns])
  static standingsTableRow(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector([EspnTableSelectors.rosterColumns])
  static rosterTableRow(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector([EspnTableSelectors.rosterTableRow])
  static rosterTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.standingsTableRow])
  static tableTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
