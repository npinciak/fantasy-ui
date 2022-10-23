import { SlateTeam } from '@app/dfs/service/slate.service';

export const name = 'dailyFantasyNflTeamSlateAttributes';

export class SetNflTeamSlateAttributes {
  static readonly type = `${name} SetNflTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}

export class ClearAndAddNflTeamSlateAttributes {
  static readonly type = `${name} ClearAndAddNflTeamSlateAttributes`;
  constructor(public payload: SlateTeam[]) {}
}

export class ClearNflTeamSlateAttributes {
  static readonly type = `${name} ClearNflTeamSlateAttributes`;
}
