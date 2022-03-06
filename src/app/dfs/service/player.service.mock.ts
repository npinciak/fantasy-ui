import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { PlayersBySlate } from '../models/player.model';
import { GridIronPlayerMap } from '../nfl/models/nfl-gridIron.model';
import { PlayerService } from './player.service';

export class PlayerServiceMock implements Mock<PlayerService> {
  playersBySlate(request: { slatePath: string }): Observable<PlayersBySlate> {
    return of();
  }
  getGridIronPlayers(request: { site: string }): Observable<GridIronPlayerMap[]> {
    return of();
  }
}
