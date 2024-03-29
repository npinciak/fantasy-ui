import { getTableHeaders, TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';

export const BASE_STATS_COLUMNS = [
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
  { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
  { columnDef: 'salary', headerCell: 'salary', headerLabel: 'salary', dataType: TableColumnDataType.Number },
];

export const BATTER_PLATEIQ_COLUMNS = [
  { columnDef: 'smash_pct', headerCell: 'smash_pct', headerLabel: 'Smash Pct', dataType: TableColumnDataType.Number },

  // { columnDef: 'stack_diff', headerCell: 'stack_diff', headerLabel: 'Stack Diff', dataType: TableColumnDataType.Number },
  // { columnDef: 'stack_field', headerCell: 'stack_field', headerLabel: 'Stack Field', dataType: TableColumnDataType.Number },
  // { columnDef: 'stack_leverage', headerCell: 'stack_leverage', headerLabel: 'Stack Lev.', dataType: TableColumnDataType.Number },
  { columnDef: 'salaryDiff.rank', headerCell: 'salaryDiff.rank', headerLabel: 'salary rnk', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.factors.positiveCt', headerCell: '', headerLabel: 'positiveCt', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.factors.negativeCt', headerCell: '', headerLabel: 'negativeCt', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.overall', headerCell: '', headerLabel: 'overall', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.contact', headerCell: '', headerLabel: 'contact', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.context', headerCell: '', headerLabel: 'context', dataType: TableColumnDataType.Number },
  // { columnDef: 'plateIq.score.pitchTypes', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.production', headerCell: '', headerLabel: 'production', dataType: TableColumnDataType.Number },
  {
    columnDef: 'plateIq.score.plateDiscipline',
    headerCell: 'plateIq.score.plateDiscipline',
    headerLabel: 'Plate Discipline',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'plateIq.score.recentSkill',
    headerCell: 'plateIq.score.recentSkill',
    headerLabel: 'Recent Skill',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'plateIq.score.stolenBase',
    headerCell: 'plateIq.score.stolenBase',
    headerLabel: 'SB',
    dataType: TableColumnDataType.Number,
  },
  {
    columnDef: 'plateIq.score.sbFactor',
    headerCell: 'plateIq.score.sbFactor',
    headerLabel: 'SB Factor',
    dataType: TableColumnDataType.Number,
  },
  // { columnDef: `stats.${statLine}.muwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.ab`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.avg`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.ops`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.babip`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.xwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number }
];

export const PITCHER_STATS_COLUMNS = [
  // { columnDef: 'smash_pct', headerCell: 'smash_pct', headerLabel: 'Smash Pct', dataType: TableColumnDataType.Number },
  // { columnDef: 'stack_diff', headerCell: 'stack_diff', headerLabel: 'Stack Diff', dataType: TableColumnDataType.Number },
  // { columnDef: 'stack_field', headerCell: 'stack_field', headerLabel: 'Stack Field', dataType: TableColumnDataType.Number },
  // { columnDef: 'stack_leverage', headerCell: 'stack_leverage', headerLabel: 'Stack Lev.', dataType: TableColumnDataType.Number },
  { columnDef: 'salaryDiff.rank', headerCell: 'salaryDiff.rank', headerLabel: 'salary rnk', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.overall', headerCell: '', headerLabel: 'overall', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.contact', headerCell: '', headerLabel: 'contact', dataType: TableColumnDataType.Number },
  { columnDef: 'plateIq.score.pitchTypes', headerCell: '', headerLabel: 'PitchTypes', dataType: TableColumnDataType.Number },
  {
    columnDef: 'plateIq.score.recentSkill',
    headerCell: 'plateIq.score.recentSkill',
    headerLabel: 'Recent Skill',
    dataType: TableColumnDataType.Number,
  },

  // { columnDef: `stats.${statLine}.muwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.ab`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.avg`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.ops`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.babip`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
  // { columnDef: `stats.${statLine}.xwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number }
];

export const COLUMNS_BY_POS = {
  B: [...BASE_STATS_COLUMNS, ...BATTER_PLATEIQ_COLUMNS],
  P: [...BASE_STATS_COLUMNS, ...PITCHER_STATS_COLUMNS],
};

export const ROWS_BY_POS = {
  B: transformTableColumnsToTableRows(COLUMNS_BY_POS.B),
  P: transformTableColumnsToTableRows(COLUMNS_BY_POS.P),
};

export const HEADERS_BY_POS = {
  B: getTableHeaders(ROWS_BY_POS.B),
  P: getTableHeaders(ROWS_BY_POS.P),
};
