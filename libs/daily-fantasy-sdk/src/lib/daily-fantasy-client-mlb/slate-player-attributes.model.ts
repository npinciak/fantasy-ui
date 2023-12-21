import { ExpertConsensusRankBySite } from '../daily-fantasy-client/expert-consensus-ranking.model';
import { AttributesByDfsSite, DfsClientSlateAttributes, PlayerAttributesByDfsSite } from '../daily-fantasy-client/slate-attributes.model';
import { ClientVegas } from '../daily-fantasy-client/vegas.model';
import { ClientMlbBattingOrder } from './batting-attributes.model';
import { ClientMlbPlateIq } from './plate-iq.model';
import { ClientMlbSlateTeamAttributesProperties } from './slate-team-attributes.model';
import { ClientMlbStatSplit } from './stats.model';

export type ClientMlbSlatePlayerAttributes = {
  hand: string;
  stats: ClientMlbStatSplit;
  batting_order: ClientMlbBattingOrder;
  stat_group: string;
  plateiq: ClientMlbPlateIq;
  ecr: ExpertConsensusRankBySite;
  smash_pct: PlayerAttributesByDfsSite | AttributesByDfsSite;
} & Pick<DfsClientSlateAttributes, 'stack_value' | 'top_value' | 'stack_leverage' | 'stack_field' | 'stack_diff'>;

export type ClientMlbSlateTeamAttributes = ClientMlbSlateTeamAttributesProperties & { vegas: ClientVegas };
