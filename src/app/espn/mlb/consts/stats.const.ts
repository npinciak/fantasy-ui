import { FilterOptions } from '@app/@shared/models/filter.model';
import { StatThreshold } from '@app/@shared/models/stat-threshold.model';
import { SeasonConst } from '../models/adv-stats.model';
import { StatCategory, StatsMap, StatType, StatTypePeriodId } from '../models/mlb-stats.model';

export const STAT_PERIOD_FILTER_OPTIONS: FilterOptions[] = [
  { value: YearToStatTypePeriod(StatTypePeriodId.Season, 2021), label: '2021 Season' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Projected, 2022), label: '2022 Projected' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Season, 2022), label: '2022 Season' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Last7, 2022), label: 'Last 7' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Last15, 2022), label: 'Last 15' },
  { value: YearToStatTypePeriod(StatTypePeriodId.Last30, 2022), label: 'Last 30' },
];

export function YearToStatTypePeriod(periodType: StatTypePeriodId, year: number) {
  if (periodType === StatTypePeriodId.Projected) return `${periodType}${year}`;
  else return `0${periodType}${year}`;
}

export function StatTypePeriodToYear(statTypePeriod: string): string {
  return statTypePeriod.split('').splice(2, 6).join('');
}

export const MLB_WEIGHTED_STATS: Record<string, SeasonConst> = {
  '2020': {
    wOBA: 0,
    wOBAScale: 0,
    runSB: 0,
    runCS: 0,
    wBB: 0.699,
    wHBP: 0.728,
    w1B: 0.883,
    w2B: 1.238,
    w3B: 1.558,
    wHR: 1.979,
    'r/PA': 0,
    'r/W': 0,
    cFIP: 0,
  },
  '2021': {
    wOBA: 0.314,
    wOBAScale: 1.209,
    runSB: 0.2,
    runCS: -0.419,
    wBB: 0.711,
    wHBP: 0.742,
    w1B: 0.901,
    w2B: 1.269,
    w3B: 1.6,
    wHR: 2.035,
    cFIP: 3.17,
    'r/PA': 0.121,
    'r/W': 9.973,
  },
  '2022': {
    wOBA: 0.305,
    wOBAScale: 1.34,
    runSB: 0.2,
    runCS: -0.374,
    wBB: 0.694,
    wHBP: 0.727,
    w1B: 0.901,
    w2B: 1.303,
    w3B: 1.665,
    wHR: 2.182,
    cFIP: 3.038,
    'r/PA': 0.107,
    'r/W': 9.062,
  },
};

export const wRAAThreshold: { [key in StatThreshold]: number } = {
  [StatThreshold.excellent]: 40,
  [StatThreshold.great]: 20,
  [StatThreshold.aboveAvg]: 10,
  [StatThreshold.avg]: 0,
  [StatThreshold.belowAvg]: -5,
  [StatThreshold.poor]: -10,
  [StatThreshold.awful]: -20,
};

export const wOBAThreshold: { [key in StatThreshold]: number } = {
  [StatThreshold.excellent]: 0.4,
  [StatThreshold.great]: 0.37,
  [StatThreshold.aboveAvg]: 0.34,
  [StatThreshold.avg]: 0.32,
  [StatThreshold.belowAvg]: 0.31,
  [StatThreshold.poor]: 0.3,
  [StatThreshold.awful]: 0.29,
};

