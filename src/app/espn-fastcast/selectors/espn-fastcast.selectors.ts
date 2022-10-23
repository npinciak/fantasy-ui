import { tickerDate } from '@app/@shared/helpers/date';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnFastcastStateModel } from '../models/fastcast-state.model';
import { EspnFastcastState } from '../state/espn-fastcast.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';
import { EspnFastcastLeagueSelectors } from './espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from './espn-fastcast-sport.selectors';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState])
  static getConnected(state: EspnFastcastStateModel) {
    return state.connect;
  }

  @Selector([EspnFastcastState])
  static getPaused(state: EspnFastcastStateModel) {
    return state.pause;
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

  @Selector([EspnFastcastState])
  static getConnectionClosed(state: EspnFastcastStateModel) {
    return state.connectionClosed;
  }

  @Selector([EspnFastcastSelectors.getConnectionClosed, EspnFastcastSelectors.getPaused])
  static showNoEventsMessage(connectionClosed: boolean, isPaused: boolean) {
    return connectionClosed && isPaused;
  }

  @Selector([EspnFastcastSelectors.getLastRefresh])
  static getLastRefreshAsTickerDate(timestamp: number | null) {
    return exists(timestamp) ? tickerDate(timestamp) : null;
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
    return sportIdLoadingValue + leagueIdLoadingValue + eventIdLoadingValue + 1;
  }

  @Selector([EspnFastcastSelectors.getPaused, EspnFastcastSelectors.getIsFeedValid, EspnFastcastSelectors.getFeedLoadingValue])
  static getShowFeed(paused: boolean, eventsValid: boolean, loadingFeedValue: number) {
    return !paused && loadingFeedValue >= 100 && eventsValid;
  }

  @Selector([EspnFastcastSelectors.getPaused, EspnFastcastSelectors.getShowFeed, EspnFastcastSelectors.getFeedLoadingValue])
  static getShowLoader(paused: boolean, showFeed: boolean, loadingFeedValue: number) {
    return !paused && !showFeed && loadingFeedValue < 100;
  }
}
