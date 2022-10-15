import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';
import { Vegas } from '@app/dfs/models/vegas.model';
import { PlayerEcrByDfsSiteType } from '../../../../dfs-client-models/nfl-client.model';

export type NFLPlayerSlateAttr = PlayerSlateAttr & {
  expertRanking: PlayerEcrByDfsSiteType;
};

type SaFptsAttributes =
  | 'rawQB'
  | 'adjQB'
  | 'difQB'
  | 'rawRB'
  | 'adjRB'
  | 'difRB'
  | 'rawWR'
  | 'adjWR'
  | 'difWR'
  | 'rawTE'
  | 'adjTE'
  | 'difTE';

type OutsidersAttributes =
  | 'dPower'
  | 'dPowerRk'
  | 'dStuffed'
  | 'dStuffedRk'
  | 'dlSkRate'
  | 'dlSkRateRk'
  | 'oPower'
  | 'oPowerRk'
  | 'oStuffed'
  | 'oStuffedRk'
  | 'olSkRate'
  | 'olSkRateRk'
  | 'oppPaDef'
  | 'oppPaDefRk'
  | 'oppRuDef'
  | 'oppRuDefRk'
  | 'paOff'
  | 'paOffRk'
  | 'ruOff'
  | 'ruOffRk';

export type SaFpts = { [att in SaFptsAttributes]: number | null };
export type Outsiders = { [att in OutsidersAttributes]: number | null };

export interface NewTeamSlateAttributes {
  outsiders: Outsiders | null;
  safpts: SaFpts | null;
  vegas: Vegas | null;
}
