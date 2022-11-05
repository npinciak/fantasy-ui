import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  FetchFastcast,
  HandleWebSocketMessage,
  name,
  SendWebSocketMessage,
  SetFastcastPause,
  SetSelectedEventType,
  SetSelectedLeague,
} from '@app/espn-fastcast/actions/espn-fastcast-connection.actions';
import {
  FastcastEventType,
  OperationCode,
  transformSportToFastcastEventType,
  WebSocketBuilder,
} from '@app/espn-fastcast/models/espn-fastcast-socket.model';
import { fastcastURIBuilder } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { startWith, tap } from 'rxjs/operators';
import { SetFastcastEvents } from '../actions/espn-fastcast-event.actions';
import { SetFastcastLeague } from '../actions/espn-fastcast-league.actions';
import { SetFastcastSports } from '../actions/espn-fastcast-sport.actions';
import { SetFastcastTeams } from '../actions/espn-fastcast-team.actions';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastConnectionSelectors } from '../selectors/espn-fastcast-connection.selectors';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from '../selectors/espn-fastcast-sport.selectors';
import { EspnFastcastService } from '../service/espn-fastcast.service';

@State<EspnFastcastConnectionStateModel>({
  name,
  defaults: {
    disconnect: null,
    connect: null,
    lastRefresh: null,
    eventType: FastcastEventType.TopEvents,
    league: '90',
    connectionClosed: true,
    pause: true,
  },
})
@Injectable()
export class EspnFastcastConnectionState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Action(ConnectWebSocket)
  async connectWebsocket({ getState, patchState, dispatch }: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = getState().pause;

    if (pause) {
      return;
    }

    const websocketInfo = await this.fastcastService.fastCastWebsocket().toPromise();
    const connect = new Date().getTime();
    const socket = new WebSocketBuilder(websocketInfo);

    await this.fastcastService
      .connect(socket.websocketUri)
      .pipe(
        startWith(dispatch(new SendWebSocketMessage({ message: { op: OperationCode.C } }))),
        tap(message => dispatch(new HandleWebSocketMessage({ message })))
      )
      .toPromise();

    patchState({ connect, connectionClosed: false });
  }

  @Action(HandleWebSocketMessage)
  handleWebSocketMessage(
    { getState, patchState }: StateContext<EspnFastcastConnectionStateModel>,
    { payload: { message } }: HandleWebSocketMessage
  ): void {
    const eventType = this.store.selectSnapshot(EspnFastcastConnectionSelectors.getEventType);

    const pause = getState().pause;

    if (pause) {
      this.store.dispatch(new DisconnectWebSocket());
      return;
    }

    switch (message.op) {
      case OperationCode.B:
        break;
      case OperationCode.C:
        const outgoing = { op: OperationCode.S, sid: message.sid, tc: eventType };
        this.store.dispatch(new SendWebSocketMessage({ message: outgoing }));

        break;
      case OperationCode.P:
        // const outgoing = { op: OperationCode.P, sid: message.sid, pl: message.pl, tc: eventType, mid: message.mid };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));
        break;
      case OperationCode.H:
        const uriOpH = message.pl;
        this.store.dispatch(new FetchFastcast({ uri: uriOpH }));
        break;
      case OperationCode.I:
        const uri = fastcastURIBuilder(eventType, message.mid);
        this.store.dispatch(new FetchFastcast({ uri }));
        break;
      case OperationCode.Error:
        this.store.dispatch(new DisconnectWebSocket());
        break;
      default:
        break;
    }

    const lastRefresh = new Date().getTime();
    patchState({ lastRefresh });
  }

  @Action(SendWebSocketMessage)
  sendWebSocketMessage(_: StateContext<EspnFastcastConnectionStateModel>, { payload: { message } }: SendWebSocketMessage): void {
    this.fastcastService.sendMessage(message);
  }

  @Action(DisconnectWebSocket)
  disconnectWebsocket({ patchState }: StateContext<EspnFastcastConnectionStateModel>): void {
    this.fastcastService.disconnect();

    const disconnect = new Date().getTime();

    patchState({ disconnect });
  }

  @Action(FetchFastcast)
  async fetchFastcast({}: StateContext<EspnFastcastConnectionStateModel>, { payload: { uri } }: FetchFastcast): Promise<void> {
    const { sports, leagues, events, teams } = await this.espnService.espnFastcast(uri).toPromise();

    this.store.dispatch([
      new SetFastcastSports(sports),
      new SetFastcastLeague(leagues),
      new SetFastcastEvents(events),
      new SetFastcastTeams(teams),
    ]);
  }

  @Action(SetSelectedEventType)
  async setSelectedEventType(
    { patchState }: StateContext<EspnFastcastConnectionStateModel>,
    { payload: { eventType } }: SetSelectedEventType
  ): Promise<void> {
    const sportId = exists(eventType) ? eventType.split('~')[0] : null;

    const sport = this.store.selectSnapshot(EspnFastcastSportSelectors.getById)(sportId)?.slug;
    const league = this.store.selectSnapshot(EspnFastcastLeagueSelectors.getById)(eventType)?.abbrev.toLowerCase();

    if (sport != undefined && league != undefined) {
      const eventType = transformSportToFastcastEventType({ sport, league });
      patchState({ eventType });
    }
  }

  @Action(SetSelectedLeague)
  async setSelectedLeague(
    { patchState }: StateContext<EspnFastcastConnectionStateModel>,
    { payload: { leagueSlug } }: SetSelectedLeague
  ): Promise<void> {
    patchState({ league: leagueSlug });
  }

  @Action(SetFastcastPause)
  async setFastcastPause({ patchState, getState }: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = getState().pause;

    if (pause) {
      patchState({ pause: false });
      this.store.dispatch(new ConnectWebSocket());
    } else {
      patchState({ pause: true });
      this.store.dispatch(new DisconnectWebSocket());
    }
  }
}