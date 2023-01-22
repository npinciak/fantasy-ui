export enum StatTypePeriodId {
  Season,
  Last7,
  Last15,
  Last30,
  Average,
  Live,
  RestOfSeason,
  Projected = 10,
  ProjectedWeek,
  BatterVsPitcher = 1000,
}

export const StatTypePeriodIdMap: { [key in StatTypePeriodId]: string } = {
  [StatTypePeriodId.Season]: 'Season',
  [StatTypePeriodId.Last7]: 'Last 7',
  [StatTypePeriodId.Last15]: 'Last 15',
  [StatTypePeriodId.Last30]: 'Last 30',
  [StatTypePeriodId.Average]: 'Average',
  [StatTypePeriodId.Live]: 'Live',
  [StatTypePeriodId.RestOfSeason]: 'Rest Of Season',
  [StatTypePeriodId.Projected]: 'Projected',
  [StatTypePeriodId.ProjectedWeek]: 'Projected Week',
  [StatTypePeriodId.BatterVsPitcher]: 'BVP',
} as const;
