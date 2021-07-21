export interface EspnClientPlayer {
  playerId: number;
  lineupSlotId: number;
  playerPoolEntry: EspnClientPlayerEntry;
}

export interface EspnClientPlayerEntry {
  player: EspnClientPlayerInfo;
  ratings: EspnClientPlayerRatings;
}

export interface EspnClientPlayerInfo {
  fullName: string;
  playerId?: number;
  lastNewsDate: number;
  defaultPositionId: number;
  proTeamId: number;
  injured: boolean;
  injuryStatus: string;
  ownership: EspnClientPlayerOwnership;
  eligibleSlots: number[];
  stats: EspnClientPlayerStatsYear[];
  starterStatusByProGame: EspnClientGameStatus;
}

export interface EspnClientGameStatus {
  [key: number]: string;
}

export interface EspnClientPlayerOwnership {
  averageDraftPosition: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export interface EspnClientPlayerRatings {
  [key: number]: {
    positionalRanking: number;
    totalRanking: number;
    totalRating: number;
  };
}

export interface EspnClientPlayerStatsYear {
  seasonId: number;
  statSplitTypeId: number;
  scoringPeriodId: number;
  stats: EspnClientPlayerStatsEntity;
}

export interface EspnClientPlayerStatsEntity {
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
