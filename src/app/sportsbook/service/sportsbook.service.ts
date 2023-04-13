import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/@shared/services/api.service';
import { environment } from 'src/environments/environment';
import { ISportGeniusEndpointBuilder } from '../isportgenius-endpoint-builder';
import { BaseResponse, Content } from '../models/isportgenius-client.model';

@Injectable({
  providedIn: 'root',
})
export class SportsBookService {
  private client: ISportGeniusEndpointBuilder;

  constructor(private api: ApiService) {
    this.client = new ISportGeniusEndpointBuilder();
  }

  leagueStats(leagueId: string): Observable<Content> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Basic ${environment.isportgeniusKey}`);

    return this.api.get<BaseResponse>(this.client.leagueStats(leagueId), { headers }).pipe(map(res => res.content));
  }
}
