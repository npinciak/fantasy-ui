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
  static rosterBattingColumns(): TableColumn[] {
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
  static rosterPitchingColumns(): TableColumn[] {
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
        columnDef: `stats.${Stat.ERA}`,
        headerCell: `stats.${Stat.ERA}`,
        headerLabel: MLB_STATS_MAP[Stat.ERA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.IP}`,
        headerCell: `stats.${Stat.IP}`,
        headerLabel: MLB_STATS_MAP[Stat.IP].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat['K/9']}`,
        headerCell: `stats.${Stat['K/9']}`,
        headerLabel: MLB_STATS_MAP[Stat['K/9']].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat['K/BB']}`,
        headerCell: `stats.${Stat['K/BB']}`,
        headerLabel: MLB_STATS_MAP[Stat['K/BB']].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.WHIP}`,
        headerCell: `stats.${Stat.WHIP}`,
        headerLabel: MLB_STATS_MAP[Stat.WHIP].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.fip}`,
        headerCell: `stats.${Stat.fip}`,
        headerLabel: MLB_STATS_MAP[Stat.fip].abbrev,
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

  @Selector([EspnTableSelectors.rosterBattingColumns])
  static rosterBattingTableRow(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector([EspnTableSelectors.rosterPitchingColumns])
  static rosterPitchingTableRow(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }
  rosterPitchingColumns;

  @Selector([EspnTableSelectors.freeAgentsColumns])
  static freeAgentsTableRow(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector([EspnTableSelectors.rosterBattingTableRow])
  static rosterBattingTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.rosterPitchingTableRow])
  static rosterPitchingTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.freeAgentsTableRow])
  static freeAgentsTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.standingsTableRow])
  static standingsTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
