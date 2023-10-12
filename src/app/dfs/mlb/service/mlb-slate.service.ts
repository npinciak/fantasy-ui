import { Injectable } from '@angular/core';
import { GameAttributesRequest, SlateService } from '@app/dfs/service/slate.service';
import { transformMlbTeamSlateAttributes } from '@app/dfs/transformers/dfs-slate-transformers';
import { DfsSlateTransformers } from '@app/dfs/transformers/dfs-transformers.m';
import { ClientMlbSlateAttributes } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MlbSlateService extends SlateService {
  getMlbGameAttributesBySlateId({ sport, site, slateId }: GameAttributesRequest) {
    return this.getGameAttributesBySlateId<ClientMlbSlateAttributes>({ sport, site, slateId }).pipe(
      map(res => ({
        teams: transformMlbTeamSlateAttributes(res.teams, site),
        players: DfsSlateTransformers.transformPlayerSlateAttributes(res.players, site),
      }))
    );
  }
}
