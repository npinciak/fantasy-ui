import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';
import { SlateAttrTeam } from '@app/dfs/models/team.model';
import { NFLClientOutsidersProperties, NFLClientSafptsProperties, PlayerEcrByDfsSiteType } from './nfl-client.model';

export type ScheduleAdjFptsProps = NFLClientSafptsProperties;
export type OutsidersProps = NFLClientOutsidersProperties;

export type NFLSlateAttrTeam = SlateAttrTeam & {
  safpts: ScheduleAdjFptsProps;
  outsiders: OutsidersProps;
};

export type NFLPlayerSlateAttr = PlayerSlateAttr & {
  expertRanking: PlayerEcrByDfsSiteType;
};
