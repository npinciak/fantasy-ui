import { Selector } from '@ngxs/store';

export interface TableColumn {
  columnDef: string;
  nested?: unknown | null;
  headerCell: string;
  headerLabel: string;
}

export class TableSelectors {
  @Selector([])
  static stat(statLine: string): string {
    return statLine;
  }

  @Selector()
  static matchupColumns(): string[] {
    return ['team', 'vegas.line', 'vegas.o/u', 'vegas.movement', 'teamTotal'];
  }

  @Selector()
  static mlbMatchupColumns(): string[] {
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

  @Selector([])
  static selectBatterColumns(statLine: string): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Name' },
      { columnDef: 'opponent', headerCell: 'opp', headerLabel: 'Name' },
      { columnDef: 'ranking', headerCell: null, headerLabel: null },
      { columnDef: 'salary.dk', headerCell: null, headerLabel: null },
      { columnDef: 'ownership.dk', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.factors.positiveCt', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.factors.negativeCt', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.overall', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.contact', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.context', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.pitchTypes', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.production', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.plateDiscipline', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.recentSkill', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.stolenBase', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.sbFactor', headerCell: null, headerLabel: null },
      { columnDef: `stats.${statLine}.muwoba`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.ab`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.avg`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.ops`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.babip`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.xwoba`, headerCell: null, headerLabel: null },
    ];
  }

  @Selector([])
  static selectPitcherColumns(statLine: string): TableColumn[] {
    return [
      { columnDef: 'name', headerCell: 'name', headerLabel: 'Name' },
      { columnDef: 'opponent', headerCell: 'opp', headerLabel: 'Name' },
      { columnDef: 'ranking', headerCell: null, headerLabel: null },
      { columnDef: 'salary.dk', headerCell: null, headerLabel: null },
      // { columnDef: 'plateIq.factors.positiveCt', headerCell: null, headerLabel: null },
      // { columnDef: 'plateIq.factors.negativeCt', headerCell: null, headerLabel: null },
      { columnDef: 'ownership.dk', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.overall', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.KMatchup', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.contact', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.context', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.pitchTypes', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.production', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.plateDiscipline', headerCell: null, headerLabel: null },
      { columnDef: 'plateIq.score.recentSkill', headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.era`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.BBPct`, headerCell: null, headerLabel: null },
      { columnDef: `stats.${statLine}.xfip`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.xl`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['lk/9']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['lk%']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}.xr`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['rk/9']`, headerCell: null, headerLabel: null },
      // { columnDef: `stats.${statLine}['rk%']`, headerCell: null, headerLabel: null },
    ];
  }

  @Selector([TableSelectors.selectBatterColumns])
  static batterColumnDisplay(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector([TableSelectors.selectPitcherColumns])
  static pitcherColumnDisplay(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}
