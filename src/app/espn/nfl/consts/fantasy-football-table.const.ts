import { BaseTableColumn, TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
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
  { columnDef: 'predictedWinPct', headerCell: 'predictedWinPct', headerLabel: 'PredWin %', dataType: TableColumnDataType.Number },
  {
    columnDef: 'predictedWinPctDiff',
    headerCell: 'predictedWinPctDiff',
    headerLabel: 'predictedWinPctDiff',
    dataType: TableColumnDataType.Number,
  },
  { columnDef: 'predictedWins', headerCell: 'predictedWins', headerLabel: 'predictedWins', dataType: TableColumnDataType.Number },
  {
    columnDef: 'scoringRatio',
    headerCell: 'scoringRatio',
    headerLabel: 'scoringRatio',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'absoluteError',
    headerCell: 'absoluteError',
    headerLabel: 'absoluteError',
    dataType: TableColumnDataType.Number,
  },
];

export const ROSTER_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: '', dataType: TableColumnDataType.String },
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
    columnDef: `stats.stats.${FootballStat.GP}`,
    headerCell: `stats.stats.${FootballStat.GP}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.GP].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.PY}`,
    headerCell: `stats.stats.${FootballStat.PY}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.PY].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.PTD}`,
    headerCell: `stats.stats.${FootballStat.PTD}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.PTD].abbrev,
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: `stats.stats.${FootballStat.CPCT}`,
    headerCell: `stats.stats.${FootballStat.CPCT}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.PTD].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `stats.stats.${FootballStat.PYPG}`,
    headerCell: `stats.stats.${FootballStat.PYPG}`,
    headerLabel: FOOTBALL_STATS_MAP[FootballStat.PYPG].abbrev,
    dataType: TableColumnDataType.Number,
  },

  {
    columnDef: `stats.stats.${FootballStat.RET}`,
    headerCell: `stats.stats.${FootballStat.RET}`,
    headerLabel: 'Targets',
    dataType: TableColumnDataType.Number,
  },
];

export const FOOTBALL_LEAGUE_STANDINGS_ROWS = transformTableColumnsToTableRows(LEAGUE_STANDINGS_COLUMNS);
export const FOOTBALL_LEAGUE_STANDINGS_HEADERS = FOOTBALL_LEAGUE_STANDINGS_ROWS.map(r => r.columnDef);

export const FOOTBALL_ROSTER_ROWS = transformTableColumnsToTableRows(ROSTER_COLUMNS);
export const FOOTBALL_ROSTER_HEADERS = FOOTBALL_ROSTER_ROWS.map(r => r.columnDef);
