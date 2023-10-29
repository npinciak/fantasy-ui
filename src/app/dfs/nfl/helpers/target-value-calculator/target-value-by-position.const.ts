import { TargetValueSiteConfiguration } from './target-value-calculator.model';

export const TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE: Record<string, Record<string, TargetValueSiteConfiguration>> = {
  QB: {
    draftkings: {
      minimumSalary: 5000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 15,
      minimumFantasyPointsGPPs: 20,
    } as TargetValueSiteConfiguration,
    fanduel: {
      minimumSalary: 6000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 12,
      minimumFantasyPointsGPPs: 18,
    } as TargetValueSiteConfiguration,
  },
  RB: {
    draftkings: {
      minimumSalary: 4000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 12,
      minimumFantasyPointsGPPs: 16,
    } as TargetValueSiteConfiguration,
    fanduel: {
      minimumSalary: 4500,
      valueTargetMultiplierCash: 2.5,
      valueTargetMultiplierGPPs: 3.5,
      minimumFantasyPointsCash: 11.25,
      minimumFantasyPointsGPPs: 15.75,
    } as TargetValueSiteConfiguration,
  },
  WR: {
    draftkings: {
      minimumSalary: 3000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 9,
      minimumFantasyPointsGPPs: 12,
    } as TargetValueSiteConfiguration,
    fanduel: {
      minimumSalary: 4500,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 9,
      minimumFantasyPointsGPPs: 13.5,
    } as TargetValueSiteConfiguration,
  },
  TE: {
    draftkings: {
      minimumSalary: 2500,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 7.5,
      minimumFantasyPointsGPPs: 10,
    },
    fanduel: {
      minimumSalary: 4000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 8,
      minimumFantasyPointsGPPs: 12,
    } as TargetValueSiteConfiguration,
  },
  DST: {
    draftkings: {
      minimumSalary: 2000,
      valueTargetMultiplierCash: 3,
      valueTargetMultiplierGPPs: 4,
      minimumFantasyPointsCash: 6,
      minimumFantasyPointsGPPs: 8,
    } as TargetValueSiteConfiguration,
    fanduel: {
      minimumSalary: 3000,
      valueTargetMultiplierCash: 2,
      valueTargetMultiplierGPPs: 3,
      minimumFantasyPointsCash: 6,
      minimumFantasyPointsGPPs: 9,
    } as TargetValueSiteConfiguration,
  },
  UNKNOWN: {
    draftkings: {
      minimumSalary: 0,
      valueTargetMultiplierCash: 0,
      valueTargetMultiplierGPPs: 0,
      minimumFantasyPointsCash: 0,
      minimumFantasyPointsGPPs: 0,
    } as TargetValueSiteConfiguration,
    fanduel: {
      minimumSalary: 0,
      valueTargetMultiplierCash: 0,
      valueTargetMultiplierGPPs: 0,
      minimumFantasyPointsCash: 0,
      minimumFantasyPointsGPPs: 0,
    } as TargetValueSiteConfiguration,
  },
};
