import { FilterOptions } from '@app/@shared/models/filter.model';
import { enumAsList } from 'sports-ui-sdk/lib/helpers/enum-as-list/enum-as-list';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

import { NFL_POSITION_MAP } from '../consts/position.const';

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
