import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from '../../../../node_modules/moment';

import { ApiService } from 'src/app/@shared/services/api.service';

export enum Sports {
  MLB = 'flb',
  NFL = 'ffl',
}

@Injectable({
  providedIn: 'root'
})

export class EspnService {

  private fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private apiBase = 'https://site.api.espn.com/apis';

  constructor(private api: ApiService) { }

  getLeague = (leagueId: number, sport: Sports) => this.api.get<any>(`${this.fantasyBase}/games/${sport}/seasons/${this.currentYear}/segments/0/leagues/${leagueId}`);

  private get currentYear() {
    return moment().format('YYYY');
  }

}
