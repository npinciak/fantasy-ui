import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumn, TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { Selector } from '@ngxs/store';

export class TableSelectors {
  @Selector([])
  static stat(statLine: string): string {
    return statLine;
  }

  @Selector()
  static getMatchupColumns(): string[] {
    return ['team', 'vegas.line', 'vegas.o/u', 'vegas.movement', 'teamTotal'];
  }

  @Selector()
  static getMlbMatchupColumns(): string[] {
    return [
      'team',
      'vegas.line',
      'vegas.o/u',
      'vegas.movement',
      'teamTotal',
      'opponentPitcher.name',
      'topValue',
      'smashVal',
      'stackDiff',
      'stackLeverage',
      'stackValue',
    ];
  }

  @Selector()
  static getBatterColumns(): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      {
        columnDef: 'position',
        headerCell: 'position',
        headerLabel: 'pos',
        dataType: TableColumnDataType.String,
      },
      { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
      { columnDef: 'salary', headerCell: 'salary', headerLabel: 'salary', dataType: TableColumnDataType.Number },
      { columnDef: 'smash_pct', headerCell: 'smash_pct', headerLabel: 'Smash Pct', dataType: TableColumnDataType.Number },
      { columnDef: 'stack_diff', headerCell: 'stack_diff', headerLabel: 'Stack Diff', dataType: TableColumnDataType.Number },
      { columnDef: 'stack_field', headerCell: 'stack_field', headerLabel: 'Stack Field', dataType: TableColumnDataType.Number },
      { columnDef: 'stack_leverage', headerCell: 'stack_leverage', headerLabel: 'Stack Lev.', dataType: TableColumnDataType.Number },

      { columnDef: 'salaryDiff.rank', headerCell: 'salaryDiff.rank', headerLabel: 'sallary rnk', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.overall', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.contact', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.context', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.pitchTypes', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.production', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.plateDiscipline', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.recentSkill', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.stolenBase', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.sbFactor', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.muwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.ab`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.avg`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.ops`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.babip`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.xwoba`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
    ];
  }

  @Selector([])
  static getPitcherColumns(statLine: string): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'opponent', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
      { columnDef: 'ranking', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'salary.dk', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: '', headerLabel:'' },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: '', headerLabel:'' },
      { columnDef: 'ownership.dk', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.overall', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.KMatchup', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.contact', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.context', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.pitchTypes', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.production', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.plateDiscipline', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.recentSkill', headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.era`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.BBPct`, headerCell: '', headerLabel:'' },
      { columnDef: `stats.${statLine}.xfip`, headerCell: '', headerLabel: '', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.xl`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}['lk/9']`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}['lk%']`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.xr`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}['rk/9']`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}['rk%']`, headerCell: '', headerLabel:'' },
    ];
  }

  @Selector([TableSelectors.getBatterColumns])
  static getBatterTableColumns(playerCols: Partial<TableColumn>[]) {
    return playerCols.map(col => ({
      columnDef: col.columnDef,
      cellData: data => cellDataAccessor(data, col.columnDef),
      headerLabel: col.headerLabel,
    }));
  }

  @Selector([TableSelectors.getBatterColumns])
  static getBatterTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([TableSelectors.getPitcherColumns])
  static getPitcherTableHeaders(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
