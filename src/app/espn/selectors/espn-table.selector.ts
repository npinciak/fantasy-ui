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
    ];
  }

  @Selector()
  static freeAgentsColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '' },
      { columnDef: 'playerOwnershipChange', headerCell: 'playerOwnershipChange', headerLabel: 'playerOwnershipChange' },
      { columnDef: 'playerOwnershipPercentOwned', headerCell: 'playerOwnershipPercentOwned', headerLabel: 'playerOwnershipPercentOwned' },
      { columnDef: `stats.012021.ops`, headerCell: 'stats.012021.h', headerLabel: 'stats' },
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

  @Selector([EspnTableSelectors.freeAgentsColumns])
  static freeAgentsTableRow(playerCols: Partial<TableColumn>[]) {
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

  @Selector([EspnTableSelectors.freeAgentsTableRow])
  static freeAgentsTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.standingsTableRow])
  static tableTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
