import { EspnClientEvent, EspnClientTeam } from '@app/espn/mlb/interface';
import { EspnClientScheduleTeams } from '@app/espn/mlb/interface/league';

interface NflStateModel {
  schedule: ScheduleMap;
  teams: TeamMap;
  events: EventMap;
  isLoading: boolean;
  scoringPeriodId: number;
}

interface ScheduleMap {
  [id: number]: EspnClientScheduleTeams;
}

interface TeamMap {
  [id: number]: EspnClientTeam;
}

interface EventMap {
  [id: number]: EspnClientEvent;
}

interface GameMap {
  [id: number]: EspnClientEvent;
}

export { NflStateModel };
