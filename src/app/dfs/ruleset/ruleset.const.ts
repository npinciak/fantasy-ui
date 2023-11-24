import { SITE } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

const DEFAULT_SALARY = 50000;
const FD_DEFAULT_SALARY = 60000;

export const ROSTER_SIZE_BY_SITE: Record<string, Record<string, number>> = {
  [SITE.Draftkings]: {
    NFL: 9,
    NFL_SHOWDOWN: 6,
    MLB_SHOWDOWN: 6,
    NBA: 8,
    NBA_SHOWDOWN: 6,
    WNBA: 6,
    MLB: 10,
    SOCCER: 8,
    EL: 6,
    NHL: 9,
    NHL_SHOWDOWN: 6,
  },
  [SITE.Fanduel]: {
    NFL: 9,
    NFL_MVP: 5,
    NBA: 9,
    MLB: 9,
    WNBA: 7,
    NASCAR: 5,
    PGA: 6,
  },
};

export const SALARY_CAP_BY_SITE: Record<string, Record<string, number>> = {
  [SITE.Draftkings]: {
    NFL: DEFAULT_SALARY,
    NFL_SHOWDOWN: DEFAULT_SALARY,
    NBA: DEFAULT_SALARY,
    NBA_SHOWDOWN: DEFAULT_SALARY,
    WNBA: DEFAULT_SALARY,
    MLB: DEFAULT_SALARY,
    SOCCER: DEFAULT_SALARY,
    EL: DEFAULT_SALARY,
    NHL: DEFAULT_SALARY,
    NHL_SHOWDOWN: DEFAULT_SALARY,
    MLB_SHOWDOWN: DEFAULT_SALARY,
  },
  [SITE.Fanduel]: {
    NFL_MVP: FD_DEFAULT_SALARY,
    NFL: FD_DEFAULT_SALARY,
    NBA: FD_DEFAULT_SALARY,
    MLB: 35000,
    WNBA: 40000,
    NASCAR: DEFAULT_SALARY,
    PGA: FD_DEFAULT_SALARY,
  },
};

export const POSITION_LIMITS_BY_SITE = {
  [SITE.Draftkings]: {
    NFL: {
      QB: {
        min: 1,
        max: 1,
      },
      RB: {
        min: 2,
        max: 3,
      },
      WR: {
        min: 3,
        max: 4,
      },
      TE: {
        min: 1,
        max: 2,
      },
      DST: {
        min: 1,
        max: 1,
      },
    },
  },
};
