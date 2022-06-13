import { Selector } from '@ngxs/store';
import { EspnAddLeagueFormState, EspnAddLeagueFormStateModel } from '../state/espn-add-league-form.state';

export class EspnAddLeagueFormSelectors {
  @Selector([EspnAddLeagueFormState])
  static getEspnAddLeagueFormState(state: EspnAddLeagueFormStateModel): EspnAddLeagueFormStateModel {
    return state;
  }

  @Selector([EspnAddLeagueFormSelectors.getEspnAddLeagueFormState])
  static getLeagueId(state: EspnAddLeagueFormStateModel): string | null {
    return state.leagueId;
  }

  @Selector([EspnAddLeagueFormSelectors.getLeagueId])
  static getLeagueIdValid(leagueId: string | null): boolean {
    return leagueId ? true : false;
  }

  @Selector([EspnAddLeagueFormSelectors.getEspnAddLeagueFormState])
  static getSport(state: EspnAddLeagueFormStateModel): string | null {
    return state.sport;
  }

  @Selector([EspnAddLeagueFormSelectors.getSport])
  static getSportValid(sport: string | null): boolean {
    return sport ? true : false;
  }

  @Selector([EspnAddLeagueFormSelectors.getSportValid, EspnAddLeagueFormSelectors.getLeagueIdValid])
  static getIsDirty(sportValid: boolean, leagueIdValid): boolean {
    return !sportValid || !leagueIdValid;
  }
}
