export type ExtendedFootballStatsMap = Record<string, ExtendedFootballStats>;

export interface ExtendedFootballStats {
  stats: Record<string, number>;
  seasonId: number;
}
