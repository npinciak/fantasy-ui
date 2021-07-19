import { Game } from '../class/game.class';
import { EspnEvent, Team } from '../interface';
import { ScheduleEntry } from '../interface/league';

interface MlbStateModel {
  schedule: ScheduleMap;
  teams: TeamMap;
  events: EventMap;
  isLoading: boolean;
  scoringPeriodId: number;
}

interface ScheduleMap {
  [id: number]: ScheduleEntry;
}

interface TeamMap {
  [id: number]: Team;
}

interface EventMap {
  [id: number]: EspnEvent;
}

interface GameMap {
  [id: number]: Game;
}

export { MlbStateModel, ScheduleMap, TeamMap, EventMap, GameMap };
