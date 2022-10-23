import { SlateTeam } from '@app/dfs/service/slate.service';

export class SetMlbTeamSlateAttributes {
  static readonly type = `[dailyFantasyMlbTeamSlateAttributes] SetMlbTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}

export class ClearAndAddMlbTeamSlateAttributes {
  static readonly type = `[dailyFantasyMlbTeamSlateAttributes] ClearAndAddMlbTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}
