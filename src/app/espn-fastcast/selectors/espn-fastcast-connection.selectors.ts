import { tickerDate } from '@app/@shared/helpers/date';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastConnectionState } from '../state/espn-fastcast-connection.state';
import { EspnFastcastEventSelectors } from './espn-fastcast-event.selectors';
import { EspnFastcastLeagueSelectors } from './espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from './espn-fastcast-sport.selectors';

export class EspnFastcastConnectionSelectors {
  @Selector([EspnFastcastConnectionState])
  static getConnected(state: EspnFastcastConnectionStateModel) {
    return state.connect;
  }

  @Selector([EspnFastcastConnectionState])
  static getPaused(state: EspnFastcastConnectionStateModel) {
    return state.pause;
  }

  @Selector([EspnFastcastConnectionState])
  static getLastDisconnect(state: EspnFastcastConnectionStateModel) {
    return state.disconnect;
  }

  @Selector([EspnFastcastConnectionState])
  static getLastRefresh(state: EspnFastcastConnectionStateModel) {
    return state.lastRefresh;
  }

  @Selector([EspnFastcastConnectionState])
  static getEventType(state: EspnFastcastConnectionStateModel) {
    return state.eventType;
  }

  @Selector([EspnFastcastConnectionState])
  static getSelectedLeagueId(state: EspnFastcastConnectionStateModel) {
    return state.league;
  }

  @Selector([EspnFastcastConnectionState])
  static getConnectionClosed(state: EspnFastcastConnectionStateModel) {
    return state.connectionClosed;
  }

  @Selector([EspnFastcastConnectionSelectors.getConnectionClosed, EspnFastcastConnectionSelectors.getPaused])
  static showNoEventsMessage(connectionClosed: boolean, isPaused: boolean) {
    return connectionClosed && isPaused;
  }

  @Selector([EspnFastcastConnectionSelectors.getLastRefresh])
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

  @Selector([
    EspnFastcastConnectionSelectors.getPaused,
    EspnFastcastConnectionSelectors.getIsFeedValid,
    EspnFastcastConnectionSelectors.getFeedLoadingValue,
  ])
  static getShowFeed(paused: boolean, eventsValid: boolean, loadingFeedValue: number) {
    return !paused && loadingFeedValue >= 100 && eventsValid;
  }

  @Selector([
    EspnFastcastConnectionSelectors.getPaused,
    EspnFastcastConnectionSelectors.getShowFeed,
    EspnFastcastConnectionSelectors.getFeedLoadingValue,
  ])
  static getShowLoader(paused: boolean, showFeed: boolean, loadingFeedValue: number) {
    return !paused && !showFeed && loadingFeedValue < 100;
  }
}
