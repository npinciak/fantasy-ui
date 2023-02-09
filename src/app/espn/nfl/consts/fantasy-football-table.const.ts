import {
  BaseTableColumn,
  getTableHeaders,
  TableColumnDataType,
  transformTableColumnsToTableRows,
} from '@app/@shared/models/table-columns.model';
import { FootballLineupSlot, FootballPosition, FootballStat, NFL_STATS_MAP } from 'sports-ui-sdk';
import { FootballTeam } from '../models/football-team.model';

const LEAGUE_STANDINGS_COLUMNS: BaseTableColumn<FootballTeam>[] = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  { columnDef: 'wins', headerCell: 'wins', headerLabel: 'W', dataType: TableColumnDataType.Number },
  { columnDef: 'losses', headerCell: 'losses', headerLabel: 'L', dataType: TableColumnDataType.Number },
  { columnDef: 'ties', headerCell: 'ties', headerLabel: 'T', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsFor', headerCell: 'pointsFor', headerLabel: 'pointsFor', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsAgainst', headerCell: 'pointsAgainst', headerLabel: 'pointsAgainst', dataType: TableColumnDataType.Number },
  { columnDef: 'percentage', headerCell: 'percentage', headerLabel: 'W %', dataType: TableColumnDataType.Number },
];

export const DEFAULT_FOOTBALL_ROSTER_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.stats.${FootballStat.GP}`,
    headerCell: `stats.stats.${FootballStat.GP}`,
    headerLabel: NFL_STATS_MAP[FootballStat.GP].abbrev,
    headerTooltip: NFL_STATS_MAP[FootballStat.GP].description,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.appliedTotal`,
    headerCell: `stats.appliedTotal`,
    headerLabel: 'Total Pts',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.appliedAverage`,
    headerCell: `stats.appliedAverage`,
    headerLabel: 'Avg P/G',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `percentChange`,
    headerCell: `percentChange`,
    headerLabel: 'Chng %',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `percentStarted`,
    headerCell: `percentStarted`,
    headerLabel: 'Start %',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `percentOwned`,
    headerCell: `percentOwned`,
    headerLabel: 'Own %',
    dataType: TableColumnDataType.Number,
  },
];

export const PASSING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.PY}`,
    headerCell: `stats.stats.${FootballStat.PY}`,
    headerLabel: NFL_STATS_MAP[FootballStat.PY].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.PTD}`,
    headerCell: `stats.stats.${FootballStat.PTD}`,
    headerLabel: 'Pass TD',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.CPCT}`,
    headerCell: `stats.stats.${FootballStat.CPCT}`,
    headerLabel: 'Complete %',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.PYPG}`,
    headerCell: `stats.stats.${FootballStat.PYPG}`,
    headerLabel: 'Pass Yds/G',
    dataType: TableColumnDataType.Number,
  },
] as const;

export const RUSHING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.RA}`,
    headerCell: `stats.stats.${FootballStat.RA}`,
    headerLabel: NFL_STATS_MAP[FootballStat.RA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RY}`,
    headerCell: `stats.stats.${FootballStat.RY}`,
    headerLabel: NFL_STATS_MAP[FootballStat.RY].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RTD}`,
    headerCell: `stats.stats.${FootballStat.RTD}`,
    headerLabel: 'Rush TDs',
    dataType: TableColumnDataType.Number,
  },
] as const;

export const RECEIVING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.REC}`,
    headerCell: `stats.stats.${FootballStat.REC}`,
    headerLabel: NFL_STATS_MAP[FootballStat.REC].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RET}`,
    headerCell: `stats.stats.${FootballStat.RET}`,
    headerLabel: 'Targets',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `extendedStats.${FootballStat.TargetsPerGame}`,
    headerCell: `extendedStats.${FootballStat.TargetsPerGame}`,
    headerLabel: 'Tar / Game',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RETD}`,
    headerCell: `stats.stats.${FootballStat.RETD}`,
    headerLabel: 'Rec TDs',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.YAC}`,
    headerCell: `stats.stats.${FootballStat.YAC}`,
    headerLabel: 'Yards After Catch',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.YPC}`,
    headerCell: `stats.stats.${FootballStat.YPC}`,
    headerLabel: 'Yards Per Catch',
    dataType: TableColumnDataType.Number,
  },
] as const;

export const DST_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.SK}`,
    headerCell: `stats.stats.${FootballStat.SK}`,
    headerLabel: NFL_STATS_MAP[FootballStat.SK].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.INT}`,
    headerCell: `stats.stats.${FootballStat.INT}`,
    headerLabel: NFL_STATS_MAP[FootballStat.INT].abbrev,
    dataType: TableColumnDataType.Number,
  },
] as const;

export const FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT = {
  [FootballLineupSlot.QB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...PASSING_ROSTER_COLUMNS],
  [FootballLineupSlot.RB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballLineupSlot.WR]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballLineupSlot.TE]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballLineupSlot.FLEX]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballLineupSlot.K]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
  [FootballLineupSlot.DST]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...DST_ROSTER_COLUMNS],
};

export const FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT = {
  [FootballLineupSlot.QB]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.QB]),
  [FootballLineupSlot.RB]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.RB]),
  [FootballLineupSlot.WR]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.WR]),
  [FootballLineupSlot.TE]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.TE]),
  [FootballLineupSlot.FLEX]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.FLEX]),
  [FootballLineupSlot.K]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.K]),
  [FootballLineupSlot.DST]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_LINEUP_SLOT[FootballLineupSlot.DST]),
};

export const FOOTBALL_ROSTER_HEADERS_BY_LINEUP_SLOT = {
  [FootballLineupSlot.QB]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.QB]),
  [FootballLineupSlot.RB]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.RB]),
  [FootballLineupSlot.WR]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.WR]),
  [FootballLineupSlot.TE]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.TE]),
  [FootballLineupSlot.FLEX]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.FLEX]),
  [FootballLineupSlot.K]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.K]),
  [FootballLineupSlot.DST]: getTableHeaders(FOOTBALL_ROSTER_ROWS_BY_LINEUP_SLOT[FootballLineupSlot.DST]),
} as const;

export const FOOTBALL_ROSTER_COLUMNS_BY_POS = {
  [FootballPosition.QB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...PASSING_ROSTER_COLUMNS],
  [FootballPosition.RB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.WR]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.TE]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.K]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
  [FootballPosition.DST]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...DST_ROSTER_COLUMNS],
};

export const FOOTBALL_ROSTER_ROWS_BY_POS = {
  [FootballPosition.QB]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.QB]),
  [FootballPosition.RB]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.RB]),
  [FootballPosition.WR]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.WR]),
  [FootballPosition.TE]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.TE]),
  [FootballPosition.K]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.K]),
  [FootballPosition.DST]: transformTableColumnsToTableRows(FOOTBALL_ROSTER_COLUMNS_BY_POS[FootballPosition.DST]),
};

export const FOOTBALL_ROSTER_HEADERS_BY_POS = {
  [FootballPosition.QB]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.QB].map(r => r.columnDef),
  [FootballPosition.RB]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.RB].map(r => r.columnDef),
  [FootballPosition.WR]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.WR].map(r => r.columnDef),
  [FootballPosition.TE]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.TE].map(r => r.columnDef),
  [FootballPosition.K]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.K].map(r => r.columnDef),
  [FootballPosition.DST]: FOOTBALL_ROSTER_ROWS_BY_POS[FootballPosition.DST].map(r => r.columnDef),
} as const;

export const FOOTBALL_LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const FOOTBALL_LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);
