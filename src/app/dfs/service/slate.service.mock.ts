import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { MOCK_SLATE_MASTER } from '../models/daily-fantasy-client-slate.mock';
import { SlateMasterMap } from '../models/daily-fantasy-client.model';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { SlateService, SlateTeam } from './slate.service';

export class SlateServiceMock implements Mock<SlateService> {
  getGameAttrBySlateId(request: {
    sport: string;
    site: string;
    slateId: string;
  }): Observable<{ teams: SlateTeam[]; players: PlayerSlateAttr[]; statGroups: PlayerProfilerSeasonMap }> {
    return of();
  }

  slatesByDate(request: { sport: string }): Observable<SlateMasterMap> {
    return of(MOCK_SLATE_MASTER);
  }
}
