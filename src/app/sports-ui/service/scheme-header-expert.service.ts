import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../@shared/services/api.service';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';

@Injectable({
  providedIn: 'root',
})
export class SchemeHeaderExpertService {
  private endpoint: EndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpoint = new EndpointBuilder();
  }

  getLeagues() {
    return this.apiService.get<SportsUiClientBaseResponse<SportsUiClientLeague[]>>(this.endpoint.leagues).pipe(map(res => res.data));
  }

  getLeagueById(payload: PayloadLeagueId) {
    return this.apiService
      .get<SportsUiClientBaseResponse<SportsUiClientLeague>>(this.endpoint.getLeagueById(payload))
      .pipe(map(res => res.data));
  }

  createLeague(payload: CreateLeague) {
    return this.apiService
      .post<SportsUiClientBaseResponse<SportsUiClientLeague>>(this.endpoint.leagues, { ...payload })
      .pipe(map(res => res.data));
  }

  patchLeague(payload: PayloadLeagueId) {
    return this.apiService
      .put<SportsUiClientBaseResponse<SportsUiClientLeague>, {}>(this.endpoint.getLeagueById(payload), {})
      .pipe(map(res => res.data));
  }

  deleteLeague(payload: PayloadLeagueId) {
    return this.apiService
      .delete<SportsUiClientBaseResponse<SportsUiClientLeague>>(this.endpoint.getLeagueById(payload))
      .pipe(map(res => res.data));
  }

  verifyLeague(payload: VerifyLeague) {
    return this.apiService
      .post<SportsUiClientBaseResponse<{ leagueName: string; leagueId: string }>>(this.endpoint.verifyLeague, { ...payload })
      .pipe(map(res => res.data));
  }

  patchUser(payload: any) {
    return this.apiService
      .put<SportsUiClientBaseResponse<any>, {}>(this.endpoint.getUsersById(payload), { ...payload })
      .pipe(map(res => res.data));
  }
}

type LeagueAttributes = 'leagueId' | 'leagueName' | 'leagueYear';

export type SportsUiClientBaseResponse<T> = { data: T };

export type VerifyLeague = {
  leagueId: string;
  leagueSport: FantasySports;
  leagueYear: string;
};

export type CreateLeague = {
  leagueName: string;
  leagueId: string;
  leagueSport: FantasySports;
  leagueYear: string;
};

interface PayloadLeagueId {
  leagueId: string;
}

class EndpointBuilder {
  private readonly _baseUrl = environment.sportsApi;
  private readonly _leagues = '/leagues';
  private readonly _users = '/users';

  constructor() {}

  get leagues() {
    return `${this._baseUrl}${this._leagues}`;
  }

  get users() {
    return `${this._baseUrl}${this._users}`;
  }

  private getEntityById(id: string) {}

  getUsersById(payload: any) {
    return `${this.users}/${payload.id}`;
  }

  getLeagueById(payload: PayloadLeagueId) {
    return `${this.leagues}/${payload.leagueId}`;
  }

  get verifyLeague() {
    return `${this.leagues}/verify`;
  }
}
