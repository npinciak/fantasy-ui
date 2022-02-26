import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { startWith, tap } from 'rxjs/operators';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  FetchFastcast,
  HandleWebSocketMessage,
  SendWebSocketMessage,
} from '../actions/espn-fastcast.actions';
import { FASTCAST_BASE } from '../espn.const';
import { FastcastEventType, OperationCode, WebSocketBuilder } from '../models/espn-fastcast-socket.model';
import { EspnFastcastService } from '../service/espn-fastcast.service';
import { EspnService } from '../service/espn.service';
import { PatchFastcastEvents } from './espn-fastcast-event.state';
import { PatchFastcastLeague } from './espn-fastcast-league.state';

export interface EspnFastcastStateModel {
  disconnect: number;
  connect: number;
  lastRefresh: number;
}

@State<EspnFastcastStateModel>({
  name: 'espnFastcast',
  defaults: {
    disconnect: null,
    connect: null,
    lastRefresh: null,
  },
})
@Injectable()
export class EspnFastcastState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService) {}

  @Selector()
  static selectLastRefresh(state: EspnFastcastStateModel): number {
    return state.lastRefresh;
  }

  @Selector()
  static selectLastDisconnect(state: EspnFastcastStateModel): number {
    return state.disconnect;
  }

  @Selector()
  static selectConnected(state: EspnFastcastStateModel): number {
    return state.connect;
  }

  @Action(ConnectWebSocket)
  async connectWebsocket({ getState, patchState, dispatch }: StateContext<EspnFastcastStateModel>) {
    const state = getState();
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

    patchState({ ...state, connect });
  }

  @Action(HandleWebSocketMessage)
  handleWebSocketMessage(
    { getState, patchState, dispatch }: StateContext<EspnFastcastStateModel>,
    { payload: { message } }: HandleWebSocketMessage
  ) {
    switch (message.op) {
      case OperationCode.C:
        const outgoing = { op: OperationCode.S, sid: message.sid, tc: FastcastEventType.TopEvents };
        dispatch(new SendWebSocketMessage({ message: outgoing }));
        break;
      case OperationCode.H:
        dispatch(new FetchFastcast({ uri: message.pl }));
        break;
      case OperationCode.I:
        const uri = `${FASTCAST_BASE}/${message.mid}/checkpoint`;
        const lastRefresh = new Date().getTime();
        dispatch(new FetchFastcast({ uri }));
        patchState({ ...getState(), lastRefresh });
        break;
      case OperationCode.Error:
        dispatch(new DisconnectWebSocket());
        break;
      default:
        break;
    }
  }

  @Action(SendWebSocketMessage)
  sendWebSocketMessage({}: StateContext<EspnFastcastStateModel>, { payload: { message } }: SendWebSocketMessage) {
    this.fastcastService.sendMessage(message);
  }

  @Action(DisconnectWebSocket)
  async disconnectWebsocket({ getState, patchState }: StateContext<EspnFastcastStateModel>) {
    const state = getState();
    this.fastcastService.disconnect();
    const disconnect = new Date().getTime();

    patchState({ ...state, disconnect });
  }

  @Action(FetchFastcast)
  fetchFastcast({ dispatch }: StateContext<EspnFastcastStateModel>, { payload: { uri } }: FetchFastcast) {
    return this.espnService.espnFastcast(uri).subscribe(data => {
      const leagues = entityMap(data.transformLeaguesImportToLeagues, l => l.id);
      const events = entityMap(data.transformEventImportToFastcastEvent, e => e.id);

      dispatch([new PatchFastcastLeague({ map: leagues }), new PatchFastcastEvents({ map: events })]);
    });
  }
}
