import { Game } from '../class/game.class';
import { BaseballPlayer } from '../class/player.class';
import { BaseballTeam } from '../class/team.class';
import { EspnClientEvent, EspnClientTeam } from '../interface';
import { EspnClientScheduleEntry } from '../interface/league';

interface MlbStateModel {
  schedule: ScheduleMap;
  teams: TeamMap;
  events: EventMap;
  isLoading: boolean;
  scoringPeriodId: number;
}

interface ScheduleMap {
  [id: number]: EspnClientScheduleEntry;
}

interface TeamMap {
  [id: number]: EspnClientTeam;
}

interface EventMap {
  [id: number]: EspnClientEvent;
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

interface BaseballGameMap {
  [id: number]: Game;
}

export { MlbStateModel, ScheduleMap, TeamMap, EventMap, GameMap, BaseballTeamMap, BaseballPlayerMap, BaseballGameMap };
