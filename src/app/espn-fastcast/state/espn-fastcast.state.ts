import { Injectable } from '@angular/core';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  FetchFastcast,
  HandleWebSocketMessage,
  SendWebSocketMessage,
  SetSelectedEventType,
} from '@app/espn-fastcast/actions/espn-fastcast.actions';
import { FASTCAST_BASE } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { startWith, tap } from 'rxjs/operators';
import { SetFastcastEvents } from '../actions/espn-fastcast-event.actions';
import { SetFastcastLeague } from '../actions/espn-fastcast-league.actions';
import { SetFastcastSports } from '../actions/espn-fastcast-sport.actions';
import { SetFastcastTeams } from '../actions/espn-fastcast-team.actions';
import { FastcastEventType, OperationCode, WebSocketBuilder } from '../models/espn-fastcast-socket.model';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from '../selectors/espn-fastcast-sport.selectors';
import { EspnFastcastSelectors } from '../selectors/espn-fastcast.selectors';
import { EspnFastcastService } from '../service/espn-fastcast.service';

export interface EspnFastcastStateModel {
  disconnect: number | null;
  connect: number | null;
  lastRefresh: number | null;
  eventType: string | null;
  connectionClosed: boolean;
}

@State<EspnFastcastStateModel>({
  name: 'espnFastcast',
  defaults: {
    disconnect: null,
    connect: null,
    lastRefresh: null,
    eventType: null,
    connectionClosed: true,
  },
})
@Injectable()
export class EspnFastcastState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Action(ConnectWebSocket)
  async connectWebsocket({ patchState, dispatch }: StateContext<EspnFastcastStateModel>): Promise<void> {
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

    patchState({ connect });
  }

  @Action(HandleWebSocketMessage)
  handleWebSocketMessage(
    { patchState, dispatch }: StateContext<EspnFastcastStateModel>,
    { payload: { message } }: HandleWebSocketMessage
  ): void {
    const eventType = this.store.selectSnapshot(EspnFastcastSelectors.getEventType);

    switch (message.op) {
      case OperationCode.B:
        break;
      case OperationCode.C:
        // if (eventType == null) {
        const outgoing = { op: OperationCode.S, sid: message.sid, tc: FastcastEventType.TopEvents };
        dispatch(new SendWebSocketMessage({ message: outgoing }));
        // } else {
        // const outgoing = { op: OperationCode.S, sid: message.sid, tc: eventType };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));
        // }

        break;
      case OperationCode.P:
        // const outgoing = { op: OperationCode.P, sid: message.sid, pl: message.pl, tc: eventType, mid: message.mid };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));

        // op(pin): "P"
        // pl(pin): "{"ts":1653334802929,"~c":1,"pl":"eJyLrlbKL1CyUipKLchJTE5V0lEqSCzJAAoUW5kZGNTlWFkYG5jUpVqZGZsaWJrVJUMZ+sk5+cnZQNVliTmlqUDlpobqSrU6ZBqWVpqTE1ySWFJajG6usZ6Bmau2MTVMTsksBuqtdKaRw0sqC1L1U1JLEjNzaGV6cUZ+UYkLVa0oLs3NTSyqRDcuFgDWXKEg"}"
        // tc(pin): "event-topevents"
        // mid(pin): 15059226
        break;
      case OperationCode.H:
        dispatch(new FetchFastcast({ uri: message.pl }));
        break;
      case OperationCode.I:
        // if (eventType == null) {
        const uri = `${FASTCAST_BASE}/${FastcastEventType.TopEvents}/message/${message.mid}/checkpoint`;
        dispatch(new FetchFastcast({ uri }));
        // } else {
        //   const uri = `${FASTCAST_BASE}/${eventType}/message/${message.mid}/checkpoint`;
        //   dispatch(new FetchFastcast({ uri }));
        // }

        break;
      case OperationCode.Error:
        dispatch(new DisconnectWebSocket());
        break;
      default:
        break;
    }
    const lastRefresh = new Date().getTime();
    patchState({ lastRefresh });
  }

  @Action(SendWebSocketMessage)
  sendWebSocketMessage(_: StateContext<EspnFastcastStateModel>, { payload: { message } }: SendWebSocketMessage): void {
    this.fastcastService.sendMessage(message);
  }

  @Action(DisconnectWebSocket)
  disconnectWebsocket({ patchState }: StateContext<EspnFastcastStateModel>): void {
    this.fastcastService.disconnect();
    const disconnect = new Date().getTime();

    patchState({ disconnect });
  }

  @Action(FetchFastcast)
  async fetchFastcast({ dispatch }: StateContext<EspnFastcastStateModel>, { payload: { uri } }: FetchFastcast): Promise<void> {
    const { sports, leagues, events, teams } = await this.espnService.espnFastcast(uri).toPromise();

    dispatch([new SetFastcastSports(sports), new SetFastcastLeague(leagues), new SetFastcastEvents(events), new SetFastcastTeams(teams)]);
  }

  @Action(SetSelectedEventType)
  async setSelectedEventType(
    { patchState, dispatch }: StateContext<EspnFastcastStateModel>,
    { payload: { eventType } }: SetSelectedEventType
  ): Promise<void> {
    // await dispatch([DisconnectWebSocket]).toPromise();
    if (eventType == null) return;
    const sportId = eventType.split('~')[0];

    const sport = this.store.selectSnapshot(EspnFastcastSportSelectors.getById)(sportId)?.slug;
    const league = this.store.selectSnapshot(EspnFastcastLeagueSelectors.getById)(eventType)?.abbreviation.toLowerCase();
    patchState({ eventType: `event-${sport}-${league}` });
    // await dispatch([ConnectWebSocket]).toPromise();
  }
}
