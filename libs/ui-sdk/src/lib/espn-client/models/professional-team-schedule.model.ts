export interface ProTeamSchedule {
  display: boolean;
  settings: ProTeamScheduleSettings;
}

export interface ProTeamScheduleSettings {
  proTeams: ProTeamEntity[];
}

export interface ProTeamEntity {
  abbrev: string;
  byeWeek: number;
  id: number;
  location: string;
  name: string;
  proGamesByScoringPeriod: { [scoringPeriodId: string]: ProGamesByScoringPeriodEntity[] };
  universeId: number;
}

export interface ProGamesByScoringPeriodEntity {
  awayProTeamId: number;
  date: number;
  homeProTeamId: number;
  id: number;
  scoringPeriodId: number;
}
