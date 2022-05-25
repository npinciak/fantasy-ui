import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { BaseballPlayer } from '../models/baseball-player.model';
import { MOCK_BASEBALL_FREEAGENT_1 } from '../models/baseball-player.model.mock';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { MOCK_BASEBALL_TEAM_1, MOCK_BASEBALL_TEAM_LIVE } from '../models/baseball-team.model.mock';
import { MlbService } from './mlb.service';

export class MlbServiceMock implements Mock<MlbService> {
  baseballPlayerNews(payload: { lookbackDays: string; playerId: string }): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  baseballLeague(leagueId: number): Observable<{
    scoringPeriodId: string;
    teams: BaseballTeam[];
    freeAgents: BaseballPlayer[];
    seasonId: string;
    teamsLive: BaseballTeamLive[];
  }> {
    return of({
      seasonId: '2022',
      scoringPeriodId: '1',
      teams: [MOCK_BASEBALL_TEAM_1],
      freeAgents: [MOCK_BASEBALL_FREEAGENT_1],
      teamsLive: [MOCK_BASEBALL_TEAM_LIVE],
    });
  }

  baseballFreeAgents(payload: { leagueId: number; scoringPeriodId: number }): Observable<BaseballPlayer[]> {
    return of([MOCK_BASEBALL_FREEAGENT_1]);
  }
}
