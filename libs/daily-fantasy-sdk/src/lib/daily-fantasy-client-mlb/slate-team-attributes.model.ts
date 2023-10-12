import { DfsClientPlayerAttributes } from '../models/daily-fantasy-client-slate-attr.model';
import { ClientMlbPitcherAttributes } from './pitcher-attributes.model';

export type ClientMlbSlateTeamAttributesProperties = Omit<
  DfsClientPlayerAttributes,
  'stat_group' | 'salary_diff' | 'slate_ownership' | 'ownership' | 'value_pct'
> & {
  pitcher: ClientMlbPitcherAttributes;
  team_total: number;
};
