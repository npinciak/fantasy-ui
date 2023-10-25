import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { SlateMasterMap } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { Observable } from 'rxjs';
import { DfsEndpointBuilder } from '../endpoint-builder/dfs-endpoint-builder';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  protected endpointBuilder: DfsEndpointBuilder;

  constructor(protected apiService: ApiService) {
    this.endpointBuilder = new DfsEndpointBuilder();
  }

  getSlatesByDate({ sport }: { sport: string }): Observable<SlateMasterMap> {
    return this.apiService.get<SlateMasterMap>(this.endpointBuilder.slateMasterBySport(sport));
  }

  getGameAttributesBySlateId<T>({ sport, site, slateId }: GameAttributesRequest): Observable<T> {
    const params = this.params({ slateId, site });
    return this.apiService.get<T>(this.endpointBuilder.slateGameAttributesBySport(sport), { params });
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
