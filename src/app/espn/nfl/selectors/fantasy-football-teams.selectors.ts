import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FantasyFootballTeamState } from '../state/fantasy-football-teams.state';

export class FantasyFootballTeamSelector extends GenericSelector(FantasyFootballTeamState) {
 
  // @Selector([FantasyFootballTeamState.])
  // static selectFantasyTeamById(map: { [id: number]: EspnClientTeam }): (id: number) => FantasyTeam {
  //   return (id: number) => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(map[id]);
  // }
  // @Selector([FantasyFootballTeamState])
  // static selectFantasyTeamList(map: { [id: number]: EspnClientTeam }): FantasyTeam[] {
  //   return Object.values(map).map(m => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(m));
  // }
}
