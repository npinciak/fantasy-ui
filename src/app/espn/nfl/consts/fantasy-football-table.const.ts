import {
  BaseTableColumn,
  getTableHeaders,
  TableColumnDataType,
  transformTableColumnsToTableRows,
} from '@app/@shared/models/table-columns.model';
import { FootballLineupSlot } from '../models/football-lineup.model';
import { FootballPosition } from '../models/football-position.model';
import { FootballStat } from '../models/football-stats.model';
import { FootballTeam } from '../models/football-team.model';
import { FOOTBALL_STATS_MAP } from './stats.const';

const LEAGUE_STANDINGS_COLUMNS: BaseTableColumn<FootballTeam>[] = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  { columnDef: 'wins', headerCell: 'wins', headerLabel: 'W', dataType: TableColumnDataType.Number },
  { columnDef: 'losses', headerCell: 'losses', headerLabel: 'L', dataType: TableColumnDataType.Number },
  { columnDef: 'ties', headerCell: 'ties', headerLabel: 'T', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsScored', headerCell: 'pointsScored', headerLabel: 'pointsScored', dataType: TableColumnDataType.Number },
  { columnDef: 'pointsAgainst', headerCell: 'pointsAgainst', headerLabel: 'pointsAgainst', dataType: TableColumnDataType.Number },
  { columnDef: 'winPct', headerCell: 'winPct', headerLabel: 'W %', dataType: TableColumnDataType.Number },
];

export const DEFAULT_FOOTBALL_ROSTER_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
  {
    columnDef: `stats.stats.${FootballStat.GP}`,
    headerCell: `stats.stats.${FootballStat.GP}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.GP].abbrev,
    headerTooltip: FOOTBALL_STATS_MAP[FootballStat.GP].description,
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
    headerLabel: 'percentChange',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `percentOwned`,
    headerCell: `percentOwned`,
    headerLabel: 'percentOwned',
    dataType: TableColumnDataType.Number,
  },
];

export const PASSING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.PY}`,
    headerCell: `stats.stats.${FootballStat.PY}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.PY].abbrev,
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
];

export const RUSHING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.RA}`,
    headerCell: `stats.stats.${FootballStat.RA}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.RA].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RY}`,
    headerCell: `stats.stats.${FootballStat.RY}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.RY].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.RTD}`,
    headerCell: `stats.stats.${FootballStat.RTD}`,
    headerLabel: 'Rush TDs',
    dataType: TableColumnDataType.Number,
  },
];

export const RECEIVING_ROSTER_COLUMNS = [
  {
    columnDef: `stats.stats.${FootballStat.REC}`,
    headerCell: `stats.stats.${FootballStat.REC}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.REC].abbrev,
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
];

export namespace FootballTableColumns {
  export const RosterColumnsByLineupSlot = {
    [FootballLineupSlot.QB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...PASSING_ROSTER_COLUMNS],
    [FootballLineupSlot.RB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
    [FootballLineupSlot.WR]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
    [FootballLineupSlot.TE]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
    [FootballLineupSlot.FLEX]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
    [FootballLineupSlot.K]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
    [FootballLineupSlot.DST]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
  };

  export const RosterRowsByLineupSlot = {
    [FootballLineupSlot.QB]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.QB]),
    [FootballLineupSlot.RB]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.RB]),
    [FootballLineupSlot.WR]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.WR]),
    [FootballLineupSlot.TE]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.TE]),
    [FootballLineupSlot.FLEX]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.FLEX]),
    [FootballLineupSlot.K]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.K]),
    [FootballLineupSlot.DST]: transformTableColumnsToTableRows(RosterColumnsByLineupSlot[FootballLineupSlot.DST]),
  };

  export const RosterHeadersByLineupSlot = {
    [FootballLineupSlot.QB]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.QB]),
    [FootballLineupSlot.RB]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.RB]),
    [FootballLineupSlot.WR]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.WR]),
    [FootballLineupSlot.TE]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.TE]),
    [FootballLineupSlot.FLEX]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.FLEX]),
    [FootballLineupSlot.K]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.K]),
    [FootballLineupSlot.DST]: getTableHeaders(RosterRowsByLineupSlot[FootballLineupSlot.DST]),
  };
}

export const FOOTBALL_ROSTER_COLUMNS_BY_POS = {
  [FootballPosition.QB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...PASSING_ROSTER_COLUMNS],
  [FootballPosition.RB]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RUSHING_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.WR]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.TE]: [...DEFAULT_FOOTBALL_ROSTER_COLUMNS, ...RECEIVING_ROSTER_COLUMNS],
  [FootballPosition.K]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
  [FootballPosition.DST]: DEFAULT_FOOTBALL_ROSTER_COLUMNS,
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
};

export const FOOTBALL_LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const FOOTBALL_LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);
