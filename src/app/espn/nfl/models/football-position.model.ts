import { enumAsList } from '@app/@shared/helpers/enum-as-list';
import { EspnClientFootballPosition as FootballPosition } from '@espnClient/espn-client.model';

export const FOOTBALL_POSITION_LIST = enumAsList(FootballPosition);
export const FOOTBALL_POSITION_LIST_DEFAULT = [
  FootballPosition.QB,
  FootballPosition.RB,
  FootballPosition.WR,
  FootballPosition.TE,
  FootballPosition.K,
  FootballPosition.DST,
];

export { FootballPosition };
