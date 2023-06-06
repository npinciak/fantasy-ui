import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { BaseballStat, MLB_STATS_MAP } from '@sports-ui/ui-sdk/espn';

const statsKey = 'stats';

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
    columnDef: `rotoStats.${BaseballStat.HD}`,
    headerCell: `rotoStats.${BaseballStat.HD}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HD].abbrev,
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
    columnDef: `${[statsKey]}.${BaseballStat.H}`,
    headerCell: `${[statsKey]}.${BaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.PA}`,
    headerCell: `${[statsKey]}.${BaseballStat.PA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.PA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.R}`,
    headerCell: `${[statsKey]}.${BaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.HR}`,
    headerCell: `${[statsKey]}.${BaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.RBI}`,
    headerCell: `${[statsKey]}.${BaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.SB}`,
    headerCell: `${[statsKey]}.${BaseballStat.SB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.AVG}`,
    headerCell: `${[statsKey]}.${BaseballStat.AVG}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.AVG].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `${[statsKey]}.${BaseballStat.OBP}`,
    headerCell: `${[statsKey]}.${BaseballStat.OBP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.OBP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.OPS}`,
    headerCell: `${[statsKey]}.${BaseballStat.OPS}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.OPS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.ISO}`,
    headerCell: `${[statsKey]}.${BaseballStat.ISO}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.ISO].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.wOBA}`,
    headerCell: `${[statsKey]}.${BaseballStat.wOBA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.wOBA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.wRC}`,
    headerCell: `${[statsKey]}.${BaseballStat.wRC}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.wRC].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.wRAA}`,
    headerCell: `${[statsKey]}.${BaseballStat.wRAA}`,
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
    columnDef: 'percentStarted',
    headerCell: 'percentStarted',
    headerLabel: '% Started',
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
    columnDef: `${[statsKey]}.${BaseballStat.GS}`,
    headerCell: `${[statsKey]}.${BaseballStat.GS}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.GS].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.IP}`,
    headerCell: `${[statsKey]}.${BaseballStat.IP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.IP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.W}`,
    headerCell: `${[statsKey]}.${BaseballStat.W}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.W].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.WIN_PCT}`,
    headerCell: `${[statsKey]}.${BaseballStat.WIN_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.WIN_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.SV}`,
    headerCell: `${[statsKey]}.${BaseballStat.SV}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SV].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.SV_PCT}`,
    headerCell: `${[statsKey]}.${BaseballStat.SV_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.SV_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `${[statsKey]}.${BaseballStat.K}`,
    headerCell: `${[statsKey]}.${BaseballStat.K}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.K_9}`,
    headerCell: `${[statsKey]}.${BaseballStat.K_9}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K_9].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.K_BB}`,
    headerCell: `${[statsKey]}.${BaseballStat.K_BB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.K_BB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.LOB_PCT}`,
    headerCell: `${[statsKey]}.${BaseballStat.LOB_PCT}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.LOB_PCT].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.ERA}`,
    headerCell: `${[statsKey]}.${BaseballStat.ERA}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.ERA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.WHIP}`,
    headerCell: `${[statsKey]}.${BaseballStat.WHIP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.WHIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.BABIP}`,
    headerCell: `${[statsKey]}.${BaseballStat.BABIP}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.BABIP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.fip}`,
    headerCell: `${[statsKey]}.${BaseballStat.fip}`,
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
    columnDef: 'percentStarted',
    headerCell: 'percentStarted',
    headerLabel: '% Started',
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
    columnDef: `${[statsKey]}.${BaseballStat.H}`,
    headerCell: `${[statsKey]}.${BaseballStat.H}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.H].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.AB}`,
    headerCell: `${[statsKey]}.${BaseballStat.AB}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.AB].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.R}`,
    headerCell: `${[statsKey]}.${BaseballStat.R}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.R].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.HR}`,
    headerCell: `${[statsKey]}.${BaseballStat.HR}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.HR].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.RBI}`,
    headerCell: `${[statsKey]}.${BaseballStat.RBI}`,
    headerLabel: MLB_STATS_MAP[BaseballStat.RBI].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `${[statsKey]}.${BaseballStat.SB}`,
    headerCell: `${[statsKey]}.${BaseballStat.SB}`,
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
