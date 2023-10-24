import { SiteType } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

export const positionValueByDfsSite = {
  QB: {
    draftkings: {
      minimumSalary: 5000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 15,
      minimumFantasyPointsGPPs: 20,
    },
    [SiteType.FanDuel]: {
      minimumSalary: 6000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 12,
      minimumFantasyPointsGPPs: 18,
    },
  },
  RB: {
    draftkings: {
      minimumSalary: 4000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 12,
      minimumFantasyPointsGPPs: 16,
    },
    [SiteType.FanDuel]: {
      minimumSalary: 4500,
      valueTargetMultiplierCash: 2.5,
      valueTargetMultiplierGPPs: 3.5,
      minimumFantasyPointsCash: 11.25,
      minimumFantasyPointsGPPs: 15.75,
    },
  },
  WR: {
    draftkings: {
      minimumSalary: 3000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 9,
      minimumFantasyPointsGPPs: 12,
    },
    [SiteType.FanDuel]: {
      minimumSalary: 4500,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 9,
      minimumFantasyPointsGPPs: 13.5,
    },
  },
  TE: {
    draftkings: {
      minimumSalary: 2500,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 7.5,
      minimumFantasyPointsGPPs: 10,
    },
    [SiteType.FanDuel]: {
      minimumSalary: 4000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 8,
      minimumFantasyPointsGPPs: 12,
    },
  },
  DST: {
    draftkings: {
      minimumSalary: 2000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 6,
      minimumFantasyPointsGPPs: 8,
    },
    [SiteType.FanDuel]: {
      minimumSalary: 3000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 6,
      minimumFantasyPointsGPPs: 9,
    },
  },
};
