import { SlatePlayer } from '@app/dfs/models/slate-player.model';
import { SlateTeam } from '@app/dfs/models/slate-team.model';
import { PlayerEcrByDfsSiteType } from '../../../../dfs-client-models/nfl-client.model';

export type SlatePlayerNfl = SlatePlayer & {
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

export type SlateTeamNfl = SlateTeam & {
  outsiders: Outsiders | null;
  safpts: SaFpts | null;
};
