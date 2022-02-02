import { DfsSiteType } from '@app/dfs/dfs.const';
import { ClientPlayerAttributes } from '@app/dfs/models/daily-fantasy-client-slate-attr.model';
import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';

type SafptsProperties =
  | 'RawQB'
  | 'AdjQB'
  | 'DifQB'
  | 'RAWRB'
  | 'AdjRB'
  | 'DifRB'
  | 'RawWR'
  | 'AdjWR'
  | 'DifWR'
  | 'RawTE'
  | 'AdjTE'
  | 'DifTE';

type OutsidersProperties =
  | 'D Power'
  | 'D Power Rk'
  | 'D Stuffed'
  | 'D Stuffed Rk'
  | 'DL SkRate'
  | 'DL SkRate Rk'
  | 'O Power'
  | 'O Power Rk'
  | 'O Stuffed'
  | 'O Stuffed Rk'
  | 'OL SkRate'
  | 'OL SkRate Rk'
  | 'Opp PaDef'
  | 'Opp PaDef Rk'
  | 'Opp RuDef'
  | 'Opp RuDef Rk'
  | 'PaOff'
  | 'PaOff Rk'
  | 'RuOff'
  | 'RuOff Rk';

export interface NFLSlateAttrTeamProperties {
  safpts: NFLClientSafptsProperties;
  outsiders: NFLClientOutsidersProperties;
}

export type NFLClientSlateAttrTeam = SlateAttrTeamProperties & NFLSlateAttrTeamProperties;
export type NFLClientSlateAttrTeamMap = Record<string, SlateAttrTeamProperties & NFLSlateAttrTeamProperties>;

export type NFLClientStatGroupProps = 'qb' | 'rb' | 'te' | 'wr';
export type NFLClientStatGroup = { [prop in NFLClientStatGroupProps]: NFLClientProfiler };

export type NFLClientProfiler = {
  profiler: NFLClientProfilerEntity;
};

export type ProfilerTimeFrameProps = 'season' | 'last-season' | 'combined';

export type NFLClientProfilerEntity = { [prop in ProfilerTimeFrameProps]: NFLClientProfilerTimeFrameEntity };

type ProfilerQBProperties =
  | 'profilerId'
  | 'Expected Points Added'
  | 'Pass EPA'
  | 'Rush EPA'
  | 'Fantasy Points Per Game'
  | 'Production Premium'
  | 'Production Premium Rank'
  | 'Total QBR'
  | 'Offensive Line Rank'
  | 'Air Yards Per Attempt'
  | 'Air Yards Per Game'
  | 'Attempts Inside 10 Per Game'
  | 'Carries Inside 5 Per Game'
  | 'Pass Attempt Distance'
  | 'Passing Attempts'
  | 'Deep Ball Attempts Rank'
  | 'Deep Ball Completion Percentage'
  | 'Under Pressure Attempts Rank'
  | 'Pressured Completion Percentage'
  | 'Protection Rate'
  | 'Receiver Target Separation'
  | 'Catchable Passes Per Game'
  | 'Attempts Per Game'
  | 'Receiver Contested Catch Rate'
  | 'Supporting Cast Efficiency'
  | 'Receiver Yards After The Catch Per Target'
  | 'Interceptable Passes'
  | 'Play-action Pass Completion Percentage'
  | 'True Passer Rating'
  | 'Under Pressure Attempts Per Game'
  | 'Weekly Volatility';

type ProfilerRBProperties =
  | 'profilerId'
  | 'Expected Points Added'
  | 'Rush EPA'
  | 'Receiving EPA'
  | 'Fantasy Points Per Game'
  | 'Production Premium'
  | 'Production Premium Rank'
  | 'Dominator Rating'
  | 'Goal Line Carries Per Game'
  | 'Game Script'
  | 'Breakaway Run Rate'
  | 'Evaded Tackles'
  | 'Juke Rate'
  | 'Stacked Front Carry Rate'
  | 'Base Front Carry Rate'
  | 'Light Front Carry Rate'
  | 'Offensive Line Rank'
  | 'Opportunity Share'
  | 'Weekly Volatility'
  | 'Yards Per Carry'
  | 'Stacked Front Yards Per Carry'
  | 'Base Front Yards Per Carry'
  | 'Light Front Yards Per Carry'
  | 'Red Zone Opportunity Share'
  | 'Run Blocking Efficiency Rank'
  | 'Weighted Opportunities Per Game'
  | 'Yards Created Per Touch';

type ProfilerReceiverProperties =
  | 'profilerId'
  | 'Expected Points Added'
  | 'EPA Per Target'
  | 'Production Premium'
  | 'Target Premium'
  | 'Dominator Rating'
  | 'Route Participation'
  | 'Yards Per Route Run'
  | 'Fantasy Points Per Game'
  | 'Fantasy Points Per Route Run'
  | 'Catchable Target Rate'
  | 'Average Target Distance'
  | 'Air Yards Per Target'
  | 'Air Yards Share'
  | 'Target Share'
  | 'Deep Targets Per Game'
  | 'Red Zone Target Share'
  | 'Slot Rate'
  | 'Contested Catch Conversion Rate'
  | 'Drop Rate'
  | 'Target Separation'
  | 'Hog Rate'
  | 'Weekly Volatility'
  | 'Likely CB'
  | 'Matchup Rtg';

export interface NFLClientSalaryDiff {
  diff: number;
  position: string;
  rank: number;
  rank_diff: number;
  salary: string;
}

type EcrProps = 'rank | avg';
export type NFLClientEcr = { [prop in EcrProps]: string };

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

export type NFLClientSafptsProperties = { [prop in SafptsProperties]: string };
export type NFLClientOutsidersProperties = { [prop in OutsidersProperties]: string };

export type NFLClientProfilerQBProperties = { [prop in ProfilerQBProperties]: string };
export type NFLClientProfilerRBProperties = { [prop in ProfilerRBProperties]: string };
export type NFLClientProfilerReceiverProperties = { [prop in ProfilerReceiverProperties]: string };

export type NFLClientProfilerTimeFrameEntity = Record<
  number,
  NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties
>;

export type SalaryDiffByDfsSiteType = Record<DfsSiteType, NFLClientSalaryDiff>;
export type PlayerAttributesByDfsSite = Record<DfsSiteType, string>;
export type PlayerOwnershipByDfsSiteTypeBySlate = Record<DfsSiteType, Record<number, string>>;
export type PlayerEcrByDfsSiteType = Record<DfsSiteType, NFLClientEcr>;
