import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FastCastConnection } from '@app/espn-fastcast/actions/espn-fastcast-connection.actions';
import {
  FASTCAST_EVENT_TYPE,
  OPERATION_CODE,
  transformSportToFastcastEventType,
  WebSocketBuilder,
} from '@app/espn-fastcast/models/espn-fastcast-socket.model';
import { fastcastURIBuilder } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { startWith, tap } from 'rxjs/operators';
import { FastcastEvents } from '../actions/espn-fastcast-event.actions';
import { FastcastLeagues } from '../actions/espn-fastcast-league.actions';
import { FastcastSports } from '../actions/espn-fastcast-sport.actions';
import { FastcastTeams } from '../actions/espn-fastcast-team.actions';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastConnectionSelectors } from '../selectors/espn-fastcast-connection.selectors';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from '../selectors/espn-fastcast-sport.selectors';
import { EspnFastcastService } from '../service/espn-fastcast.service';

@State<EspnFastcastConnectionStateModel>({
  name: FastCastConnection.stateName,
  defaults: {
    disconnect: null,
    connect: null,
    lastRefresh: null,
    eventType: FASTCAST_EVENT_TYPE.TopEvents,
    league: '90',
    connectionClosed: true,
    pause: true,
  },
})
@Injectable()
export class EspnFastcastConnectionState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Action(FastCastConnection.ConnectWebSocket, { cancelUncompleted: true })
  async connectWebsocket({ getState, patchState }: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = getState().pause;

    if (pause) return;

    const websocketInfo = await this.fastcastService.fastCastWebsocket().toPromise();
    const connect = new Date().getTime();
    const socket = new WebSocketBuilder(websocketInfo);

    this.fastcastService
      .connect(socket.websocketUri)
      .pipe(
        startWith(this.store.dispatch(new FastCastConnection.SendWebSocketMessage({ message: { op: OPERATION_CODE.C } }))),
        tap(message => this.store.dispatch(new FastCastConnection.HandleWebSocketMessage({ message })))
      )
      .toPromise();

    patchState({ connect, connectionClosed: false });
  }

  @Action(FastCastConnection.HandleWebSocketMessage)
  handleWebSocketMessage({ getState, patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { message } }): void {
    const eventType = this.store.selectSnapshot(EspnFastcastConnectionSelectors.getEventType);

    const pause = getState().pause;

    if (pause) {
      this.store.dispatch(new FastCastConnection.DisconnectWebSocket());
      return;
    }

    switch (message.op) {
      case OPERATION_CODE.B:
        break;
      case OPERATION_CODE.C: {
        const outgoing = { op: OPERATION_CODE.S, sid: message.sid, tc: eventType };
        this.store.dispatch(new FastCastConnection.SendWebSocketMessage({ message: outgoing }));

        break;
      }
      case OPERATION_CODE.P:
        // const outgoing = { op: OPERATION_CODE.P, sid: message.sid, pl: message.pl, tc: eventType, mid: message.mid };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));
        break;
      case OPERATION_CODE.H: {
        const uriOpH = message.pl;
        this.store.dispatch(new FastCastConnection.FetchFastcast({ uri: uriOpH }));
        break;
      }
      case OPERATION_CODE.I: {
        const uri = fastcastURIBuilder(eventType, message.mid);
        this.store.dispatch(new FastCastConnection.FetchFastcast({ uri }));
        break;
      }
      case OPERATION_CODE.Error:
        this.store.dispatch(new FastCastConnection.DisconnectWebSocket());
        break;
      default:
        break;
    }

    const lastRefresh = new Date().getTime();
    patchState({ lastRefresh });
  }

  @Action(FastCastConnection.SendWebSocketMessage)
  sendWebSocketMessage(_: StateContext<EspnFastcastConnectionStateModel>, { payload: { message } }): void {
    this.fastcastService.sendMessage(message);
  }

  @Action(FastCastConnection.DisconnectWebSocket)
  disconnectWebsocket({ patchState }: StateContext<EspnFastcastConnectionStateModel>): void {
    this.fastcastService.disconnect();

    const disconnect = new Date().getTime();

    patchState({ disconnect });
  }

  @Action(FastCastConnection.FetchFastcast)
  async fetchFastcast(_: StateContext<EspnFastcastConnectionStateModel>, { payload: { uri } }): Promise<void> {
    const { sports, leagues, events, teams } = await this.espnService.fetchFastcast(uri).toPromise();

    this.store.dispatch([
      new FastcastSports.ClearAndAdd(sports),
      new FastcastLeagues.ClearAndAdd(leagues),
      new FastcastEvents.ClearAndAdd(events),
      new FastcastTeams.ClearAndAdd(teams),
    ]);
  }

  @Action(FastCastConnection.FetchStaticFastcast)
  async fetchStaticFastcast(
    _: StateContext<EspnFastcastConnectionStateModel>,
    { payload: { sport, league, weeks, seasontype } }
  ): Promise<void> {
    const { sports, leagues, events, teams } = await this.espnService
      .fetchStaticScoreboard({ sport, league, weeks, seasontype })
      .toPromise();

    this.store.dispatch([
      new FastcastSports.ClearAndAdd(sports),
      new FastcastLeagues.ClearAndAdd(leagues),
      new FastcastEvents.ClearAndAdd(events),
      new FastcastTeams.ClearAndAdd(teams),
      new FastCastConnection.SetSelectedLeague({ leagueSlug: leagues[0].id }),
    ]);
  }

  @Action(FastCastConnection.SetSelectedEventType)
  async setSelectedEventType({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { eventType } }): Promise<void> {
    const sportId = exists(eventType) ? (eventType.split('~')[0] as string) : null;

    const sport = this.store.selectSnapshot(EspnFastcastSportSelectors.getById)(sportId)?.slug;
    const league = this.store.selectSnapshot(EspnFastcastLeagueSelectors.getById)(eventType)?.abbrev.toLowerCase();

    if (sport != undefined && league != undefined) {
      const eventType = transformSportToFastcastEventType({ sport, league });
      patchState({ eventType });
    }
  }

  @Action(FastCastConnection.SetSelectedLeague)
  async setSelectedLeague({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { leagueSlug } }): Promise<void> {
    patchState({ league: leagueSlug });
  }

  @Action(FastCastConnection.SetFastcastPause)
  async setFastcastPause({ patchState, getState }: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = getState().pause;

    if (pause) {
      patchState({ pause: false });
      this.store.dispatch(new FastCastConnection.ConnectWebSocket());
    } else {
      patchState({ pause: true });
      this.store.dispatch(new FastCastConnection.DisconnectWebSocket());
    }
  }
}
