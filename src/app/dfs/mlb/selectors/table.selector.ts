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

      // { columnDef: 'salary.dk', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'ownership.dk', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.overall', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.contact', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.context', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.pitchTypes', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.production', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.plateDiscipline', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.recentSkill', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.stolenBase', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.score.sbFactor', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.muwoba`, headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.ab`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.avg`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.ops`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.babip`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.xwoba`, headerCell: null, headerLabel: null },
    ];
  }

  @Selector([])
  static getPitcherColumns(statLine: string): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'opponent', headerCell: 'opp', headerLabel: 'Opp', dataType: TableColumnDataType.String },
      { columnDef: 'ranking', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'salary.dk', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: null, headerLabel: null },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: null, headerLabel: null },
      { columnDef: 'ownership.dk', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.overall', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.KMatchup', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.contact', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.context', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.pitchTypes', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.production', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.plateDiscipline', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      { columnDef: 'plateIq.score.recentSkill', headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.era`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.BBPct`, headerCell: null, headerLabel: null },
      { columnDef: `stats.${statLine}.xfip`, headerCell: null, headerLabel: null, dataType: TableColumnDataType.Number },
      // { columnDef: `stats.${statLine}.xl`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['lk/9']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['lk%']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.xr`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['rk/9']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['rk%']`, headerCell: null, headerLabel: null },
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
