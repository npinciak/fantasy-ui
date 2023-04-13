import { FilterOptions } from '@app/@shared/models/filter.model';
import { FootballPosition, NFL_POSITION_LIST_DEFAULT, NFL_POSITION_MAP } from 'sports-ui-sdk/lib/espn/football/position/nfl-position.m';

export const FOOTBALL_POSITION_LIST_FILTER: FilterOptions<FootballPosition>[] = NFL_POSITION_LIST_DEFAULT.map(p => ({
  label: NFL_POSITION_MAP[p].abbrev,
  value: p,
}));
