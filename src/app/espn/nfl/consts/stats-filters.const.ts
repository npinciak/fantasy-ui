import { FilterOptions } from '@app/@shared/models/filter.model';
import { FOOTBALL_STATS_LIST } from './stats.const';

export const FOOTBALL_STATS_FILTER: FilterOptions<string>[] = FOOTBALL_STATS_LIST.map(stat => ({
  label: stat.description,
  value: stat.id,
}));
