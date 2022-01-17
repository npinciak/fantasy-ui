import { DfsSiteType } from '@app/dfs/dfs.const';
import { ClientPlayerAttributes } from '@app/dfs/models/daily-fantasy-client-slate-sttr.model';
import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';

export interface SafptsEntity {
  RawQB: string;
  AdjQB: string;
  DifQB: string;
  RAWRB: string;
  AdjRB: string;
  DifRB: string;
  RawWR: string;
  AdjWR: string;
  DifWR: string;
  RawTE: string;
  AdjTE: string;
  DifTE: string;
}

export interface OutsidersEntity {
  'D Power': string;
  'D Power Rk': string;
  'D Stuffed': string;
  'D Stuffed Rk': string;
  'DL SkRate': string;
  'DL SkRate Rk': string;
  'O Power': string;
  'O Power Rk': string;
  'O Stuffed': string;
  'O Stuffed Rk': string;
  'OL SkRate': string;
  'OL SkRate Rk': string;
  'Opp PaDef': string;
  'Opp PaDef Rk': string;
  'Opp RuDef': string;
  'Opp RuDef Rk': string;
  PaOff: string;
  'PaOff Rk': string;
  RuOff: string;
  'RuOff Rk': string;
}

export interface NFLSlateAttrTeamProperties {
  safpts: SafptsEntity;
  outsiders: OutsidersEntity;
}

export type NFLClientSlateAttrTeam = SlateAttrTeamProperties & NFLSlateAttrTeamProperties;
export type NFLClientSlateAttrTeamMap = Record<string, SlateAttrTeamProperties & NFLSlateAttrTeamProperties>;

export interface NFLClientStatGroup {
  qb: NFLClientProfiler;
  rb: NFLClientProfiler;
  te: NFLClientProfiler;
  wr: NFLClientProfiler;
}

export interface NFLClientProfiler {
  profiler: NFLClientProfilerEntity;
}

export interface NFLClientProfilerEntity {
  season: NFLClientProfilerTimeFrameEntity;
  'last-season': NFLClientProfilerTimeFrameEntity;
  combined: NFLClientProfilerTimeFrameEntity;
}

export interface ProfilerInfoQB {
  profilerId: string;
  'Expected Points Added': string;
  'Pass EPA': string;
  'Rush EPA': string;
  'Fantasy Points Per Game': string;
  'Production Premium': string;
  'Production Premium Rank': string;
  'Total QBR': string;
  'Offensive Line Rank': string;
  'Air Yards Per Attempt': string;
  'Air Yards Per Game': string;
  'Attempts Inside 10 Per Game': string;
  'Carries Inside 5 Per Game': string;
  'Pass Attempt Distance': string;
  'Passing Attempts': string;
  'Deep Ball Attempts Rank': string;
  'Deep Ball Completion Percentage': string;
  'Under Pressure Attempts Rank': string;
  'Pressured Completion Percentage': string;
  'Protection Rate': string;
  'Receiver Target Separation': string;
  'Catchable Passes Per Game': string;
  'Attempts Per Game': string;
  'Receiver Contested Catch Rate': string;
  'Supporting Cast Efficiency': string;
  'Receiver Yards After The Catch Per Target': string;
  'Interceptable Passes': string;
  'Play-action Pass Completion Percentage': string;
  'True Passer Rating': string;
  'Under Pressure Attempts Per Game': string;
  'Weekly Volatility': string;
}

export interface ProfilerInfoRB {
  profilerId: string;
  'Expected Points Added': string;
  'Rush EPA': string;
  'Receiving EPA': string;
  'Fantasy Points Per Game': string;
  'Production Premium': string;
  'Production Premium Rank': string;
  'Dominator Rating': string;
  'Goal Line Carries Per Game': string;
  'Game Script': string;
  'Breakaway Run Rate': string;
  'Evaded Tackles': string;
  'Juke Rate': string;
  'Stacked Front Carry Rate': string;
  'Base Front Carry Rate': string;
  'Light Front Carry Rate': string;
  'Offensive Line Rank': string;
  'Opportunity Share': string;
  'Weekly Volatility': string;
  'Yards Per Carry': string;
  'Stacked Front Yards Per Carry': string;
  'Base Front Yards Per Carry': string;
  'Light Front Yards Per Carry': string;
  'Red Zone Opportunity Share': string;
  'Run Blocking Efficiency Rank': string;
  'Weighted Opportunities Per Game': string;
  'Yards Created Per Touch': string;
}

export interface ProfilerInfoReceiver {
  profilerId: string;
  'Expected Points Added': string;
  'EPA Per Target': string;
  'Production Premium': string;
  'Target Premium': string;
  'Dominator Rating': string;
  'Route Participation': string;
  'Yards Per Route Run': string;
  'Fantasy Points Per Game': string;
  'Fantasy Points Per Route Run': string;
  'Catchable Target Rate': string;
  'Average Target Distance': string;
  'Air Yards Per Target': string;
  'Air Yards Share': string;
  'Target Share': string;
  'Deep Targets Per Game': string;
  'Red Zone Target Share': string;
  'Slot Rate': string;
  'Contested Catch Conversion Rate': string;
  'Drop Rate': string;
  'Target Separation': string;
  'Hog Rate': string;
  'Weekly Volatility': string;
  'Likely CB': string;
  'Matchup Rtg': string;
}

export interface NFLClientSalaryDiff {
  diff: number;
  position: string;
  rank: number;
  rank_diff: number;
  salary: string;
}

export interface NFLClientEcr {
  rank: string;
  avg: string;
}

export interface NFLClientPlayerAttributesEntity {
  team: string;
  xml_id: string;
  ecr: PlayerEcrByDfsSiteType;
}

export interface NFLClientGridIronPlayer {
  PLAYERID: string;
  PLAYER: string;
  SALARY?: string | null;
  OPP?: string | null;
  POS?: string | null;
  TEAM?: string | null;
  SCHEDULE_ID?: string | null;
  ATT: string;
  CMP: string;
  PAYDS: string;
  PATD: string;
  INT: string;
  RUATT: string;
  RUYDS: string;
  TAR: string;
  REC: string;
  REYDS: string;
  'RUYDS+RECYDS': string;
  TD: string;
  PARTNERID: string;
  FPTS: string;
  'FPTS/$': number;
  CEIL: string;
  FLOOR: string;
}

export type NFLClientGridIronPlayerMap = Record<string, NFLClientGridIronPlayer>;

export type NFLClientPlayerAttributes = NFLClientPlayerAttributesEntity & ClientPlayerAttributes;
export type NFLClientPlayerAttributesMap = Record<string, NFLClientPlayerAttributes>;

export type NFLClientProfilerTimeFrameEntity = Record<number, ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver>;

export type SalaryDiffByDfsSiteType = Record<DfsSiteType, NFLClientSalaryDiff>;
export type PlayerAttributesByDfsSite = Record<DfsSiteType, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<DfsSiteType, Record<number, string>>;
export type PlayerEcrByDfsSiteType = Record<DfsSiteType, NFLClientEcr>;
