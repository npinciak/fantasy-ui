import { Selector, createPropertySelectors } from '@ngxs/store';
import { SportsUiLeagueFormState, SportsUiLeagueFormStateModel } from '../state/sports-ui-league-form.state';

export class SportsUiLeagueFormSelectors {
  static slices = createPropertySelectors<SportsUiLeagueFormStateModel>(SportsUiLeagueFormState);

  @Selector([SportsUiLeagueFormSelectors.slices.leagueId])
  static getLeagueIdValid(leagueId: string | null): boolean {
    return leagueId ? true : false;
  }

  @Selector([SportsUiLeagueFormSelectors.slices.leagueSport])
  static getSportValid(sport: string | null): boolean {
    return sport ? true : false;
  }

  @Selector([SportsUiLeagueFormSelectors.getSportValid, SportsUiLeagueFormSelectors.getLeagueIdValid])
  static getIsDirty(sportValid: boolean, leagueIdValid: boolean): boolean {
    return !sportValid || !leagueIdValid;
  }
}