export const MLB_STATS_MAP: StatsMap = {
  0: { abbrev: 'AB', description: 'At Bats', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  1: { abbrev: 'H', description: 'Hits', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  2: { abbrev: 'AVG', description: 'Batting Average', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  3: { abbrev: '2B', description: 'Doubles', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  4: { abbrev: '3B', description: 'Triples', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  5: { abbrev: 'HR', description: 'Home Runs', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  6: { abbrev: 'XBH', description: 'Extra Base Hits', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  7: { abbrev: '1B', description: 'Singles', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  8: { abbrev: 'TB', description: 'Total Bases', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  9: { abbrev: 'SLG', description: 'Slugging Pct', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  10: { abbrev: 'BB', description: 'Walks', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  11: { abbrev: 'IBB', description: 'Intentional Walks', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  12: { abbrev: 'HBP', description: 'Hit by Pitch', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  13: { abbrev: 'SF', description: 'Sacrifice Flies', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  14: { abbrev: 'SH', description: 'Sacrifice Hits', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  15: { abbrev: 'SAC', description: 'Sacrifices', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  16: { abbrev: 'PA', description: 'Plate Appearances', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  17: { abbrev: 'OBP', description: 'On Base Pct', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  18: { abbrev: 'OPS', description: 'On Base plus Slugging Pct', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  19: { abbrev: 'RC', description: 'Runs Created', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  20: { abbrev: 'R', description: 'Runs Scored', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  21: { abbrev: 'RBI', description: 'Runs Batted In', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  22: { abbrev: 'GWRBI', description: 'Game Winning RBI', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  23: { abbrev: 'SB', description: 'Stolen Bases', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  24: { abbrev: 'CS', description: 'Caught Stealing', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  25: { abbrev: 'SBN', description: 'Net Stolen Bases', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  26: { abbrev: 'GIDP', description: 'Ground into Double Plays', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  27: { abbrev: 'KO', description: 'Strikeouts', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  28: { abbrev: 'TP', description: 'Total Pitches', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  29: { abbrev: 'PPA', description: 'Pitches per Plate Appearance', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  30: { abbrev: 'CYC', description: 'Hitting for the Cycle', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  31: { abbrev: 'GSHR', description: 'Grand Slam Home Runs', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  32: { abbrev: 'APP', description: 'Appearances', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  33: { abbrev: 'GS', description: 'Games Started', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  34: { abbrev: 'IP', description: 'Innings Pitched', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  35: { abbrev: 'BF', description: 'Batters Faced', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  36: { abbrev: 'PC', description: 'Pitch Count', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  37: { abbrev: 'HA', description: 'Hits Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  38: { abbrev: 'BAA', description: 'Batting Average Against', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  39: { abbrev: 'BBI', description: 'Walks Issued', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  40: { abbrev: 'IBBI', description: 'Intentional Walks', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  41: {
    abbrev: 'WHIP',
    description: 'Walks plus Hits Per Innings Pitched',
    statCategoryId: StatCategory.Pitching,
    statTypeId: StatType.Pitching,
  },
  42: { abbrev: 'HB', description: 'Hit Batsmen', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  43: { abbrev: 'OBA', description: 'On Base Pct Against', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  44: { abbrev: 'RA', description: 'Runs Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  45: { abbrev: 'ER', description: 'Earned Runs', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  46: { abbrev: 'HRA', description: 'Home Runs Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  47: { abbrev: 'ERA', description: 'Earned Run Average', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  48: { abbrev: 'K', description: 'Strikeouts', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  49: { abbrev: 'K/9', description: 'Strikeouts per 9 Innings', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  50: { abbrev: 'WP', description: 'Wild Pitches', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  51: { abbrev: 'B', description: 'Balks', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  52: { abbrev: 'PKO', description: 'Pick Offs', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  53: { abbrev: 'W', description: 'Wins', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  54: { abbrev: 'L', description: 'Losses', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  55: { abbrev: 'WIN%', description: 'Win Pct', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  56: { abbrev: 'SOP', description: 'Save Opportunities', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  57: { abbrev: 'SV', description: 'Saves', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  58: { abbrev: 'BS', description: 'Blown Saves', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  59: { abbrev: 'SV%', description: 'Save Pct', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  60: { abbrev: 'HD', description: 'Holds', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  61: { abbrev: 'IRS', description: 'Inherited Runners Scored', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  62: { abbrev: 'CG', description: 'Complete Games', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  63: { abbrev: 'QS', description: 'Quality Starts', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  64: { abbrev: 'SO', description: 'Shutouts', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  65: { abbrev: 'NH', description: 'No Hitters', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  66: { abbrev: 'PG', description: 'Perfect Games', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  67: { abbrev: 'FC', description: 'Fielding Chances', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  68: { abbrev: 'PO', description: 'Put Outs', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  69: { abbrev: 'AST', description: 'Assists', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  70: { abbrev: 'OFAST', description: 'Outfield Assists', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  71: { abbrev: 'FPCT', description: 'Fielding Pct', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  72: { abbrev: 'E', description: 'Errors', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  73: { abbrev: 'DPT', description: 'Double Plays Turned', statCategoryId: StatCategory.Batting, statTypeId: StatType.Defense },
  74: { abbrev: 'BTW', description: 'Batter Team Win', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  75: { abbrev: 'BTL', description: 'Batter Team Loss', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  76: { abbrev: 'PTW', description: 'Pitcher Team Win', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  77: { abbrev: 'PTL', description: 'Pitcher Team Loss', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  78: { abbrev: 'SFA', description: 'Sacrifice Flies Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  79: { abbrev: 'SHA', description: 'Sacrifice Hits Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  80: { abbrev: 'CIA', description: 'Catcher Interference Allowed', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  81: { abbrev: 'GP', description: 'Games Played', statCategoryId: StatCategory.Batting, statTypeId: StatType.Batting },
  82: { abbrev: 'K/BB', description: 'Strikeout to Walk Ratio', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  83: { abbrev: 'SVHD', description: 'Saves Plus Holds', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  84: { abbrev: 'PBS', description: 'Probable Start', statCategoryId: StatCategory.Pitching, statTypeId: StatType.Pitching },
  100: {
    abbrev: 'FIP',
    description: 'Fielding Independent Pitching (FIP)',
    statCategoryId: StatCategory.Pitching,
    statTypeId: StatType.Pitching,
  },
  101: {
    abbrev: 'wOBA',
    description: 'Weighted On-Base Average (wOBA)',
    statCategoryId: StatCategory.Batting,
    statTypeId: StatType.Batting,
  },
  102: {
    abbrev: 'wRAA',
    description: 'Weighted Runs Above Average (wRAA)',
    statCategoryId: StatCategory.Batting,
    statTypeId: StatType.Batting,
  },
  103: {
    abbrev: 'BABIP',
    description: 'Batting Average on Balls In Play',
    statCategoryId: StatCategory.Pitching,
    statTypeId: StatType.Pitching,
  },
  104: {
    abbrev: 'ISO',
    description: 'Isolated Power',
    statCategoryId: StatCategory.Batting,
    statTypeId: StatType.Batting,
  },
};

export const MLB_STATS_LIST = Object.values(MLB_STATS_MAP);
export const MLB_STATS_KEYS = Object.keys(MLB_STATS_MAP);

export const BATTER_STATS_LIST = MLB_STATS_LIST.filter(s => s.statTypeId === StatType.Batting);
export const BATTER_STATS_CATEGORY_LIST = MLB_STATS_LIST.filter(s => s.statCategoryId === StatCategory.Batting);

export const PITCHER_STATS_LIST = MLB_STATS_LIST.filter(s => s.statTypeId === StatType.Pitching);
export const PITCHER_STATS_CATEGORY_LIST = MLB_STATS_LIST.filter(s => s.statCategoryId === StatCategory.Pitching);

export const DEFENSE_STATS_LIST = MLB_STATS_LIST.filter(s => s.statTypeId === StatType.Defense);
