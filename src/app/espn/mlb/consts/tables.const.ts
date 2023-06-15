import { TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { BaseballStat, MLB_STATS_MAP } from '@sports-ui/ui-sdk/espn';

const statsKey = 'stats';
const leagueStandingsStatsKey = 'valuesByStat';

function transformStatToTableColumn(stat: BaseballStat, statKey: string, dataType: TableColumnDataType) {
  return {
    columnDef: `${[statKey]}.${stat}`,
    headerCell: `${[statKey]}.${stat}`,
    headerLabel: MLB_STATS_MAP[stat].abbrev,
    dataType,
  };
}

export const LEAGUE_STANDINGS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.R, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AVG, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.W, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HD, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ERA, leagueStandingsStatsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WHIP, leagueStandingsStatsKey, TableColumnDataType.Number),
];

export const BATTER_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  transformStatToTableColumn(BaseballStat.H, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.PA, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.R, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.AVG, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.OBP, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.OPS, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ISO, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wOBA, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wRC, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.wRAA, statsKey, TableColumnDataType.Number),
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
  transformStatToTableColumn(BaseballStat.GS, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.IP, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.W, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WIN_PCT, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SV_PCT, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K_9, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.K_BB, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.LOB_PCT, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.ERA, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.WHIP, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.BABIP, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.fip, statsKey, TableColumnDataType.Number),
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
  transformStatToTableColumn(BaseballStat.H, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.PA, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.R, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.HR, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.RBI, statsKey, TableColumnDataType.Number),
  transformStatToTableColumn(BaseballStat.SB, statsKey, TableColumnDataType.Number),
];

export const LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const LEAGUE_STANDINGS_HEADERS = LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_ROWS = transformTableColumnsToTableRows(BATTER_STATS_COLUMNS);
export const BATTER_STATS_HEADERS = BATTER_STATS_ROWS.map(r => r.columnDef);

export const BATTER_STATS_LIVE_ROWS = transformTableColumnsToTableRows(BATTER_STATS_LIVE_COLUMNS);
export const BATTER_STATS_LIVE_HEADERS = BATTER_STATS_LIVE_ROWS.map(r => r.columnDef);

export const PITCHER_STATS_ROWS = transformTableColumnsToTableRows(PITCHER_STATS_COLUMNS);
export const PITCHER_STATS_HEADERS = PITCHER_STATS_ROWS.map(r => r.columnDef);
