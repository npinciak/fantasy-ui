import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientFootballPosition as FootballPosition } from '@espnClient/espn-client.model';
import { NFL_POSITION_MAP } from '../consts/position.const';

export const FOOTBALL_POSITION_LIST = enumAsList(FootballPosition);
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

export { FootballPosition };
