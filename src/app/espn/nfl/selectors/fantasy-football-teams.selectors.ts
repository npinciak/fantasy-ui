import { Selector } from '@ngxs/store';

import { EspnClientTeam } from '@app/espn/espn-client.model';
import { FantasyTeam } from '../models/fantasy-team.model';
import { FantasyFootballTeamsState } from '../state/fantasy-football-teams.state';

export class FantasyFootballTeamsSelectors {
  static transformTeamImportToFantasyTeam(teamImport: EspnClientTeam): FantasyTeam {
    return {
      id: teamImport.id.toString(),
      name: `${teamImport.location} ${teamImport.nickname}`,
      logo: teamImport.logo,
      record: `${teamImport.record.overall.wins}-${teamImport.record.overall.ties}-${teamImport.record.overall.losses}`,
    };
  }

  @Selector([FantasyFootballTeamsState.map])
  static selectFantasyTeamById(map: { [id: number]: EspnClientTeam }): (id: number) => FantasyTeam {
    return (id: number) => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(map[id]);
  }

  @Selector([FantasyFootballTeamsState.map])
  static selectFantasyTeamList(map: { [id: number]: EspnClientTeam }): FantasyTeam[] {
    return Object.values(map).map(m => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(m));
  }
}
