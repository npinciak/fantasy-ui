import { SlateAttrTeamProperties } from '@app/dfs/models/team.model';
import { ClientSalaryDiff } from '@dfsClient/daily-fantasy-client-slate-attr.model';

type SafptsAttributes =
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

type OutsidersAttributes =
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

export interface NFLSlateAttrTeamAttributes {
  safpts: NFLClientSafptsProperties;
  outsiders: NFLClientOutsidersProperties;
}

export type NFLClientSlateAttrTeam = SlateAttrTeamProperties & NFLSlateAttrTeamAttributes;
export type NFLClientSlateAttrTeamMap = Record<string, SlateAttrTeamProperties & NFLSlateAttrTeamAttributes>;

export type NFLClientStatGroupAttributes = 'qb' | 'rb' | 'te' | 'wr';
export type NFLClientStatGroup = { [attr in NFLClientStatGroupAttributes]: NFLClientProfiler };

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfiler = { profiler: NFLClientProfilerEntity };

/** @deprecated data unavailable as of 10.5.2023 */
export type ProfilerTimeFrameAttributes = 'season' | 'last-season' | 'combined';

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfilerEntity = { [attr in ProfilerTimeFrameAttributes]?: NFLClientProfilerTimeFrameEntity };

/** @deprecated data unavailable as of 10.5.2023 */
type ProfilerQBAttributes =
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

/** @deprecated data unavailable as of 10.5.2023 */
type ProfilerRBAttributes =
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

/** @deprecated data unavailable as of 10.5.2023 */
type ProfilerReceiverAttributes =
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

export type NFLClientSalaryDiff = ClientSalaryDiff;

type EcrAttributes = 'rank | avg';
export type NFLClientEcr = { [attr in EcrAttributes]: string };

export interface NFLClientGridIronPlayer {
  PLAYERID: string;
  PLAYER: string;
  SALARY: string;
  OPP?: string | null;
  POS?: string | null;
  TEAM?: string | null;
  SCHEDULE_ID?: string | null;
  PAATT: string;
  COMP: string;
  PAYDS: string;
  PATD: string;
  INT: string;
  RUATT: string;
  RUYDS: string;
  RUTD: string;
  TAR: string;
  REC: string;
  REYDS: string;
  RETD: string;
  FPTS: string;
  'FPTS/$': string;
  FLOOR: string;
  CEIL: string;
  SMASH?: string | null;
  VALUE?: string | null;
  POWN: string;
  PARTNERID: string;
  OWNERSHIP: Record<string, string>;
  RGID: string;
}

export type NFLClientGridIronPlayerMap = Record<string, NFLClientGridIronPlayer>;

export type NFLClientSafptsProperties = { [attr in SafptsAttributes]: string };
export type NFLClientOutsidersProperties = { [attr in OutsidersAttributes]: string };

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfilerQBProperties = { [attr in ProfilerQBAttributes]: string };

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfilerRBProperties = { [attr in ProfilerRBAttributes]: string };

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfilerReceiverProperties = { [attr in ProfilerReceiverAttributes]: string };

/** @deprecated data unavailable as of 10.5.2023 */
export type NFLClientProfilerTimeFrameEntity = {
  [playerId: number]: NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties;
};
