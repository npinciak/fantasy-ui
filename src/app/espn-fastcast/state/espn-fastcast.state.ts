import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  FetchFastcast,
  HandleWebSocketMessage,
  SendWebSocketMessage,
} from '@app/espn-fastcast/actions/espn-fastcast.actions';
import { FASTCAST_BASE } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { FastcastEventType, OperationCode, WebSocketBuilder } from '../models/espn-fastcast-socket.model';
import { EspnFastcastService } from '../service/espn-fastcast.service';
import { PatchFastcastEvents } from './espn-fastcast-event.state';
import { PatchFastcastLeague } from './espn-fastcast-league.state';
import { PatchFastcastTeams } from './espn-fastcast-team.state';

export interface EspnFastcastStateModel {
  disconnect: number | null;
  connect: number | null;
  lastRefresh: number | null;
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
  static selectLastRefresh(state: EspnFastcastStateModel): number | null {
    return state.lastRefresh;
  }

  @Selector()
  static selectLastDisconnect(state: EspnFastcastStateModel): number | null {
    return state.disconnect;
  }

  @Selector()
  static selectConnected(state: EspnFastcastStateModel): number | null {
    return state.connect;
  }

  @Action(ConnectWebSocket)
  async connectWebsocket({ getState, patchState, dispatch }: StateContext<EspnFastcastStateModel>): Promise<void> {
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
  ): void {
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
        dispatch(new FetchFastcast({ uri }));
        break;
      case OperationCode.Error:
        dispatch(new DisconnectWebSocket());
        break;
      default:
        break;
    }
    const lastRefresh = new Date().getTime();
    patchState({ ...getState(), lastRefresh });
  }

  @Action(SendWebSocketMessage)
  sendWebSocketMessage({}: StateContext<EspnFastcastStateModel>, { payload: { message } }: SendWebSocketMessage): void {
    this.fastcastService.sendMessage(message);
  }

  @Action(DisconnectWebSocket)
  async disconnectWebsocket({ getState, patchState }: StateContext<EspnFastcastStateModel>): Promise<void> {
    const state = getState();
    this.fastcastService.disconnect();
    const disconnect = new Date().getTime();

    patchState({ ...state, disconnect });
  }

  @Action(FetchFastcast)
  fetchFastcast({ dispatch }: StateContext<EspnFastcastStateModel>, { payload: { uri } }: FetchFastcast): Subscription {
    return this.espnService.espnFastcast(uri).subscribe(data => {
      const leagues = entityMap(data.leagues, l => l?.uid);
      const events = entityMap(data.events, e => e?.uid);
      const teams = entityMap(data.teams, t => t?.uid);
      dispatch([
        new PatchFastcastLeague({ map: leagues }),
        new PatchFastcastEvents({ map: events }),
        new PatchFastcastTeams({ map: teams }),
      ]);
    });
  }
}
