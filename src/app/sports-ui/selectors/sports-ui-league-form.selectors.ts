import { Selector } from '@ngxs/store';
import { SportsUiLeagueFormState, SportsUiLeagueFormStateModel } from '../state/sports-ui-league-form.state';

export class SportsUiLeagueFormSelectors {
  @Selector([SportsUiLeagueFormState])
  static getForm(state: SportsUiLeagueFormStateModel): SportsUiLeagueFormStateModel {
    return state;
  }

  @Selector([SportsUiLeagueFormSelectors.getForm])
  static getLeagueId(state: SportsUiLeagueFormStateModel): string | null {
    return state.leagueId;
  }

  @Selector([SportsUiLeagueFormSelectors.getLeagueId])
  static getLeagueIdValid(leagueId: string | null): boolean {
    return leagueId ? true : false;
  }

  @Selector([SportsUiLeagueFormSelectors.getForm])
  static getSport(state: SportsUiLeagueFormStateModel): string | null {
    return state.leagueSport;
  }

  @Selector([SportsUiLeagueFormSelectors.getSport])
  static getSportValid(sport: string | null): boolean {
    return sport ? true : false;
  }

  @Selector([SportsUiLeagueFormSelectors.getSportValid, SportsUiLeagueFormSelectors.getLeagueIdValid])
  static getIsDirty(sportValid: boolean, leagueIdValid: boolean): boolean {
    return !sportValid || !leagueIdValid;
  }
}
