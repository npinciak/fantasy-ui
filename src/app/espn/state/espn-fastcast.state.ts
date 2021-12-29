import { Injectable } from '@angular/core';
import { flatten } from '@app/@shared/helpers/utils';
import { entityMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { ConnectWebSocket, DisconnectWebSocket, FetchFastcast, PatchEvents } from '../actions/espn-fastcast.actions';

import { EspnFastcastService } from '../espn-fastcast.service';
import { FASTCAST_BASE } from '../espn.const';
import { EspnService } from '../espn.service';
import { FastcastEventType, OperationCode } from '../models/espn-fastcast-socket.model';
import { SportsEntity as SportsImport, LeaguesEntity as LeaguesImport, EventsEntity as EventsImport } from '../models/espn-fastcast.model';
import { FastcastEvent } from '../models/fastcast-event.model';

export interface EspnFastcastStateModel {
  map: { [id: string]: FastcastEvent };
  disconnect: number;
  connect: number;
  lastRefresh: number;
}

export enum FastCastSportSlug {
  Basketball = 'basketball',
  Baseball = 'baseball',
  Soccer = 'soccer',
  MMA = 'mma',
  Football = 'football',
  Hockey = 'hockey',
}

@State<EspnFastcastStateModel>({
  name: 'fastcast',
  defaults: {
    map: {},
    disconnect: null,
    connect: null,
    lastRefresh: null,
  },
})
@Injectable()
export class EspnFastcastState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Selector()
  static selectMap(state: EspnFastcastStateModel) {
    return state.map;
  }

  @Selector()
  static selectLastRefresh(state: EspnFastcastStateModel): number {
    return state.lastRefresh;
  }

  @Selector()
  static selectLastDisconnect(state: EspnFastcastStateModel): number {
    return state.disconnect;
  }

  @Action(ConnectWebSocket)
  async connectWebsocket({ getState, patchState }: StateContext<EspnFastcastStateModel>) {
    const state = getState();
    await this.fastcastService.fastCastWebsocket().toPromise();

    this.fastcastService.webSocketSubject$.subscribe(message => {
      switch (message.op) {
        case OperationCode.C:
          const msg = {
            op: OperationCode.S,
            sid: message.sid,
            tc: FastcastEventType.Top,
          };
          this.fastcastService.sendMessage(msg);
          break;
        case OperationCode.H:
          this.store.dispatch(new FetchFastcast({ uri: message.pl }));
          break;
        case OperationCode.I:
          const uri = `${FASTCAST_BASE}/${message.mid}/checkpoint`;
          this.store.dispatch(new FetchFastcast({ uri }));
          break;
        case OperationCode.Error:
          console.error(`SOCKET ERROR ${OperationCode.Error}`);
          this.store.dispatch(new DisconnectWebSocket());
          const disconnect = new Date().getTime();
          patchState({ ...state, disconnect });
          break;
        default:
          break;
      }
    });

    const connect = new Date().getTime();
    patchState({ ...state, connect });
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
      const map = entityMap(data, event => event.id);
      dispatch(new PatchEvents({ map }));
    });
  }

  @Action(PatchEvents)
  patchEvents({ patchState, getState }: StateContext<EspnFastcastStateModel>, { payload: { map } }: PatchEvents) {
    const state = getState();
    const lastRefresh = new Date().getTime();

    patchState({ ...state, map, lastRefresh });
  }
}
