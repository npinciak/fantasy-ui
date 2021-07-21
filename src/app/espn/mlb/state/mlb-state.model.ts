import { Game } from '../class/game.class';
import { BaseballPlayer } from '../class/player.class';
import { BaseballTeam } from '../class/team.class';
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

interface BaseballTeamMap {
  [id: number]: BaseballTeam;
}

interface BaseballPlayerMap {
  [id: number]: BaseballPlayer;
}

export { MlbStateModel, ScheduleMap, TeamMap, EventMap, GameMap, BaseballTeamMap, BaseballPlayerMap };
