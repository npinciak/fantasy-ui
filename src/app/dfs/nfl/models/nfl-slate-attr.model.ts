import { DfsSiteType } from '@app/dfs/dfs.const';

export interface NFLClientSlateAttributes {
  stat_groups: NFLClientStatGroup;
  players: NFLClientPlayer;
  teams: NFLClientTeam;
}

export interface NFLClientStatGroup {
  qb: NFLClientProfiler;
  rb: NFLClientProfiler;
  te: NFLClientProfiler;
  wr: NFLClientProfiler;
}

export interface NFLClientPlayer {
  [id: string]: NFLClientPlayerAttributes;
}

export interface NFLClientPlayerAttributes {
  team: string;
  xml_id: string;
  salary_diff: any;
  stat_group: string;
  slate_ownership: NFLClientSlateOwnershipBySite;
  ownership: NFLClientPlayerAttributesBySite;
  value_pct: NFLClientPlayerAttributesBySite;
  smash_pct: NFLClientPlayerAttributesBySite;
  ecr: {
    20: {
      rank: string;
      avg: string;
    };
  };
}

export interface NFLClientSlateOwnershipBySite {
  [DfsSiteType.FanDuel]: { [id: number]: string };
  [DfsSiteType.DraftKings]: { [id: number]: string };
  [DfsSiteType.Yahoo]: { [id: number]: string };
}

export interface NFLClientPlayerAttributesBySite {
  [DfsSiteType.FanDuel]: string;
  [DfsSiteType.DraftKings]: string;
  [DfsSiteType.Yahoo]: string;
}

export interface NFLClientTeam {
  [id: string]: NFLClientTeamAttributes;
}

export interface NFLClientTeamAttributes {
  vegas: {
    line: number;
    total: number;
    movement: number;
    'o/u': number;
    opp_total: number;
  };
  safpts: {
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
  };
  outsiders: {
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
  };
}

// 'D Power': '70%';
//     'D Power Rk': '24';
//     'D Stuffed': '13%';
//     'D Stuffed Rk': '25';
//     'DL SkRate': '7.5%';
//     'DL SkRate Rk': '10';
//     'O Power': '67%';
//     'O Power Rk': '14';
//     'O Stuffed': '17%';
//     'O Stuffed Rk': '18';
//     'OL SkRate': '7.2%';
//     'OL SkRate Rk': '21';
//     'Opp PaDef': '102.96';
//     'Opp PaDef Rk': '9';
//     'Opp RuDef': '99.71';
//     'Opp RuDef Rk': '18';
//     PaOff: '88.93';
//     'PaOff Rk': '32';
//     RuOff: '99.16';
//     'RuOff Rk': '21';

export interface NFLClientProfiler {
  profiler: {
    season: {
      [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver;
    };
    'last-season': {
      [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver;
    };
    combined: {
      [id: string]: ProfilerInfoQB | ProfilerInfoRB | ProfilerInfoReceiver;
    };
  };
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
