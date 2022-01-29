import { Injectable } from '@angular/core';
import { EspnClientLeague } from '@app/espn/espn-client.model';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
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
      .espnFantasyLeagueBySport(FantasySports.football, leagueId)
      .pipe(map(res => NflService.transformEspnClientLeagueToFootballLeague(res)));
  }
}
