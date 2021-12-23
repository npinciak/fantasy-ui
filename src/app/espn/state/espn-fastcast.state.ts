/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { ConnectWebSocket, DisconnectWebSocket, FetchFastcast, PatchEvents } from '../actions/espn-fastcast.actions';

import { EspnFastcastService } from '../espn-fastcast.service';
import { FASTCAST_BASE } from '../espn.const';
import { EspnService } from '../espn.service';
import { OPCode } from '../models/espn-fastcast-socket.model';
import { FastcastEvent } from '../models/fastcast-event.model';

export interface EspnFastcastStateModel {
  map: { [id: string]: SportMapModel };
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

export interface SportMapModel {
  [slug: string]: LeagueMapModel;
}

export interface LeagueMapModel {
  [league: string]: LeagueEvents;
}

export interface LeagueEvents {
  event: FastcastEvent[];
}

export interface LeagueEventList {
  league: string;
  events: FastcastEvent[];
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
  static selectSportMap(state: EspnFastcastStateModel): {
    [id: string]: SportMapModel;
  } {
    return state.map;
  }

  @Selector()
  static selectLastRefresh(state: EspnFastcastStateModel): number {
    return state.lastRefresh;
  }

  @Action(ConnectWebSocket)
  async connectWebsocket({ getState, patchState }: StateContext<EspnFastcastStateModel>) {
    const state = getState();
    await this.fastcastService.fastCastWebsocket().toPromise();
    this.fastcastService.webSocketSubject$.subscribe(message => {
      switch (message.op) {
        case OPCode.C:
          const msg = {
            op: OPCode.S,
            sid: message.sid,
            tc: FastcastEventType.Top,
          };
          this.fastcastService.sendMessage(msg);
          break;
        case OPCode.P:
          const test: { ts: number; '~c': number; pl: string } = JSON.parse(message.pl);
          break;
        case OPCode.H:
          this.store.dispatch(new FetchFastcast({ uri: message.pl }));
          break;
        case OPCode.I:
          const uri = `${FASTCAST_BASE}/${message.mid}/checkpoint`;

          this.store.dispatch(new FetchFastcast({ uri }));
          break;
        case OPCode.Error:
          console.error(`SOCKET ERROR ${OPCode.Error}`);

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
  async fetchFastcast({ getState, patchState }: StateContext<EspnFastcastStateModel>, { payload: { uri } }: FetchFastcast) {
    const state = getState();
    const data = await this.espnService.espnFastcast(uri).toPromise();

    const map = entityMap(data, sport => sport.slug);
    const lastRefresh = new Date().getTime();

    patchState({ ...state, map, lastRefresh });
  }

  @Action(PatchEvents)
  patchEvents(ctx: StateContext<EspnFastcastStateModel>, { payload: { events } }: PatchEvents) {
    // ctx.setState(setMap(events, event => event.id));
  }
}

const opCodeKeyMap: { [key in OPCode]: string } = {
  [OPCode.B]: '',
  [OPCode.C]: '',
  [OPCode.H]: '',
  [OPCode.S]: '',
  [OPCode.R]: '',
  [OPCode.P]: '',
  [OPCode.I]: '',
  [OPCode.Error]: '',
};

export enum FastcastEventType {
  Top = 'event-topevents',
  Soccer = 'event-soccer',
}
