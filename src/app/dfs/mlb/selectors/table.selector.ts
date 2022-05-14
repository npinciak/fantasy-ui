import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { TableColumn, TableColumnDataType } from '@app/espn/models/table.model';
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
      { columnDef: 'opp', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
      { columnDef: 'salary', headerCell: 'salary', headerLabel: 'salary', dataType: TableColumnDataType.Number },

      // { columnDef: 'salary.dk', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'ownership.dk', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.overall', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.contact', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.context', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.pitchTypes', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.production', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.plateDiscipline', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.recentSkill', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.stolenBase', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.sbFactor', headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.muwoba`, headerCell: '', headerLabel:'', dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.ab`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.avg`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.ops`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.babip`, headerCell: '', headerLabel:'' },
      // { columnDef: `stats.${statLine}.xwoba`, headerCell: '', headerLabel:'' },
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
