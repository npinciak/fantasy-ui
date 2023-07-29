import { PlayerInjuryStatus } from '../../espn/injury/injury-status.model';
import { GameStatus } from './game-status.model';
import { IdAttributesNumber } from './id-attributes.model';
import { PlayerRatings } from './player-rating.model';
import { PlayerStatsYear } from './player-stats.model';

export type PlayerEntry = Pick<IdAttributesNumber, 'id'> & {
  player: PlayerInfo;
  ratings: PlayerRatings;
  appliedStatTotal: number;
};

export type PlayerInfo = Pick<IdAttributesNumber, 'id' | 'proTeamId' | 'playerId' | 'defaultPositionId'> & {
  fullName: string;
  lastNewsDate: number;
  injured: boolean;
  injuryStatus?: PlayerInjuryStatus;
  ownership: PlayerOwnership;
  outlooks?: PlayerOutlooksMap;
  eligibleSlots: number[];
  stats?: PlayerStatsYear[];
  starterStatusByProGame: GameStatus;
};

export type PlayerOutlooks = Record<string, string>;
export type PlayerOutlooksMap = { outlooksByWeek?: PlayerOutlooks };

type PlayerOwnershipAttributes = 'averageDraftPosition' | 'percentChange' | 'percentOwned' | 'percentStarted';
export type PlayerOwnership = { [prop in PlayerOwnershipAttributes]: number };
