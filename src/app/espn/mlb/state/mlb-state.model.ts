import { BaseballGame } from '../class/baseballGame.class';
import { BaseballPlayer } from '../class/baseballPlayer.class';
import { BaseballTeam } from '../class/baseballTeam.class';
import { EspnClientEvent, EspnClientTeam } from '../interface';
import { EspnClientScheduleEntry, EspnClientScheduleTeams } from '../interface/league';

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

interface BaseballTeamMap {
  [id: number]: BaseballTeam;
}

interface BaseballPlayerMap {
  [id: number]: BaseballPlayer;
}

interface BaseballGameMap {
  [id: number]: BaseballGame;
}

export { MlbStateModel, ScheduleMap, TeamMap, EventMap, GameMap, BaseballTeamMap, BaseballPlayerMap, BaseballGameMap };
