import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { PlayersBySlate } from '../models/player.model';
import { MOCK_DFS_SLATE_PLAYER_LIST } from '../models/player.model.mock';
import { MOCK_SCHEDULE_LIST } from '../models/schedule.model.mock';
import { MOCK_DFS_TEAM_LIST } from '../models/team.model.mock';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';
import { MOCK_NFL_GRIDIRON_PLAYER_LIST } from '../nfl/models/nfl-gridIron.model.mock';
import { PlayerService } from './player.service';

export class PlayerServiceMock implements Mock<PlayerService> {
  playersBySlate(request: { slatePath: string }): Observable<PlayersBySlate> {
    const players = MOCK_DFS_SLATE_PLAYER_LIST;
    const schedule = MOCK_SCHEDULE_LIST;
    const teams = MOCK_DFS_TEAM_LIST;
    return of({ players, schedule, teams });
  }
  getGridIronPlayers(request: { site: string }): Observable<GridIronPlayer[]> {
    return of(MOCK_NFL_GRIDIRON_PLAYER_LIST);
  }
}
