import { PlayerTableRow } from '@app/dfs/models/player.model';

export interface NFLPlayerTableRowProperties extends PlayerTableRow {
  isHome: boolean;
  statGroup: string;
  playerAdvanced: PlayerTableRowPlayerAdvanced;
  playerProjection: PlayerTableRowPlayerProjection;
  opponent: PlayerTableRowOpponent;
}

export type NFLPlayerTableRow = PlayerTableRow & NFLPlayerTableRowProperties;

export interface PlayerTableRowPlayerAdvanced {
  fptsPerGame: number;
  targetShare: number;
  rzTargetShare: number;
  dominatorRating: number;
  aDOT: number;
  avgTargetDist: number;
  catchableTargetRate: number;
  gameScript: number;
  goalLineCarriesGame: number;
  epa: number;
  epaPass: number;
  epaRun: number;
}

export interface PlayerTableRowPlayerProjection {
  targets: number;
  fpts: number;
  ceil: number;
  floor: number;
}
export interface PlayerTableRowOpponent {
  info: PlayerTableRowInfo;
  passDef: number;
  passDefRk: number;
  fptsAllowedRk: unknown;
}
export interface PlayerTableRowInfo {
  hashtag: string;
  id: string;
  rg_id: string;
  name: string;
  isHome: boolean;
}
export interface PlayerTableRowFptsAllowedRk {
  allowedToRawQb: number;
  allowedToAdjQb: number;
  allowedToDifQb: number;
  allowedToRawrb: number;
  allowedToAdjRb: number;
  allowedToDifRb: number;
  allowedToRawWr: number;
  allowedToAdjWr: number;
  allowedToDifWr: number;
  allowedToRawTe: number;
  allowedToAdjTe: number;
  allowedToDifTe: number;
}
