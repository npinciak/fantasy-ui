import { EspnClientEvent, EspnClientTeam } from '../interface';
import { EspnClientScheduleTeams } from '../interface/league';

interface MlbStateModel {
  statTypeId: number;
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

export { MlbStateModel, ScheduleMap, TeamMap, EventMap, GameMap };
