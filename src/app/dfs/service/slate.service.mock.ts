import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { SlateMaster } from '../models/daily-fantasy-client.model';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { SlateService, SlateTeam } from './slate.service';

export class SlateServiceMock implements Mock<SlateService> {
  slatesByDate(request: { sport: string }): Observable<SlateMaster> {
    return of();
  }
  getGameAttrBySlateId(request: {
    sport: string;
    site: string;
    slateId: string;
  }): Observable<{ teams: SlateTeam[]; players: PlayerSlateAttr[]; statGroups: PlayerProfilerSeasonMap }> {
    return of();
  }
}
