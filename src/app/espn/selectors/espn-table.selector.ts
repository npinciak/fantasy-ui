import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { MLB_STATS_MAP } from '../mlb/consts/stats.const';
import { Stat } from '../mlb/models/mlb-stats.model';
import { TableColumn, TableColumnDataType } from '../models/table.model';

export class EspnTableSelectors {
  @Selector()
  static standingsColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
      { columnDef: 'rotoStatsMap.r', headerCell: 'R', headerLabel: 'R', dataType: TableColumnDataType.Number },
      { columnDef: 'rotoStatsMap.h', headerCell: 'H', headerLabel: 'H', dataType: TableColumnDataType.Number },
      { columnDef: 'rotoStatsMap.rbi', headerCell: 'RBI', headerLabel: 'RBI', dataType: TableColumnDataType.Number },
      { columnDef: 'rotoStatsMap.hr', headerCell: 'HR', headerLabel: 'HR', dataType: TableColumnDataType.Number },
      { columnDef: 'rotoStatsMap.sb', headerCell: 'SB', headerLabel: 'SB', dataType: TableColumnDataType.Number },
    ];
  }

  @Selector()
  static rosterColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
      {
        columnDef: 'playerOwnershipChange',
        headerCell: 'playerOwnershipChange',
        headerLabel: 'Trending',
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: 'playerOwnershipPercentOwned',
        headerCell: 'playerOwnershipPercentOwned',
        headerLabel: '% Owned',
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.wOBA}`,
        headerCell: `stats.${Stat.wOBA}`,
        headerLabel: MLB_STATS_MAP[Stat.wOBA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.wRAA}`,
        headerCell: `stats.${Stat.wRAA}`,
        headerLabel: MLB_STATS_MAP[Stat.wRAA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.H}`,
        headerCell: `stats.${Stat.H}`,
        headerLabel: MLB_STATS_MAP[Stat.H].abbrev,
        dataType: TableColumnDataType.Number,
      },
    ];
  }

  @Selector()
  static freeAgentsColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
      {
        columnDef: 'playerOwnershipChange',
        headerCell: 'playerOwnershipChange',
        headerLabel: 'Trending',
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: 'playerOwnershipPercentOwned',
        headerCell: 'playerOwnershipPercentOwned',
        headerLabel: '% Owned',
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.wOBA}`,
        headerCell: `stats.${Stat.wOBA}`,
        headerLabel: MLB_STATS_MAP[Stat.wOBA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.wRAA}`,
        headerCell: `stats.${Stat.wRAA}`,
        headerLabel: MLB_STATS_MAP[Stat.wRAA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.H}`,
        headerCell: `stats.${Stat.H}`,
        headerLabel: MLB_STATS_MAP[Stat.H].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.R}`,
        headerCell: `stats.${Stat.R}`,
        headerLabel: MLB_STATS_MAP[Stat.R].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.HR}`,
        headerCell: `stats.${Stat.HR}`,
        headerLabel: MLB_STATS_MAP[Stat.HR].abbrev,
        dataType: TableColumnDataType.Number,
      },
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
