import { SlatePlayer } from '@app/dfs/models/slate-player.model';
import { ExpertConsensusRank } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

export type SlatePlayerNfl = SlatePlayer & {
  expertRanking: ExpertConsensusRank;
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

export type OutsidersAttributes =
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
