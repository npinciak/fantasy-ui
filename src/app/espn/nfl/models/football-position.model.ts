import { FilterOptions } from '@app/@shared/models/filter.model';
import { FootballPosition, NFL_POSITION_MAP } from 'sports-ui-sdk/lib/espn/football/position/nfl-position.m';

export const FOOTBALL_POSITION_LIST_FILTER: FilterOptions<FootballPosition>[] = [
  FootballPosition.QB,
  FootballPosition.RB,
  FootballPosition.WR,
  FootballPosition.TE,
  FootballPosition.K,
  FootballPosition.DST,
].map(p => ({
  label: NFL_POSITION_MAP[p].abbrev,
  value: p,
}));
