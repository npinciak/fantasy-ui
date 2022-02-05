import { CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';
import { SlateAttrTeam } from '@app/dfs/models/team.model';
import { NFLClientOutsidersProperties, NFLClientSafptsProperties, PlayerEcrByDfsSiteType } from './nfl-client.model';

export type ScheduleAdjFptsProps = CamelCasedProperties<NFLClientSafptsProperties>;
export type OutsidersProps = CamelCasedProperties<NFLClientOutsidersProperties>;

export type NFLSlateAttrTeam = SlateAttrTeam & {
  safpts: ScheduleAdjFptsProps;
  outsiders: OutsidersProps;
};

export type NFLPlayerSlateAttr = PlayerSlateAttr & {
  expertRanking: PlayerEcrByDfsSiteType;
};
