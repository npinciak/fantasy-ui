import { PlayerTableData } from '@app/dfs/models/player.model';

export interface NFLPlayerTableRowProperties extends PlayerTableData {
  isHome: boolean;
  statGroup: string;
  playerAdvanced: PlayerTableRowPlayerAdvanced;
  playerProjection: PlayerTableRowPlayerProjection;
  opponent: PlayerTableRowOpponent;
}

export type NFLPlayerTableRow = PlayerTableData & NFLPlayerTableRowProperties;

type PlayerTableRowPlayerAdvancedProperties =
  | 'fptsPerGame'
  | 'targetShare'
  | 'rzTargetShare'
  | 'dominatorRating'
  | 'aDOT'
  | 'avgTargetDist'
  | 'catchableTargetRate'
  | 'gameScript'
  | 'goalLineCarriesGame'
  | 'epa'
  | 'epaPass'
  | 'epaRun';

export type PlayerTableRowPlayerAdvanced = { [prop in PlayerTableRowPlayerAdvancedProperties]: number };

type PlayerTableRowPlayerProjectionProperties = 'targets' | 'fpts' | 'ceil' | 'floor';

export type PlayerTableRowPlayerProjection = { [prop in PlayerTableRowPlayerProjectionProperties]: number };

type PlayerTableRowFptsAllowedRkProperties =
  | 'allowedToRawQb'
  | 'allowedToAdjQb'
  | 'allowedToDifQb'
  | 'allowedToRawrb'
  | 'allowedToAdjRb'
  | 'allowedToDifRb'
  | 'allowedToRawWr'
  | 'allowedToAdjWr'
  | 'allowedToDifWr'
  | 'allowedToRawTe'
  | 'allowedToAdjTe'
  | 'allowedToDifTe';

export type PlayerTableRowFptsAllowedRk = { [prop in PlayerTableRowFptsAllowedRkProperties]: number };

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
