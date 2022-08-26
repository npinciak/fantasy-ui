import { Selector } from '@app/@shared/models/typed-selector';
import { EspnFastcastState, EspnFastcastStateModel } from '../state/espn-fastcast.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';
import { EspnFastcastLeagueSelectors } from './espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from './espn-fastcast-sport.selectors';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState])
  static getConnected(state: EspnFastcastStateModel) {
    return state.connect;
  }

  @Selector([EspnFastcastState])
  static getLastDisconnect(state: EspnFastcastStateModel) {
    return state.disconnect;
  }

  @Selector([EspnFastcastState])
  static getLastRefresh(state: EspnFastcastStateModel) {
    return state.lastRefresh;
  }

  @Selector([EspnFastcastState])
  static getEventType(state: EspnFastcastStateModel) {
    return state.eventType;
  }

  @Selector([
    EspnFastcastSportSelectors.getSportIdSetValid,
    EspnFastcastLeagueSelectors.getLeagueIdSetValid,
    EspnFastcastEventSelectors.getEventIdSetValid,
  ])
  static getIsFeedValid(sportIdSetValid: boolean, leagueIdSetValid: boolean, eventIdSetValid: boolean): boolean {
    return sportIdSetValid && leagueIdSetValid && eventIdSetValid;
  }

  @Selector([
    EspnFastcastSportSelectors.getFeedLoadingValue,
    EspnFastcastLeagueSelectors.getFeedLoadingValue,
    EspnFastcastEventSelectors.getFeedLoadingValue,
  ])
  static getFeedLoadingValue(sportIdLoadingValue: number, leagueIdLoadingValue: number, eventIdLoadingValue: number) {
    return sportIdLoadingValue + leagueIdLoadingValue + eventIdLoadingValue;
  }
}
