import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { Observable, of } from 'rxjs';
import { Game } from '../../models/mlb/class/game.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { EventState, ScheduleState, TeamState } from '../mlb';
import { MlbFacade } from '../mlb/mlb.facade';

export type Mock<T> = { [key in keyof T]: T[key] };

export class MockMlbFacade implements Mock<MlbFacade> {
  teams$: Observable<TeamState>;
  games$: Observable<EventState>;
  standings$: Observable<BaseballTeam[]>;
  schedule$: Observable<ScheduleState>;
  liveScore$: Observable<BaseballTeam[]>;
  gamesMap$: Observable<{ [id: number]: Game }>;
  sortedGamesByStartTime$: Observable<Game[]>;
  noGames$: Observable<boolean>;
  teamsEmpty$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  scoringPeriod: number;
  teamsSnapshot: TeamState;
  teamsEmpty: boolean;
  gameSnapshot: EventState;

  selectGameById = (id: number) => MOCK_DATA.ESPN_EVENT;
  selectTeamById = (id: number) => MOCK_DATA.ESPN_TEAM;
  getLeague = (leagueId: number) => null;
}
