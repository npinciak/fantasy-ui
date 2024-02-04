import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { PlayerInjuryStatus } from '@sports-ui/ui-sdk/espn';
import { PlayerCardEntity, PlayerRatings, TeamRosterEntry } from '@sports-ui/ui-sdk/espn-client';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: PlayerRatings | undefined;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string | null;
  starterStatusByProGame: Record<number, PlayerInjuryStatus> | null;
  eligibleLineupSlots: string;
}

export type BaseballPlayer = FantasyPlayer & BaseballPlayerProps & Pick<TeamRosterEntry, 'lineupSlotId'>;

export type BaseballPlayerCard = Omit<BaseballPlayer, 'lineupSlotId' | 'lineupSlot'> &
  Pick<PlayerCardEntity['player'], 'stance' | 'laterality'> & { playerCardImage: string };

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<BaseballPlayer, 'eligibleLineupSlots' | 'injured' | 'injuryStatus' | 'percentChange' | 'percentOwned' | 'percentStarted'> &
  Pick<TeamRosterEntry, 'lineupSlotId'> & {
    highlightedPlayer: boolean;
    stats: Record<number, number>;
  };

export type BaseballPlayerLiveStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<BaseballPlayer, 'eligibleLineupSlots' | 'injured' | 'injuryStatus' | 'isPitcher'> &
  Pick<TeamRosterEntry, 'lineupSlotId'> & { stats: Record<number, number> | null };
