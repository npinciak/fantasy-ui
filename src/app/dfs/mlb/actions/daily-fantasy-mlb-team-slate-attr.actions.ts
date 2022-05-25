import { SlateTeam } from '@app/dfs/service/slate.service';

export class PatchMlbTeamSlateAttributes {
  static readonly type = `[dailyFantasyMlbTeamSlateAttributes] PatchMlbTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}
