import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { Stat } from '../models/mlb-stats.model';
import { MLB_STATS_MAP } from './stats.const';

export const LEAGUE_STANDINGS_COLUMNS = [
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

export const BATTER_STATS_COLUMNS = [
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
    columnDef: `stats.${Stat.GP}`,
    headerCell: `stats.${Stat.GP}`,
    headerLabel: MLB_STATS_MAP[Stat.GP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.KO}`,
    headerCell: `stats.${Stat.KO}`,
    headerLabel: MLB_STATS_MAP[Stat.KO].abbrev,
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
    columnDef: `break`,
    headerCell: `break`,
    headerLabel: '',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.OBP}`,
    headerCell: `stats.${Stat.OBP}`,
    headerLabel: MLB_STATS_MAP[Stat.OBP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.OPS}`,
    headerCell: `stats.${Stat.OPS}`,
    headerLabel: MLB_STATS_MAP[Stat.OPS].abbrev,
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

export const PITCHER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${Stat.GS}`,
    headerCell: `stats.${Stat.GS}`,
    headerLabel: MLB_STATS_MAP[Stat.GS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.IP}`,
    headerCell: `stats.${Stat.IP}`,
    headerLabel: MLB_STATS_MAP[Stat.IP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.W}`,
    headerCell: `stats.${Stat.W}`,
    headerLabel: MLB_STATS_MAP[Stat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.WIN_PCT}`,
    headerCell: `stats.${Stat.WIN_PCT}`,
    headerLabel: MLB_STATS_MAP[Stat.WIN_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.SV}`,
    headerCell: `stats.${Stat.SV}`,
    headerLabel: MLB_STATS_MAP[Stat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.SV_PCT}`,
    headerCell: `stats.${Stat.SV_PCT}`,
    headerLabel: MLB_STATS_MAP[Stat.SV_PCT].abbrev,
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
    columnDef: `stats.${Stat.LOB_PCT}`,
    headerCell: `stats.${Stat.LOB_PCT}`,
    headerLabel: MLB_STATS_MAP[Stat.LOB_PCT].abbrev,
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
    columnDef: `stats.${Stat.BABIP}`,
    headerCell: `stats.${Stat.BABIP}`,
    headerLabel: MLB_STATS_MAP[Stat.BABIP].abbrev,
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

export const BATTER_STATS_LIVE_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${Stat.H}`,
    headerCell: `stats.${Stat.H}`,
    headerLabel: MLB_STATS_MAP[Stat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${Stat.AB}`,
    headerCell: `stats.${Stat.AB}`,
    headerLabel: MLB_STATS_MAP[Stat.AB].abbrev,
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

export const LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_ROWS = transformTableColumnsToTableRows(BATTER_STATS_COLUMNS);
export const BATTER_STATS_HEADERS = BATTER_STATS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_LIVE_ROWS = transformTableColumnsToTableRows(BATTER_STATS_LIVE_COLUMNS);
export const BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_ROWS.map(r => r.columnDef);

export const PITCHER_STATS_ROWS = transformTableColumnsToTableRows(PITCHER_STATS_COLUMNS);
export const PITCHER_STATS_HEADERS = PITCHER_STATS_ROWS.map(r => r.columnDef);
