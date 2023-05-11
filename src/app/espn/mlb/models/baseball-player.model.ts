import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';
import { PlayerInjuryStatus } from 'sports-ui-sdk/lib/espn/models/espn-client.model';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: EspnClient.PlayerRatings | undefined;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string | null;
  starterStatusByProGame: Record<number, PlayerInjuryStatus>;
}

export type BaseballPlayer = FantasyPlayer & BaseballPlayerProps & Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'>;

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<FantasyPlayer, 'injured' | 'injuryStatus' | 'percentChange' | 'percentOwned' | 'percentStarted'> &
  Pick<EspnClient.TeamRosterEntry, 'lineupSlotId'> & {
    highlightedPlayer: boolean;
    stats: Record<number, number>;
  };
