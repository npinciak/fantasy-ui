import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateHelper } from '@app/@shared/helpers/date-helper';
import { ApiService } from '@app/@shared/services/api.service';
import { ClientSlateMasterMap } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
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

  getSlatesByDate({ sport }: { sport: string }): Observable<ClientSlateMasterMap> {
    return this.apiService.get<ClientSlateMasterMap>(this.endpointBuilder.slateMasterBySport(sport));
  }

  getGameAttributesBySlateId<T>({ sport, site, slateId }: GameAttributesRequest): Observable<T> {
    const params = this.params({ slateId, site });
    return this.apiService.get<T>(this.endpointBuilder.slateGameAttributesBySport(sport), { params });
  }

  private params({ slateId, site }: Pick<GameAttributesRequest, 'slateId' | 'site'>): HttpParams {
    const dateHelper = new DateHelper();
    const date = dateHelper.formatWithDelimiter({
      date: new Date().getTime(),
      delimiter: '-',
    });
    let params = new HttpParams();
    params = params.append('date', date);
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
