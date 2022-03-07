import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { PlayersBySlate } from '../models/player.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';
import { MOCK_NFL_GRIDIRON_PLAYER_LIST } from '../nfl/models/nfl-gridIron.model.mock';
import { PlayerService } from './player.service';

export class PlayerServiceMock implements Mock<PlayerService> {
  playersBySlate(request: { slatePath: string }): Observable<PlayersBySlate> {
    return of();
  }
  getGridIronPlayers(request: { site: string }): Observable<GridIronPlayer[]> {
    return of(MOCK_NFL_GRIDIRON_PLAYER_LIST);
  }
}
