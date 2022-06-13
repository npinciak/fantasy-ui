import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';

export class SetMlbPlayerSlateAttributes {
  static readonly type = `[dailyFantasyMlbPlayerSlateAttributes] SetMlbPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}
