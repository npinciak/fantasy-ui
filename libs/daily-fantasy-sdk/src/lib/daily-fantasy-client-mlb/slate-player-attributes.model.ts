import { AttributesByDfsSite, ClientSlateAttributes, PlayerAttributesByDfsSite } from '../daily-fantasy-client/slate-attributes.model';
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
  smash_pct: PlayerAttributesByDfsSite | AttributesByDfsSite;
} & Pick<ClientSlateAttributes, 'stack_value' | 'top_value' | 'stack_leverage' | 'stack_field' | 'stack_diff'>;

export type ClientMlbSlateTeamAttributes = ClientMlbSlateTeamAttributesProperties & { vegas: ClientVegas };
