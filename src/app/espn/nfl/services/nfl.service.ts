import { Injectable } from '@angular/core';
import { EspnClientCompetitor, EspnClientEvent, EspnClientLeague } from '@app/espn/espn-client.model';
import { EspnService, Sports } from '@app/espn/espn.service';
import { logoImgBuilder } from '@app/espn/mlb/helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NflService {
  constructor(private espnClient: EspnService) {}

  static transformEspnClientLeagueToFootballLeague(espnLeague: EspnClientLeague) {
    return espnLeague;
  }

  footballLeague(leagueId: number): Observable<EspnClientLeague> {
    return this.espnClient
      .espnFantasyLeagueBySport(Sports.football, leagueId)
      .pipe(map(res => NflService.transformEspnClientLeagueToFootballLeague(res)));
  }
}
