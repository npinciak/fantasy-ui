import { ExpertConsensusRankBySite } from '../daily-fantasy-client/expert-consensus-ranking.model';
import { AttributesByDfsSite, DfsClientSlateAttributes, PlayerAttributesByDfsSite } from '../daily-fantasy-client/slate-attributes.model';
import { BattingOrder } from './batting-attributes.model';
import { PlateIq } from './plate-iq.model';
import { ClientMlbStatSplit } from './stats.model';

export type ClientMlbSlatePlayerAttributesProperties = {
  hand: string;
  stats: ClientMlbStatSplit;
  batting_order: BattingOrder;
  stat_group: string;
  plateiq: PlateIq;
  ecr: ExpertConsensusRankBySite;
};

export type ClientMlbSlatePlayerAttributes = {
  hand: string;
  stats: ClientMlbStatSplit;
  batting_order: BattingOrder;
  stat_group: string;
  plateiq: PlateIq;
  ecr: ExpertConsensusRankBySite;
  smash_pct: PlayerAttributesByDfsSite | AttributesByDfsSite;
} & Pick<DfsClientSlateAttributes, 'stack_value' | 'top_value' | 'stack_leverage' | 'stack_field' | 'stack_diff'>;
