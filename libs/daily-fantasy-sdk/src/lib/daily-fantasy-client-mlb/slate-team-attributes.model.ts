import { ClientSlateAttributes } from '../daily-fantasy-client/slate-attributes.model';
import { ClientMlbPitcherAttributes } from './pitcher-attributes.model';

export type ClientMlbSlateTeamAttributesProperties = Omit<
  ClientSlateAttributes,
  'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'
> & {
  pitcher: ClientMlbPitcherAttributes;
  team_total: number;
};
