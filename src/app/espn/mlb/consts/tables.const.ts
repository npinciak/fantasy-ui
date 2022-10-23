import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { EspnBaseballStat } from '../models/mlb-stats.model';
import { MLB_STATS_MAP } from './stats.const';

export const LEAGUE_STANDINGS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  {
    columnDef: `rotoStats.${EspnBaseballStat.R}`,
    headerCell: `rotoStats.${EspnBaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.RBI}`,
    headerCell: `rotoStats.${EspnBaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.HR}`,
    headerCell: `rotoStats.${EspnBaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.SB}`,
    headerCell: `rotoStats.${EspnBaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.AVG}`,
    headerCell: `rotoStats.${EspnBaseballStat.AVG}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.AVG].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.K}`,
    headerCell: `rotoStats.${EspnBaseballStat.K}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.K].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.W}`,
    headerCell: `rotoStats.${EspnBaseballStat.W}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.SV}`,
    headerCell: `rotoStats.${EspnBaseballStat.SV}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.ERA}`,
    headerCell: `rotoStats.${EspnBaseballStat.ERA}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.ERA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${EspnBaseballStat.WHIP}`,
    headerCell: `rotoStats.${EspnBaseballStat.WHIP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.WHIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
];

export const BATTER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${EspnBaseballStat.H}`,
    headerCell: `stats.${EspnBaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.PA}`,
    headerCell: `stats.${EspnBaseballStat.PA}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.PA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.GP}`,
    headerCell: `stats.${EspnBaseballStat.GP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.GP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.KO}`,
    headerCell: `stats.${EspnBaseballStat.KO}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.KO].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.R}`,
    headerCell: `stats.${EspnBaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.HR}`,
    headerCell: `stats.${EspnBaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.RBI}`,
    headerCell: `stats.${EspnBaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.SB}`,
    headerCell: `stats.${EspnBaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.AVG}`,
    headerCell: `stats.${EspnBaseballStat.AVG}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.AVG].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `break`,
    headerCell: `break`,
    headerLabel: '',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.OBP}`,
    headerCell: `stats.${EspnBaseballStat.OBP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.OBP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.OPS}`,
    headerCell: `stats.${EspnBaseballStat.OPS}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.OPS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.ISO}`,
    headerCell: `stats.${EspnBaseballStat.ISO}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.ISO].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.wOBA}`,
    headerCell: `stats.${EspnBaseballStat.wOBA}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.wOBA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.wRAA}`,
    headerCell: `stats.${EspnBaseballStat.wRAA}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.wRAA].abbrev,
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
    columnDef: `stats.${EspnBaseballStat.GS}`,
    headerCell: `stats.${EspnBaseballStat.GS}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.GS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.IP}`,
    headerCell: `stats.${EspnBaseballStat.IP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.IP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.W}`,
    headerCell: `stats.${EspnBaseballStat.W}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.WIN_PCT}`,
    headerCell: `stats.${EspnBaseballStat.WIN_PCT}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.WIN_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.SV}`,
    headerCell: `stats.${EspnBaseballStat.SV}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.SV_PCT}`,
    headerCell: `stats.${EspnBaseballStat.SV_PCT}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SV_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `stats.${EspnBaseballStat.K}`,
    headerCell: `stats.${EspnBaseballStat.K}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.K].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.K_9}`,
    headerCell: `stats.${EspnBaseballStat.K_9}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.K_9].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.K_BB}`,
    headerCell: `stats.${EspnBaseballStat.K_BB}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.K_BB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.LOB_PCT}`,
    headerCell: `stats.${EspnBaseballStat.LOB_PCT}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.LOB_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.ERA}`,
    headerCell: `stats.${EspnBaseballStat.ERA}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.ERA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.WHIP}`,
    headerCell: `stats.${EspnBaseballStat.WHIP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.WHIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.BABIP}`,
    headerCell: `stats.${EspnBaseballStat.BABIP}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.BABIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.fip}`,
    headerCell: `stats.${EspnBaseballStat.fip}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.fip].abbrev,
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
    columnDef: `stats.${EspnBaseballStat.H}`,
    headerCell: `stats.${EspnBaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.AB}`,
    headerCell: `stats.${EspnBaseballStat.AB}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.AB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.R}`,
    headerCell: `stats.${EspnBaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.HR}`,
    headerCell: `stats.${EspnBaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.RBI}`,
    headerCell: `stats.${EspnBaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${EspnBaseballStat.SB}`,
    headerCell: `stats.${EspnBaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[EspnBaseballStat.SB].abbrev,
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
