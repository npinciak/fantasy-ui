import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { EspnClient, PlayerInjuryStatus } from 'sports-ui-sdk';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: EspnClient.PlayerRatings | undefined;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string | null;
  starterStatusByProGame: Record<number, PlayerInjuryStatus>;
  eligibleLineupSlots: string;
}

export type BaseballPlayer = FantasyPlayer & BaseballPlayerProps & Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<BaseballPlayer, 'eligibleLineupSlots' | 'injured' | 'injuryStatus' | 'percentChange' | 'percentOwned' | 'percentStarted'> &
  Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'> & {
    highlightedPlayer: boolean;
    stats: Record<number, number>;
  };
