import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';

export class SetMlbPlayerSlateAttributes {
  static readonly type = `[dailyFantasyMlbPlayerSlateAttributes] SetMlbPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}

export class ClearAndAddMlbPlayerSlateAttributes {
  static readonly type = `[dailyFantasyMlbPlayerSlateAttributes] ClearAndAddMlbPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}
