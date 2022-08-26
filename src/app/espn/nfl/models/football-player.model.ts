import { Player } from '@app/espn/models/player.model';
import { EspnClientPlayer, EspnClientPlayerInfo, EspnClientPlayerStatsByYearMap } from '@client/espn-client.model';

export interface FootballPlayerProperties {
  isInjured: boolean;
  injuryStatus: string | null;
  lineupSlot: string | null;
  points: number;
  stats: EspnClientPlayerStatsByYearMap | null;
}

export type FootballPlayer = Player &
  FootballPlayerProperties &
  Pick<EspnClientPlayer, 'lineupSlotId'> &
  Pick<EspnClientPlayerInfo, 'defaultPositionId'>;

export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;