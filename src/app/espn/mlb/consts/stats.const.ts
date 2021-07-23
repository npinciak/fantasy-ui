interface Stats {
  [key: number]: {
    abbrev: string;
    description: string;
    displayOrder?: number;
    statCategoryId?: number;
    statTypeId?: number;
    statDerivation?: unknown;
  };
}

export const MLB_STATS: Stats = {
  0: {
    abbrev: 'AB',
    description: 'At Bats',
    displayOrder: 2,
    statCategoryId: 1,
    statTypeId: 1,
  },
  1: {
    abbrev: 'H',
    description: 'Hits',
    displayOrder: 3,
    statCategoryId: 1,
    statTypeId: 1,
  },
  2: {
    abbrev: 'AVG',
    description: 'Batting Average',
    displayOrder: 30,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 'null',
      derivedFromStats: {
        a: 1,
        b: 0,
      },
      equation: 'a / b',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  3: {
    abbrev: '2B',
    description: 'Doubles',
    displayOrder: 7,
    statCategoryId: 1,
    statTypeId: 1,
  },
  4: {
    abbrev: '3B',
    description: 'Triples',
    displayOrder: 8,
    statCategoryId: 1,
    statTypeId: 1,
  },
  5: {
    abbrev: 'HR',
    description: 'Home Runs',
    displayOrder: 9,
    statCategoryId: 1,
    statTypeId: 1,
  },
  6: {
    abbrev: 'XBH',
    description: 'Extra Base Hits',
    displayOrder: 10,
    statCategoryId: 1,
    statTypeId: 1,
  },
  7: {
    abbrev: '1B',
    description: 'Singles',
    displayOrder: 6,
    statCategoryId: 1,
    statTypeId: 1,
  },
  8: {
    abbrev: 'TB',
    description: 'Total Bases',
    displayOrder: 11,
    statCategoryId: 1,
    statTypeId: 1,
  },
  9: {
    abbrev: 'SLG',
    description: 'Slugging Pct',
    displayOrder: 32,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 'null',
      derivedFromStats: {
        a: 1,
        b: 3,
        c: 4,
        d: 5,
        e: 0,
      },
      equation: '(a + b + c*2 + d*3) / e',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  10: {
    abbrev: 'BB',
    description: 'Walks',
    displayOrder: 14,
    statCategoryId: 1,
    statTypeId: 1,
  },
  11: {
    abbrev: 'IBB',
    description: 'Intentional Walks',
    displayOrder: 15,
    statCategoryId: 1,
    statTypeId: 1,
  },
  12: {
    abbrev: 'HBP',
    description: 'Hit by Pitch',
    displayOrder: 17,
    statCategoryId: 1,
    statTypeId: 1,
  },
  13: {
    abbrev: 'SF',
    description: 'Sacrifice Flies',
    displayOrder: 18,
    statCategoryId: 1,
    statTypeId: 1,
  },
  14: {
    abbrev: 'SH',
    description: 'Sacrifice Hits',
    displayOrder: 19,
    statCategoryId: 1,
    statTypeId: 1,
  },
  15: {
    abbrev: 'SAC',
    description: 'Sacrifices',
    displayOrder: 20,
    statCategoryId: 1,
    statTypeId: 1,
  },
  16: {
    abbrev: 'PA',
    description: 'Plate Appearances',
    displayOrder: 4,
    statCategoryId: 1,
    statTypeId: 1,
  },
  17: {
    abbrev: 'OBP',
    description: 'On Base Pct',
    displayOrder: 31,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 1,
        b: 10,
        c: 12,
        d: 0,
        e: 13,
      },
      equation: '(a + b + c) / (d + b + c + e)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  18: {
    abbrev: 'OPS',
    description: 'On Base plus Slugging Pct',
    displayOrder: 33,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 1,
        b: 3,
        c: 4,
        d: 5,
        e: 10,
        f: 12,
        g: 13,
        h: 0,
      },
      equation: '((a + e + f) / (h + e + f + g)) + ((a + b + c*2 + d*3) / h)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  19: {
    abbrev: 'RC',
    description: 'Runs Created',
    displayOrder: 21,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 1,
        b: 10,
        c: 3,
        d: 4,
        e: 5,
        f: 0,
      },
      equation: '((a + b) * (a + c + d*2 + e*3 )) / (f + b)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  20: {
    abbrev: 'R',
    description: 'Runs Scored',
    displayOrder: 5,
    statCategoryId: 1,
    statTypeId: 1,
  },
  21: {
    abbrev: 'RBI',
    description: 'Runs Batted In',
    displayOrder: 12,
    statCategoryId: 1,
    statTypeId: 1,
  },
  22: {
    abbrev: 'GWRBI',
    description: 'Game Winning RBI',
    displayOrder: 13,
    statCategoryId: 1,
    statTypeId: 1,
  },
  23: {
    abbrev: 'SB',
    description: 'Stolen Bases',
    displayOrder: 22,
    statCategoryId: 1,
    statTypeId: 1,
  },
  24: {
    abbrev: 'CS',
    description: 'Caught Stealing',
    displayOrder: 23,
    statCategoryId: 1,
    statTypeId: 1,
  },
  25: {
    abbrev: 'SBN',
    description: 'Net Stolen Bases',
    displayOrder: 24,
    statCategoryId: 1,
    statTypeId: 1,
  },
  26: {
    abbrev: 'GIDP',
    description: 'Ground into Double Plays',
    displayOrder: 25,
    statCategoryId: 1,
    statTypeId: 1,
  },
  27: {
    abbrev: 'KO',
    description: 'Strikeouts',
    displayOrder: 16,
    statCategoryId: 1,
    statTypeId: 1,
  },
  28: {
    abbrev: 'TP',
    description: 'Total Pitches',
    displayOrder: 26,
    statCategoryId: 1,
    statTypeId: 1,
  },
  29: {
    abbrev: 'PPA',
    description: 'Pitches per Plate Appearance',
    displayOrder: 27,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 28,
        b: 0,
        c: 10,
        d: 12,
        e: 13,
        f: 14,
      },
      equation: 'a / (b + c + d + e + f)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 1,
  },
  30: {
    abbrev: 'CYC',
    description: 'Hitting for the Cycle',
    displayOrder: 28,
    statCategoryId: 1,
    statTypeId: 1,
  },
  31: {
    abbrev: 'GSHR',
    description: 'Grand Slam Home Runs',
    displayOrder: 29,
    statCategoryId: 1,
    statTypeId: 1,
  },
  32: {
    abbrev: 'APP',
    description: 'Appearances',
    displayOrder: 43,
    statCategoryId: 2,
    statTypeId: 2,
  },
  33: {
    abbrev: 'GS',
    description: 'Games Started',
    displayOrder: 44,
    statCategoryId: 2,
    statTypeId: 2,
  },
  34: {
    abbrev: 'IP',
    description: 'Innings Pitched',
    displayOrder: 45,
    statCategoryId: 2,
    statTypeId: 2,
  },
  35: {
    abbrev: 'BF',
    description: 'Batters Faced',
    displayOrder: 63,
    statCategoryId: 2,
    statTypeId: 2,
  },
  36: {
    abbrev: 'PC',
    description: 'Pitch Count',
    displayOrder: 64,
    statCategoryId: 2,
    statTypeId: 2,
  },
  37: {
    abbrev: 'HA',
    description: 'Hits Allowed',
    displayOrder: 46,
    statCategoryId: 2,
    statTypeId: 2,
  },
  38: {
    abbrev: 'BAA',
    description: 'Batting Average Against',
    displayOrder: 73,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 'Infinity',
      derivedFromStats: {
        a: 37,
        b: 35,
        c: 39,
        d: 42,
        e: 78,
        f: 79,
        g: 80,
      },
      equation: 'a / (b - c - d - e - f - g)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  39: {
    abbrev: 'BBI',
    description: 'Walks Issued',
    displayOrder: 50,
    statCategoryId: 2,
    statTypeId: 2,
  },
  40: {
    abbrev: 'IBBI',
    description: 'Intentional Walks',
    displayOrder: 51,
    statCategoryId: 2,
    statTypeId: 2,
  },
  41: {
    abbrev: 'WHIP',
    description: 'Walks plus Hits Per Innings Pitched',
    displayOrder: 76,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 'Infinity',
      derivedFromStats: {
        a: 37,
        b: 39,
        c: 34,
      },
      equation: '((a + b) * 3.0) / c',
      invalidStatCheck: ['a', 'b'],
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  42: {
    abbrev: 'HB',
    description: 'Hit Batsmen',
    displayOrder: 52,
    statCategoryId: 2,
    statTypeId: 2,
  },
  43: {
    abbrev: 'OBA',
    description: 'On Base Pct Against',
    displayOrder: 75,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 'Infinity',
      derivedFromStats: {
        a: 37,
        b: 39,
        c: 42,
        d: 35,
      },
      equation: '(a + b + c) / d',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  44: {
    abbrev: 'RA',
    description: 'Runs Allowed',
    displayOrder: 47,
    statCategoryId: 2,
    statTypeId: 2,
  },
  45: {
    abbrev: 'ER',
    description: 'Earned Runs',
    displayOrder: 48,
    statCategoryId: 2,
    statTypeId: 2,
  },
  46: {
    abbrev: 'HRA',
    description: 'Home Runs Allowed',
    displayOrder: 49,
    statCategoryId: 2,
    statTypeId: 2,
  },
  47: {
    abbrev: 'ERA',
    description: 'Earned Run Average',
    displayOrder: 74,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 'Infinity',
      derivedFromStats: {
        a: 45,
        b: 34,
      },
      equation: '(a * 27.0) / b',
      invalidStatCheck: ['a'],
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  48: {
    abbrev: 'K',
    description: 'Strikeouts',
    displayOrder: 53,
    statCategoryId: 2,
    statTypeId: 2,
  },
  49: {
    abbrev: 'K/9',
    description: 'Strikeouts per 9 Innings',
    displayOrder: 77,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 48,
        b: 34,
      },
      equation: '(a * 27.0) / b',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  50: {
    abbrev: 'WP',
    description: 'Wild Pitches',
    displayOrder: 54,
    statCategoryId: 2,
    statTypeId: 2,
  },
  51: {
    abbrev: 'B',
    description: 'Balks',
    displayOrder: 55,
    statCategoryId: 2,
    statTypeId: 2,
  },
  52: {
    abbrev: 'PKO',
    description: 'Pick Offs',
    displayOrder: 56,
    statCategoryId: 2,
    statTypeId: 2,
  },
  53: {
    abbrev: 'W',
    description: 'Wins',
    displayOrder: 65,
    statCategoryId: 2,
    statTypeId: 2,
  },
  54: {
    abbrev: 'L',
    description: 'Losses',
    displayOrder: 66,
    statCategoryId: 2,
    statTypeId: 2,
  },
  55: {
    abbrev: 'WIN%',
    description: 'Win Pct',
    displayOrder: 67,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 53,
        b: 54,
      },
      equation: 'a / (a + b)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  56: {
    abbrev: 'SOP',
    description: 'Save Opportunities',
    displayOrder: 68,
    statCategoryId: 2,
    statTypeId: 2,
  },
  57: {
    abbrev: 'SV',
    description: 'Saves',
    displayOrder: 69,
    statCategoryId: 2,
    statTypeId: 2,
  },
  58: {
    abbrev: 'BS',
    description: 'Blown Saves',
    displayOrder: 70,
    statCategoryId: 2,
    statTypeId: 2,
  },
  59: {
    abbrev: 'SV%',
    description: 'Save Pct',
    displayOrder: 71,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 57,
        b: 56,
      },
      equation: 'a / b',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  60: {
    abbrev: 'HD',
    description: 'Holds',
    displayOrder: 72,
    statCategoryId: 2,
    statTypeId: 2,
  },
  61: {
    abbrev: 'IRS',
    description: 'Inherited Runners Scored',
    displayOrder: 57,
    statCategoryId: 2,
    statTypeId: 2,
  },
  62: {
    abbrev: 'CG',
    description: 'Complete Games',
    displayOrder: 59,
    statCategoryId: 2,
    statTypeId: 2,
  },
  63: {
    abbrev: 'QS',
    description: 'Quality Starts',
    displayOrder: 58,
    statCategoryId: 2,
    statTypeId: 2,
  },
  64: {
    abbrev: 'SO',
    description: 'Shutouts',
    displayOrder: 60,
    statCategoryId: 2,
    statTypeId: 2,
  },
  65: {
    abbrev: 'NH',
    description: 'No Hitters',
    displayOrder: 61,
    statCategoryId: 2,
    statTypeId: 2,
  },
  66: {
    abbrev: 'PG',
    description: 'Perfect Games',
    displayOrder: 62,
    statCategoryId: 2,
    statTypeId: 2,
  },
  67: {
    abbrev: 'FC',
    description: 'Fielding Chances',
    displayOrder: 34,
    statCategoryId: 1,
    statTypeId: 3,
  },
  68: {
    abbrev: 'PO',
    description: 'Put Outs',
    displayOrder: 35,
    statCategoryId: 1,
    statTypeId: 3,
  },
  69: {
    abbrev: 'AST',
    description: 'Assists',
    displayOrder: 36,
    statCategoryId: 1,
    statTypeId: 3,
  },
  70: {
    abbrev: 'OFAST',
    description: 'Outfield Assists',
    displayOrder: 37,
    statCategoryId: 1,
    statTypeId: 3,
  },
  71: {
    abbrev: 'FPCT',
    description: 'Fielding Pct',
    displayOrder: 40,
    statCategoryId: 1,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 68,
        b: 69,
        c: 72,
      },
      equation: '(a + b) / (a + b + c)',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 3,
  },
  72: {
    abbrev: 'E',
    description: 'Errors',
    displayOrder: 38,
    statCategoryId: 1,
    statTypeId: 3,
  },
  73: {
    abbrev: 'DPT',
    description: 'Double Plays Turned',
    displayOrder: 39,
    statCategoryId: 1,
    statTypeId: 3,
  },
  74: {
    abbrev: 'BTW',
    description: 'Batter Team Win',
    displayOrder: 41,
    statCategoryId: 1,
    statTypeId: 1,
  },
  75: {
    abbrev: 'BTL',
    description: 'Batter Team Loss',
    displayOrder: 42,
    statCategoryId: 1,
    statTypeId: 1,
  },
  76: {
    abbrev: 'PTW',
    description: 'Pitcher Team Win',
    displayOrder: 78,
    statCategoryId: 2,
    statTypeId: 2,
  },
  77: {
    abbrev: 'PTL',
    description: 'Pitcher Team Loss',
    displayOrder: 79,
    statCategoryId: 2,
    statTypeId: 2,
  },
  78: {
    abbrev: 'SFA',
    description: 'Sacrifice Flies Allowed',
    displayOrder: 80,
    statCategoryId: 2,
    statTypeId: 2,
  },
  79: {
    abbrev: 'SHA',
    description: 'Sacrifice Hits Allowed',
    displayOrder: 81,
    statCategoryId: 2,
    statTypeId: 2,
  },
  80: {
    abbrev: 'CIA',
    description: 'Catcher Interference Allowed',
    displayOrder: 82,
    statCategoryId: 2,
    statTypeId: 2,
  },
  81: {
    abbrev: 'GP',
    description: 'Games Played',
    displayOrder: 1,
    statCategoryId: 1,
    statTypeId: 1,
  },
  82: {
    abbrev: 'K/BB',
    description: 'Strikeout to Walk Ratio',
    displayOrder: 83,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 'Infinity',
      derivedFromStats: {
        a: 48,
        b: 39,
      },
      equation: 'a / b',
      invalidStatCheck: ['a'],
      secondaryDefaultInvalid: 0,
    },
    statTypeId: 2,
  },
  83: {
    abbrev: 'SVHD',
    description: 'Saves Plus Holds',
    displayOrder: 84,
    statCategoryId: 2,
    statDerivation: {
      defaultInvalid: 0,
      derivedFromStats: {
        a: 57,
        b: 60,
      },
      equation: 'a + b',
      invalidStatCheck: 'null',
      secondaryDefaultInvalid: 'null',
    },
    statTypeId: 2,
  },
  99: {
    abbrev: 'PBS',
    description: 'Probable Start',
    displayOrder: 99,
    statCategoryId: 2,
    statTypeId: 2,
  },
};

export interface StatAbbrev {
  ab?: number;
  h?: number;
  ha?: number;
  er?: number;
  avg?: number;
  '2b'?: number;
  '3b'?: number;
  hr?: number;
  xbh?: number;
  '1b'?: number;
  tb?: number;
  slg?: number;
  bb?: number;
  ibb?: number;
  hbp?: number;
  sf?: number;
  sh?: number;
  sac?: number;
  pa?: number;
  obp?: number;
  ops?: number;
  rc?: number;
  r?: number;
  rbi?: number;
  gwrbi?: number;
  sb?: number;
  cs?: number;
  sbn?: number;
  gidp?: number;
  ko?: number;
  tp?: number;
  ppa?: number;
  gshr?: number;
  fc?: number;
  po?: number;
  ast?: number;
  ofast?: number;
  fpct?: number;
  e?: number;
  dpt?: number;
  btw?: number;
  btl?: number;
  ptw?: number;
  ptl?: number;
  gp?: number;
  gs?: number;
  w?: number;
  hra?: number;
  sv?: number;
  era?: number;
  whip?: number;
  ip?: number;
  bbi?: number;
  k?: number;
  hb?: number;
}
