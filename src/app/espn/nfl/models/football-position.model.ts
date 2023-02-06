import { FilterOptions } from '@app/@shared/models/filter.model';
import { FootballPosition, NFL_POSITION_MAP } from 'sports-ui-sdk';

export const FOOTBALL_POSITION_LIST_DEFAULT = [
  FootballPosition.QB,
  FootballPosition.RB,
  FootballPosition.WR,
  FootballPosition.TE,
  FootballPosition.K,
  FootballPosition.DST,
];

export const FOOTBALL_POSITION_LIST_FILTER: FilterOptions<FootballPosition>[] = FOOTBALL_POSITION_LIST_DEFAULT.map(p => ({
  label: NFL_POSITION_MAP[p].abbrev,
  value: p,
}));
