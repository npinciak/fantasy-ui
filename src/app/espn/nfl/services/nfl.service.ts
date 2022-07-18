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
 // static transformTeamImportToFantasyTeam(teamImport: EspnClientTeam): FantasyTeam {
  //   return {
  //     id: teamImport.id.toString(),
  //     name: `${teamImport.location} ${teamImport.nickname}`,
  //     logo: teamImport.logo,
  //     record: `${teamImport.record.overall.wins}-${teamImport.record.overall.ties}-${teamImport.record.overall.losses}`,
  //   };
  // }

  constructor(private espnClient: EspnService) {}

  static transformEspnClientLeagueToFootballLeague(espnLeague: EspnClientLeague) {
    return espnLeague;
  }

  footballLeague(leagueId: string, year: string): Observable<EspnClientLeague> {
    return this.espnClient
      .espnFantasyLeagueBySport({ sport: FantasySports.football, leagueId, year })
      .pipe(map(res => NflService.transformEspnClientLeagueToFootballLeague(res)));
  }
}
