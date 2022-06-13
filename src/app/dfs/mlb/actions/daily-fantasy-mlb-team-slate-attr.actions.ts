import { SlateTeam } from '@app/dfs/service/slate.service';

export class SetMlbTeamSlateAttributes {
  static readonly type = `[dailyFantasyMlbTeamSlateAttributes] SetMlbTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}
