import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { BaseballStat, MLB_STATS_MAP } from 'sports-ui-sdk';

export const LEAGUE_STANDINGS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  {
    columnDef: `rotoStats.${BaseballStat.R}`,
    headerCell: `rotoStats.${BaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.RBI}`,
    headerCell: `rotoStats.${BaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.HR}`,
    headerCell: `rotoStats.${BaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.SB}`,
    headerCell: `rotoStats.${BaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.AVG}`,
    headerCell: `rotoStats.${BaseballStat.AVG}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.AVG].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.K}`,
    headerCell: `rotoStats.${BaseballStat.K}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.W}`,
    headerCell: `rotoStats.${BaseballStat.W}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.SV}`,
    headerCell: `rotoStats.${BaseballStat.SV}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.ERA}`,
    headerCell: `rotoStats.${BaseballStat.ERA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.ERA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `rotoStats.${BaseballStat.WHIP}`,
    headerCell: `rotoStats.${BaseballStat.WHIP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.WHIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
];

export const BATTER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${BaseballStat.H}`,
    headerCell: `stats.${BaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.PA}`,
    headerCell: `stats.${BaseballStat.PA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.PA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.GP}`,
    headerCell: `stats.${BaseballStat.GP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.GP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.KO}`,
    headerCell: `stats.${BaseballStat.KO}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.KO].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.R}`,
    headerCell: `stats.${BaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.HR}`,
    headerCell: `stats.${BaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.RBI}`,
    headerCell: `stats.${BaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.SB}`,
    headerCell: `stats.${BaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.AVG}`,
    headerCell: `stats.${BaseballStat.AVG}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.AVG].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `break`,
    headerCell: `break`,
    headerLabel: '',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.OBP}`,
    headerCell: `stats.${BaseballStat.OBP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.OBP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.OPS}`,
    headerCell: `stats.${BaseballStat.OPS}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.OPS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.ISO}`,
    headerCell: `stats.${BaseballStat.ISO}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.ISO].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.wOBA}`,
    headerCell: `stats.${BaseballStat.wOBA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.wOBA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.wRAA}`,
    headerCell: `stats.${BaseballStat.wRAA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.wRAA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'percentChange',
    headerCell: 'percentChange',
    headerLabel: 'Trending',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'percentOwned',
    headerCell: 'percentOwned',
    headerLabel: '% Owned',
    dataType: TableColumnDataType.Number,
  },
];

export const PITCHER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${BaseballStat.GS}`,
    headerCell: `stats.${BaseballStat.GS}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.GS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.IP}`,
    headerCell: `stats.${BaseballStat.IP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.IP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.W}`,
    headerCell: `stats.${BaseballStat.W}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.WIN_PCT}`,
    headerCell: `stats.${BaseballStat.WIN_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.WIN_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.SV}`,
    headerCell: `stats.${BaseballStat.SV}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.SV_PCT}`,
    headerCell: `stats.${BaseballStat.SV_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SV_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `stats.${BaseballStat.K}`,
    headerCell: `stats.${BaseballStat.K}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.K_9}`,
    headerCell: `stats.${BaseballStat.K_9}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K_9].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.K_BB}`,
    headerCell: `stats.${BaseballStat.K_BB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K_BB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.LOB_PCT}`,
    headerCell: `stats.${BaseballStat.LOB_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.LOB_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.ERA}`,
    headerCell: `stats.${BaseballStat.ERA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.ERA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.WHIP}`,
    headerCell: `stats.${BaseballStat.WHIP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.WHIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.BABIP}`,
    headerCell: `stats.${BaseballStat.BABIP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.BABIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.fip}`,
    headerCell: `stats.${BaseballStat.fip}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.fip].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'percentChange',
    headerCell: 'percentChange',
    headerLabel: 'Trending',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'percentOwned',
    headerCell: 'percentOwned',
    headerLabel: '% Owned',
    dataType: TableColumnDataType.Number,
  },
];

export const BATTER_STATS_LIVE_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.${BaseballStat.H}`,
    headerCell: `stats.${BaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.AB}`,
    headerCell: `stats.${BaseballStat.AB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.AB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.R}`,
    headerCell: `stats.${BaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.HR}`,
    headerCell: `stats.${BaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.RBI}`,
    headerCell: `stats.${BaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.${BaseballStat.SB}`,
    headerCell: `stats.${BaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SB].abbrev,
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
