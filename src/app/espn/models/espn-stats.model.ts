export type BaseStatsProperties = {
  abbrev: string;
  description: string;
};

export enum StatTypePeriodId {
  Season,
  Last7,
  Last15,
  Last30,
  Average,
  Live,
  RestOfSeason,
  Projected = 10,
  BatterVsPitcher = 1000,
}

export const StatTypePeriodIdMap: { [key in StatTypePeriodId]: string } = {
  [StatTypePeriodId.Season]: 'Season',
  [StatTypePeriodId.Last7]: 'Last 7',
  [StatTypePeriodId.Last15]: 'Last 15',
  [StatTypePeriodId.Last30]: 'Last 30',
  [StatTypePeriodId.Average]: 'Average',
  [StatTypePeriodId.Live]: 'live',
  [StatTypePeriodId.RestOfSeason]: 'Rest Of Season',
  [StatTypePeriodId.Projected]: 'Projected',
  [StatTypePeriodId.BatterVsPitcher]: 'BVP',
};
