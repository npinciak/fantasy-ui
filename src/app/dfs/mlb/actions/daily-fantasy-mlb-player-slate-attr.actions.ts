import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';

export class PatchMlbPlayerSlateAttributes {
  static readonly type = `[dailyFantasyMlbPlayerSlateAttributes] PatchMlbPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}
