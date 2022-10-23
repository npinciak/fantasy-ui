import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';

export const name = 'dailyFantasyNflPlayerSlateAttributes';

export class SetNflPlayerSlateAttributes {
  static readonly type = `[${name}] SetNflPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}

export class ClearAndAddNflPlayerSlateAttributes {
  static readonly type = `[${name}] ClearAndAddNflPlayerSlateAttributes`;
  constructor(public payload: PlayerSlateAttr[]) {}
}

export class ClearNflPlayerSlateAttributes {
  static readonly type = `[${name}] ClearNflPlayerSlateAttributes`;
}
