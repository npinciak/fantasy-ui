import { FilterOptions } from '@app/@shared/models/filter.model';
import { NFL_STATS_LIST } from 'sports-ui-sdk';

export const FOOTBALL_STATS_FILTER: FilterOptions<string>[] = NFL_STATS_LIST.map(stat => ({
  label: stat.description,
  value: stat.id,
}));
