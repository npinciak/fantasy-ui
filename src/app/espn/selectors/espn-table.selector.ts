import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { MLB_STATS_MAP } from '../mlb/consts/stats.const';
import { Stat } from '../mlb/models/mlb-stats.model';
import { BaseTableRow, TableColumn, TableColumnDataType } from '../models/table.model';

export class EspnTableSelectors {
  static transformColumnsToRows(cols: Partial<TableColumn>[]): BaseTableRow[] {
    return cols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector()
  static selectStandingsColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
      {
        columnDef: `rotoStats.${Stat.R}`,
        headerCell: `rotoStats.${Stat.R}`,
        headerLabel: MLB_STATS_MAP[Stat.R].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.RBI}`,
        headerCell: `rotoStats.${Stat.RBI}`,
        headerLabel: MLB_STATS_MAP[Stat.RBI].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.HR}`,
        headerCell: `rotoStats.${Stat.HR}`,
        headerLabel: MLB_STATS_MAP[Stat.HR].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.SB}`,
        headerCell: `rotoStats.${Stat.SB}`,
        headerLabel: MLB_STATS_MAP[Stat.SB].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.AVG}`,
        headerCell: `rotoStats.${Stat.AVG}`,
        headerLabel: MLB_STATS_MAP[Stat.AVG].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.K}`,
        headerCell: `rotoStats.${Stat.K}`,
        headerLabel: MLB_STATS_MAP[Stat.K].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.W}`,
        headerCell: `rotoStats.${Stat.W}`,
        headerLabel: MLB_STATS_MAP[Stat.W].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.SV}`,
        headerCell: `rotoStats.${Stat.SV}`,
        headerLabel: MLB_STATS_MAP[Stat.SV].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.ERA}`,
        headerCell: `rotoStats.${Stat.ERA}`,
        headerLabel: MLB_STATS_MAP[Stat.ERA].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `rotoStats.${Stat.WHIP}`,
        headerCell: `rotoStats.${Stat.WHIP}`,
        headerLabel: MLB_STATS_MAP[Stat.WHIP].abbrev,
        dataType: TableColumnDataType.Number,
      },
    ];
  }

  @Selector()
  static selectBatterColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
      {
        columnDef: `stats.${Stat.H}`,
        headerCell: `stats.${Stat.H}`,
        headerLabel: MLB_STATS_MAP[Stat.H].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.PA}`,
        headerCell: `stats.${Stat.PA}`,
        headerLabel: MLB_STATS_MAP[Stat.PA].abbrev,
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
      {
        columnDef: `stats.${Stat.RBI}`,
        headerCell: `stats.${Stat.RBI}`,
        headerLabel: MLB_STATS_MAP[Stat.RBI].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.SB}`,
        headerCell: `stats.${Stat.SB}`,
        headerLabel: MLB_STATS_MAP[Stat.SB].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.AVG}`,
        headerCell: `stats.${Stat.AVG}`,
        headerLabel: MLB_STATS_MAP[Stat.AVG].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.ISO}`,
        headerCell: `stats.${Stat.ISO}`,
        headerLabel: MLB_STATS_MAP[Stat.ISO].abbrev,
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
    ];
  }

  @Selector()
  static selectPitcherColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
      {
        columnDef: `stats.${Stat.W}`,
        headerCell: `stats.${Stat.W}`,
        headerLabel: MLB_STATS_MAP[Stat.W].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.IP}`,
        headerCell: `stats.${Stat.IP}`,
        headerLabel: MLB_STATS_MAP[Stat.IP].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.K}`,
        headerCell: `stats.${Stat.K}`,
        headerLabel: MLB_STATS_MAP[Stat.K].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.K_9}`,
        headerCell: `stats.${Stat.K_9}`,
        headerLabel: MLB_STATS_MAP[Stat.K_9].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.K_BB}`,
        headerCell: `stats.${Stat.K_BB}`,
        headerLabel: MLB_STATS_MAP[Stat.K_BB].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.ERA}`,
        headerCell: `stats.${Stat.ERA}`,
        headerLabel: MLB_STATS_MAP[Stat.ERA].abbrev,
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
    ];
  }

  @Selector()
  static getLiveBatterTableColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
      {
        columnDef: `stats.${Stat.H}`,
        headerCell: `stats.${Stat.H}`,
        headerLabel: MLB_STATS_MAP[Stat.H].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.PA}`,
        headerCell: `stats.${Stat.PA}`,
        headerLabel: MLB_STATS_MAP[Stat.PA].abbrev,
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
      {
        columnDef: `stats.${Stat.RBI}`,
        headerCell: `stats.${Stat.RBI}`,
        headerLabel: MLB_STATS_MAP[Stat.RBI].abbrev,
        dataType: TableColumnDataType.Number,
      },
      {
        columnDef: `stats.${Stat.SB}`,
        headerCell: `stats.${Stat.SB}`,
        headerLabel: MLB_STATS_MAP[Stat.SB].abbrev,
        dataType: TableColumnDataType.Number,
      },
    ];
  }

  @Selector([EspnTableSelectors.selectStandingsColumns])
  static selectStandingsTableRow(playerCols: Partial<TableColumn>[]): BaseTableRow[] {
    return EspnTableSelectors.transformColumnsToRows(playerCols);
  }

  @Selector([EspnTableSelectors.selectBatterColumns])
  static selectBatterTableRow(playerCols: Partial<TableColumn>[]): BaseTableRow[] {
    return EspnTableSelectors.transformColumnsToRows(playerCols);
  }

  @Selector([EspnTableSelectors.getLiveBatterTableColumns])
  static getLiveBatterTableRow(playerCols: Partial<TableColumn>[]): BaseTableRow[] {
    return EspnTableSelectors.transformColumnsToRows(playerCols);
  }

  @Selector([EspnTableSelectors.selectPitcherColumns])
  static selectPitcherTableRow(playerCols: Partial<TableColumn>[]): BaseTableRow[] {
    return EspnTableSelectors.transformColumnsToRows(playerCols);
  }

  @Selector([EspnTableSelectors.selectBatterTableRow])
  static selectBatterTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.getLiveBatterTableRow])
  static getLiveBatterTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.selectPitcherTableRow])
  static selectPitcherTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([EspnTableSelectors.selectStandingsTableRow])
  static selectStandingsTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
