export interface Player {
  playerId: number;
  lineupSlotId: number;
  playerPoolEntry: PlayerEntry;
}

export interface PlayerEntry {
  player: PlayerInfo;
  ratings: PlayerRatings;
}

export interface PlayerInfo {
  fullName: string;
  playerId?: number;
  lastNewsDate: number;
  defaultPositionId: number;
  proTeamId: number;
  injured: boolean;
  injuryStatus: string;
  ownership: PlayerOwnership;
  eligibleSlots: number[];
  stats: PlayerStatsYear[];
  starterStatusByProGame: GameStatus;
}

export interface GameStatus {
  [key: number]: string;
}

export interface PlayerOwnership {
  averageDraftPosition: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export interface PlayerRatings {
  [key: number]: {
    positionalRanking: number;
    totalRanking: number;
    totalRating: number;
  };
}

export interface PlayerStatsYear {
  seasonId: number;
  statSplitTypeId: number;
  scoringPeriodId: number;
  stats: PlayerStatsEntity;
}

export interface PlayerStatsEntity {
  [key: number]: number;
}

export interface PlayerNews {
  timestamp: string;
  resultsOffset: number;
  status: string;
  resultsLimit: number;
  resultsCount: number;
  feed?: FeedEntity[] | null;
}

export interface FeedEntity {
  lastModified: string;
  headline: string;
  story: string;
}
