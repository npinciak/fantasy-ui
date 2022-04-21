import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { BaseballPlayer } from '../models/baseball-player.model';
import { MOCK_BASEBALL_FREEAGENT_1 } from '../models/baseball-player.model.mock';
import { BaseballTeam } from '../models/baseball-team.model';
import { MOCK_BASEBALL_TEAM_1 } from '../models/baseball-team.model.mock';
import { MlbService } from './mlb.service';

export class MlbServiceMock implements Mock<MlbService> {
  baseballLeague(
    leagueId: number
  ): Observable<{ scoringPeriodId: number; teams: BaseballTeam[]; freeAgents: BaseballPlayer[]; seasonId: string; schedule }> {
    return of({
      seasonId: '2022',
      schedule: {},
      scoringPeriodId: 1,
      teams: [MOCK_BASEBALL_TEAM_1],
      freeAgents: [MOCK_BASEBALL_FREEAGENT_1],
    });
  }

  baseballFreeAgents(payload: { leagueId: number; scoringPeriodId: number }): Observable<BaseballPlayer[]> {
    return of([MOCK_BASEBALL_FREEAGENT_1]);
  }

  baseballPlayerNews(payload: { lookbackDays: string; playerId: string }): Observable<unknown> {
    return of();
  }
}
