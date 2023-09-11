import { FootballLineupSlot, FootballPosition, FootballStat, NFL_STATS_MAP } from '@sports-ui/ui-sdk/espn';
import {
  BaseTableColumn,
  TableColumnDataType,
  getTableHeaders,
  transformStatToTableColumn,
  transformTableColumnsToTableRows,
} from '@sports-ui/ui-sdk/helpers';
import { FootballTeam } from '../models/football-team.model';

const statsKey = 'stats';

const LEAGUE_STANDINGS_COLUMNS: BaseTableColumn<FootballTeam>[] = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  { columnDef: 'wins', headerCell: 'wins', headerLabel: 'W', dataType: TableColumnDataType.Number },
  { columnDef: 'losses', headerCell: 'losses', headerLabel: 'L', dataType: TableColumnDataType.Number },
  { columnDef: 'ties', headerCell: 'ties', headerLabel: 'T', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsFor', headerCell: 'pointsFor', headerLabel: 'Points For', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsAgainst', headerCell: 'pointsAgainst', headerLabel: 'Points Against', dataType: TableColumnDataType.Number },
];

export const DEFAULT_FOOTBALL_ROSTER_END_COLUMNS = [
  {
    columnDef: `appliedTotal`,
    headerCell: `appliedTotal`,
    headerLabel: 'Total Pts',
    dataType: TableColumnDataType.Number,
    sortable: true,
  },
  {
    columnDef: `appliedTotalCeiling`,
    headerCell: `Ceiling`,
    headerLabel: 'Ceiling',
    dataType: TableColumnDataType.Number,
    sortable: true,
  },
  {
    columnDef: `appliedAverage`,
    headerCell: `appliedAverage`,
    headerLabel: 'appliedAverage',
    dataType: TableColumnDataType.Number,
    sortable: true,
  },
];

export const DEFAULT_FOOTBALL_ROSTER_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String, sortable: true },
  transformStatToTableColumn(FootballStat.GP, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  // {
  //   columnDef: `percentChange`,
  //   headerCell: `percentChange`,
  //   headerLabel: 'Chng %',
  //   dataType: TableColumnDataType.Number,
  //   sortable: true,
  // },
  // {
  //   columnDef: `percentStarted`,
  //   headerCell: `percentStarted`,
  //   headerLabel: 'Start %',
  //   dataType: TableColumnDataType.Number,
  //   sortable: true,
  // },
  // {
  //   columnDef: `percentOwned`,
  //   headerCell: `percentOwned`,
  //   headerLabel: 'Own %',
  //   dataType: TableColumnDataType.Number,
  //   sortable: true,
  // },
];

export const PASSING_ROSTER_COLUMNS = [
  transformStatToTableColumn(FootballStat.PY, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.PTD, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.CPCT, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.PYPG, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
] as const;

export const RUSHING_ROSTER_COLUMNS = [
  transformStatToTableColumn(FootballStat.RA, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.RY, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.RTD, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
] as const;

export const RECEIVING_ROSTER_COLUMNS = [
  transformStatToTableColumn(FootballStat.REC, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  // transformStatToTableColumn(FootballStat.TargetsPerGame, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.RETD, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.YAC, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.YPC, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
] as const;

export const DST_ROSTER_COLUMNS = [
  transformStatToTableColumn(FootballStat.SK, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
  transformStatToTableColumn(FootballStat.INT, statsKey, NFL_STATS_MAP, TableColumnDataType.Number),
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
  [FootballPosition.QB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...PASSING_ROSTER_COLUMNS, ...DEFAULT_FOOTBALL_ROSTER_END_COLUMNS],
  [FootballPosition.RB]: [
    ...DEFAULT_FOOTBALL_ROSTER_COLUMNS,
    ...RUSHING_ROSTER_COLUMNS,
    ...RECEIVING_ROSTER_COLUMNS,
    ...DEFAULT_FOOTBALL_ROSTER_END_COLUMNS,
  ],
  [FootballPosition.WR]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS, ...DEFAULT_FOOTBALL_ROSTER_END_COLUMNS],
  [FootballPosition.TE]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS, ...DEFAULT_FOOTBALL_ROSTER_END_COLUMNS],
  [FootballPosition.K]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
  [FootballPosition.DST]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...DST_ROSTER_COLUMNS, ...DEFAULT_FOOTBALL_ROSTER_END_COLUMNS],
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
