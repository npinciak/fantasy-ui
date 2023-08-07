import { SCHEDULE_WINNER } from '../../espn/models/espn-client.const';
import { IdAttributesNumber } from './id-attributes.model';
import { TeamAttributes } from './team.model';

type ScheduleAttributes = Pick<IdAttributesNumber, 'id' | 'matchupPeriodId'> & {
  home: ScheduleTeam;
  away: ScheduleTeam;
  winner: ScheduleWinnerType;
  teams?: ScheduleTeam[];
};

export type ScheduleEntity = ScheduleAttributes;
export type ScheduleWinnerType = typeof SCHEDULE_WINNER[keyof typeof SCHEDULE_WINNER];

export type ScheduleTeam = Pick<TeamAttributes, 'teamId' | 'totalPoints' | 'rosterForCurrentScoringPeriod'> & {
  totalProjectedPointsLive?: number;
  totalPointsLive?: number;
  cumulativeScore: TeamCumulativeScore;
};

type CumulativeScoreAttributes = 'wins' | 'lossses' | 'ties';
export type TeamCumulativeScore = { [key in CumulativeScoreAttributes]: number };
