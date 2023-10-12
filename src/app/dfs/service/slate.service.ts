import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { SlateMasterMap } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { Observable } from 'rxjs';
import { DailyFantasyEndpointBuilder, DfsEndpointBuilder } from '../endpoint-builder/daily-fantasy-endpoint-builder';
import { SlatePlayer } from '../models/slate-player.model';
import { SlateTeam } from '../models/slate-team.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  protected endpoint = DfsEndpointBuilder();
  protected endpointBuilder: DailyFantasyEndpointBuilder;

  constructor(protected apiService: ApiService) {
    this.endpointBuilder = new DailyFantasyEndpointBuilder();
  }

  getSlatesByDate({ sport }: { sport: string }): Observable<SlateMasterMap> {
    this.endpointBuilder.sport = sport;
    return this.apiService.get<SlateMasterMap>(this.endpointBuilder.slateMaster);
  }

  getGameAttributesBySlateId<T>({ sport, site, slateId }: GameAttributesRequest): Observable<T> {
    const params = this.params({ slateId, site });
    return this.apiService.get<T>(this.endpoint.slateGameAttributesBySport(sport), { params });
  }

  private params({ slateId, site }: Pick<GameAttributesRequest, 'slateId' | 'site'>): HttpParams {
    let params = new HttpParams();
    params = params.append('date', espnDateFormatter({ delim: '-', date: new Date().getTime() }));
    params = params.append('site', site);
    params = params.append('slate_id', slateId);

    return params;
  }
}

export type GameAttributesRequest = {
  sport: string;
  site: string;
  slateId: string;
};

type SlateAttributes = {
  teams: SlateTeam[];
  players: SlatePlayer[];
  // statGroups: PlayerProfilerSeasonMap | null;
  // weather: Weather[];
};

type DfsQueryParamAttributes = 'date' | 'site' | 'slate_id';
