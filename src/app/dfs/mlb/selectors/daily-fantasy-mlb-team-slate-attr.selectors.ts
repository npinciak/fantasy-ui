import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Team } from '@app/dfs/models/team.model';
import { TeamList } from '@app/dfs/selectors/daily-fantasy-slate-attr.selectors';
import { DailyFantasyTeamsSelectors } from '@app/dfs/selectors/daily-fantasy-team.selectors';
import { SlateTeam } from '@app/dfs/service/slate.service';
import { TableColumn, TableColumnDataType } from '@app/espn/models/table.model';
import { Selector } from '@ngxs/store';
import { DailyFantasyMlbTeamSlateAttributeState } from '../state/daily-fantasy-mlb-team-slate-attr.state';

export class DailyFantasyMlbTeamSlateAttributeSelectors extends GenericSelector(DailyFantasyMlbTeamSlateAttributeState) {
  @Selector([DailyFantasyMlbTeamSlateAttributeSelectors.getList, DailyFantasyTeamsSelectors.getById])
  static getTeamList(teams: SlateTeam[], selectTeamById: (id: string) => Team): TeamList[] {
    return teams.map(t => ({ ...t, team: selectTeamById(t.id) }));
  }

  @Selector()
  static getTeamMatchupColumns(): TableColumn[] {
    return [
      { columnDef: 'team', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'vegas.line', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'vegas.o/u', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'vegas.movement', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'teamTotal', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'opponentPitcher.name', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'topValue', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'smashVal', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'stackDiff', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'stackLeverage', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
      { columnDef: 'stackValue', headerCell: 'name', headerLabel: 'Name', dataType: TableColumnDataType.String },
    ];
  }
}
