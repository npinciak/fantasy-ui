import { FilterOptions } from '@app/@shared/models/filter.model';
import { enumAsList, EspnClient, NFL_POSITION_MAP } from 'sports-ui-sdk';

export const FOOTBALL_POSITION_LIST = enumAsList(EspnClient.FootballPosition);
export const FOOTBALL_POSITION_LIST_DEFAULT = [
  EspnClient.FootballPosition.QB,
  EspnClient.FootballPosition.RB,
  EspnClient.FootballPosition.WR,
  EspnClient.FootballPosition.TE,
  EspnClient.FootballPosition.K,
  EspnClient.FootballPosition.DST,
];

export const FOOTBALL_POSITION_LIST_FILTER: FilterOptions<EspnClient.FootballPosition>[] = FOOTBALL_POSITION_LIST_DEFAULT.map(p => ({
  label: NFL_POSITION_MAP[p].abbrev,
  value: p,
}));

export const FootballPosition = EspnClient.FootballPosition;
