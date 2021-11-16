/* eslint-disable @typescript-eslint/naming-convention */
export interface SlatePlayer {
  players: { [id: number]: SlatePlayerAttr };
}

export interface SlatePlayerAttr {
  hand: string;
  xml_id: string;
  team: string;
  stats: StatSplit;
  salary_diff: SalaryDiff;
  ownership: OwnershipOrSlateOwnership;
  slate_ownership: OwnershipOrSlateOwnership;
  batting_order: BattingOrder;
  stat_group: 'mlb-hitter' | 'mlb-pitcher';
  plateiq: Plateiq;
  ecr: Ecr;
}

export interface Ecr {
  2: { rank: number; average: number };
  20: { rank: number; average: number };
}

export interface StatSplit {
  'last-two': Stats;
  season: Stats;
  '12weeks': Stats;
  '4weeks': Stats;
  '2weeks': Stats;
  '1week': Stats;
  yesterday: YesterdayOr4weeksOr2weeksOr1week;
}
export interface Stats {
  xwoba: string;
  wellHitPct: string;
  obp: string;
  ops: string;
  slg: string;
  hbp: string;
  'hr/fb': string;
  k: string;
  sb: string;
  gp: string;
  ab: string;
  woba: string;
  iso: string;
  babip: string;
  avg: string;
  'k%': string;
  'bb%': string;
  muwoba: string;
  id: string;
  name: string;
}
export interface YesterdayOr4weeksOr2weeksOr1week {
  muwoba: string;
  ab: string;
  avg: string;
  woba: string;
  iso: string;
  obp: string;
  slg: string;
  'k%': string;
  'bb%': string;
  ops: string;
  babip: string;
  id: string;
  name: string;
}
export interface SalaryDiff {
  2: DKFD;
  20: DKFD;
  // 50: 50;
  // 71: 71;
}
export interface DKFD {
  salary: string;
  position: string;
  diff: number;
  rank_diff: number;
  rank: number;
}
//   export interface 50 {
//     salary: string;
//     position: string;
//     diff: number;
//     rank_diff: number;
//     rank: number;
//     diff_fd: number;
//     diff_dk: number;
//   }
//   export interface 71 {
//     salary: string;
//     position: string;
//   }
export interface OwnershipOrSlateOwnership {
  2?: null;
  20?: null;
  43?: null;
  50?: null;
}
export interface BattingOrder {
  order: number;
  confirmed: number;
}
export interface Plateiq {
  score: Score;
  factors: Factors;
}
export interface Score {
  contact: number;
  context: number;
  pitchTypes: number;
  production: number;
  plateDiscipline: number;
  recentSkill: number;
  stolenBase: number;
  sbFactor: number;
  overall: number;
}
export interface Factors {
  positive?: PositiveEntityOrNegativeEntity[] | null;
  negative?: PositiveEntityOrNegativeEntity[] | null;
  positiveCt: number;
  negativeCt: number;
}
export interface PositiveEntityOrNegativeEntity {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
}

//   export interface 11113Or16227Or17648Or36727Or1054004 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     ecr: Ecr;
//     plateiq: Plateiq;
//   }
//   export interface Ecr {
//     2: 2Or20Or50;
//     20: 2Or20Or50;
//     50: 2Or20Or50;
//   }
//   export interface 2Or20Or50 {
//     rank: number;
//     average: number;
//   }
//   export interface 11184 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     props: Props;
//     plateiq: Plateiq;
//   }
//   export interface Props {
//     home runs: string;
//   }
//   export interface 11306Or17712Or37483Or1031165Or1203809 {
//     props: Props1;
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     plateiq: Plateiq;
//   }
//   export interface Props1 {
//     home runs: string;
//     hits: string;
//     rbis: string;
//   }
//   export interface 13412 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats1;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     stat_group: string;
//     props: Props2;
//     ecr: Ecr;
//     plateiq: Plateiq1;
//   }

