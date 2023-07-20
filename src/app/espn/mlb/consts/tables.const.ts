import { BaseballStat, MLB_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import { TableColumnDataType, transformTableColumnsToTableRows } from '@sports-ui/ui-sdk/helpers';

const statsKey = 'stats';
const leagueStandingsStatsKey = 'valuesByStat';

function transformStatToTableColumn(stat: BaseballStat, statKey: string, statsMap, dataType: TableColumnDataType, sortable = true) {
  return {
    columnDef: `${[statKey]}.${stat}`,
    headerCell: `${[statKey]}.${stat}`,
    headerLabel: statsMap[stat].abbrev,
    dataType,
    sortable,
  };
}

export const PLAYER_BATTER_STATS_COLUMNS = [
  { columnDef: 'opponent', headerCell: 'opponent', headerLabel: '', dataType: TableColumnDataType.String, sortable: false },
  { columnDef: 'date', headerCell: 'date', headerLabel: '', dataType: TableColumnDataType.String, sortable: false },
  transformStatToTableColumn(BaseballStat.H, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
  transformStatToTableColumn(BaseballStat.R, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
  transformStatToTableColumn(BaseballStat.HR, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
  transformStatToTableColumn(BaseballStat.RBI, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
  transformStatToTableColumn(BaseballStat.SB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
  transformStatToTableColumn(BaseballStat.AVG, statsKey, MLB_STATS_MAP, TableColumnDataType.Number, false),
];

export const LEAGUE_STANDINGS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.R, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AVG, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.W, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HD, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ERA, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WHIP, leagueStandingsStatsKey, MLB_STATS_MAP, TableColumnDataType.Number),
];

export const BATTER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.H, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.R, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AVG, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.OBP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.OPS, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ISO, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wOBA, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wRC, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wRAA, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
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

export const BATTER_LIVE_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.H, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.R, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AVG, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.BB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.KO, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
];

export const PITCHER_LIVE_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.IP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.W, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ERA, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WHIP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
];

export const PITCHER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.GS, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.IP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.W, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WIN_PCT, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV_PCT, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K_9, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K_BB, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.LOB_PCT, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ERA, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WHIP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.BABIP, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.fip, statsKey, MLB_STATS_MAP, TableColumnDataType.Number),
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

export const LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_ROWS = transformTableColumnsToTableRows(BATTER_STATS_COLUMNS);
export const BATTER_STATS_HEADERS = BATTER_STATS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_LIVE_ROWS = transformTableColumnsToTableRows(BATTER_LIVE_STATS_COLUMNS);
export const BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_ROWS.map(r => r.columnDef);

export const PITCHER_STATS_ROWS = transformTableColumnsToTableRows(PITCHER_STATS_COLUMNS);
export const PITCHER_STATS_HEADERS = PITCHER_STATS_ROWS.map(r => r.columnDef);

export const PITCHER_STATS_LIVE_ROWS = transformTableColumnsToTableRows(PITCHER_LIVE_STATS_COLUMNS);
export const PITCHER_STATS_LIVE_HEADERS = PITCHER_STATS_LIVE_ROWS.map(r => r.columnDef);

export const PLAYER_BATTER_STATS_ROWS = transformTableColumnsToTableRows(PLAYER_BATTER_STATS_COLUMNS);
export const PLAYER_BATTER_STATS_HEADERS = PLAYER_BATTER_STATS_ROWS.map(r => r.columnDef);