//   export interface Stats1 {
//     last-two: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     season: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     12weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     4weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     2weeks: 2weeksOr1weekOr4weeks;
//     1week: 2weeksOr1weekOr4weeks;
//   }
//   export interface Last-twoOrSeasonOr12weeksOr4weeksOr2weeks {
//     KPct: string;
//     BBPct: string;
//     xwoba: string;
//     hr/fb: string;
//     LDPct: string;
//     GBPct: string;
//     FBPct: string;
//     obpa: string;
//     wobaa: string;
//     swStrkPct: string;
//     gp: string;
//     ip: string;
//     era: string;
//     whip: string;
//     siera: string;
//     xfip: string;
//     lwoba: string;
//     liso: string;
//     lk/9: string;
//     lslg: string;
//     lk%: string;
//     rwoba: string;
//     riso: string;
//     rk/9: string;
//     rslg: string;
//     rk%: string;
//     hwoba: string;
//     hiso: string;
//     hk/9: string;
//     hslg: string;
//     hk%: string;
//     awoba: string;
//     aiso: string;
//     ak/9: string;
//     aslg: string;
//     ak%: string;
//     xiso: string;
//     xslg: string;
//     xk/9: string;
//     xk%: string;
//     xl: number;
//     xr: number;
//     id: string;
//     name: string;
//   }
//   export interface 2weeksOr1weekOr4weeks {
//     KPct: string;
//     BBPct: string;
//     xwoba: string;
//     hr/fb: string;
//     LDPct: string;
//     GBPct: string;
//     FBPct: string;
//     obpa: string;
//     wobaa: string;
//     swStrkPct: string;
//     gp: string;
//     ip: string;
//     era: string;
//     whip: string;
//     siera: string;
//     xfip: string;
//     lwoba: string;
//     liso: string;
//     lk/9: string;
//     lslg: string;
//     lk%: string;
//     rwoba: string;
//     riso: string;
//     rk/9: string;
//     rslg: string;
//     rk%: string;
//     awoba: string;
//     aiso: string;
//     ak/9: string;
//     aslg: string;
//     ak%: string;
//     xiso: string;
//     xslg: string;
//     xk/9: string;
//     xk%: string;
//     xl: number;
//     xr: number;
//     id: string;
//     name: string;
//   }
//   export interface Props2 {
//     strikeouts: string;
//     hits: string;
//     rbis: string;
//   }
//   export interface Plateiq1 {
//     score: Score1;
//     factors?: (null)[] | null;
//   }
//   export interface Score1 {
//     context: number;
//     contact: number;
//     production: number;
//     recentSkill: number;
//     plateDiscipline: number;
//     pitchTypes: number;
//     KMatchup: number;
//     overall: number;
//   }
//   export interface 13534Or1452313 {
//     props: Props3;
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     ecr: Ecr;
//     plateiq: Plateiq;
//   }
//   export interface Props3 {
//     home runs: string;
//     steals: string;
//     hits: string;
//     rbis: string;
//   }
//   export interface 15528 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     plateiq: Plateiq2;
//   }
//   export interface Plateiq2 {
//     score: Score;
//     factors: Factors1;
//   }
//   export interface Factors1 {
//     positive?: (null)[] | null;
//     negative?: (PositiveEntityOrNegativeEntity)[] | null;
//     positiveCt: number;
//     negativeCt: number;
//   }
//   export interface 16176 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats2;
//     salary_diff: SalaryDiff1;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     stat_group: string;
//     ecr: Ecr;
//   }
//   export interface Stats2 {
//     last-two: Stats;
//     season: Stats;
//     12weeks: Stats;
//     4weeks: YesterdayOr4weeksOr2weeksOr1week;
//     2weeks: YesterdayOr4weeksOr2weeksOr1week;
//     1week: YesterdayOr4weeksOr2weeksOr1week;
//     yesterday: YesterdayOr4weeksOr2weeksOr1week;
//   }
//   export interface SalaryDiff1 {
//     2: 2Or20;
//     20: 2Or20;
//     50: 50;
//   }
//   export interface 16203 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats2;
//     salary_diff: SalaryDiff1;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     ecr: Ecr;
//     plateiq: Plateiq2;
//   }
//   export interface 16300 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     ecr: Ecr1;
//     plateiq: Plateiq;
//   }
//   export interface Ecr1 {
//     50: 2Or20Or50;
//   }
//   export interface 16363 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats3;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     stat_group: string;
//     plateiq: Plateiq1;
//   }
//   export interface Stats3 {
//     last-two: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     season: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     12weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     4weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     2weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     1week: 2weeksOr1weekOr4weeks;
//   }
//   export interface 16460Or34704 {
//     props: Props3;
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     plateiq: Plateiq;
//   }
//   export interface 17740 {
//     props: Props3;
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     plateiq: Plateiq;
//     ecr: Ecr2;
//   }
//   export interface Ecr2 {
//     2: 2Or20Or50;
//   }
//   export interface 17869 {
//     props: Props1;
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     ecr: Ecr;
//     plateiq: Plateiq;
//   }
//   export interface 34706 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats3;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     stat_group: string;
//     props: Props4;
//     ecr: Ecr3;
//     plateiq: Plateiq1;
//   }
//   export interface Props4 {
//     strikeouts: string;
//     rbis: string;
//   }
//   export interface Ecr3 {
//     2: 2Or20Or50;
//     20: 2Or20Or50;
//   }
//   export interface 814507 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     props: Props5;
//     plateiq: Plateiq;
//   }
//   export interface Props5 {
//     home runs: string;
//     steals: string;
//   }
//   export interface 1000763 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     batting_order: BattingOrder;
//     stat_group: string;
//     plateiq: Plateiq;
//     ecr: Ecr3;
//   }
//   export interface 1452703 {
//     hand: string;
//     xml_id: string;
//     team: string;
//     stats: Stats4;
//     salary_diff: SalaryDiff;
//     ownership: OwnershipOrSlateOwnership;
//     slate_ownership: OwnershipOrSlateOwnership;
//     stat_group: string;
//     plateiq: Plateiq1;
//   }
//   export interface Stats4 {
//     last-two: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     season: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     12weeks: Last-twoOrSeasonOr12weeksOr4weeksOr2weeks;
//     4weeks: 2weeksOr1weekOr4weeks;
//     2weeks: 2weeksOr1weekOr4weeks;
//     1week: 2weeksOr1weekOr4weeks;
//   }
