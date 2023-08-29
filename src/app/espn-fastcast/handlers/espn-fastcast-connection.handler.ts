import { Injectable } from '@angular/core';
import { FASTCAST_SERVICE_URI, fastcastURIBuilder } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { OPERATION_CODE, WebSocketBuilder } from '@sports-ui/ui-sdk/espn-fastcast-client';
import { startWith, tap } from 'rxjs/operators';
import { FastCastConnection } from '../actions/espn-fastcast-connection.actions';
import { FastcastEvents } from '../actions/espn-fastcast-event.actions';
import { FastcastLeagues } from '../actions/espn-fastcast-league.actions';
import { FastcastSports } from '../actions/espn-fastcast-sport.actions';
import { FastcastTeams } from '../actions/espn-fastcast-team.actions';
import { EspnFastcastConnectionFacade } from '../facade/espn-fastcast-connection.facade';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastService } from '../service/espn-fastcast.service';

@State({ name: FastCastConnection.stateName + 'Actionhandler' })
@Injectable()
export class FastcastConnectionHandler {
  constructor(
    private espnService: EspnService,
    private store: Store,
    private fastcastConnectionFacade: EspnFastcastConnectionFacade,
    private fastcastService: EspnFastcastService
  ) {}

  @Action(FastCastConnection.ConnectWebSocket, { cancelUncompleted: true })
  async connectWebsocket({ patchState }: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = this.fastcastConnectionFacade.pause;

    if (pause) return;

    const websocketInfo = await this.fastcastService.fastCastWebsocket().toPromise();
    const connect = new Date().getTime();
    const socket = new WebSocketBuilder(websocketInfo, FASTCAST_SERVICE_URI);

    this.fastcastService
      .connect(socket.websocketUri)
      .pipe(
        startWith(this.fastcastConnectionFacade.sendWebSocketMessage({ message: { op: OPERATION_CODE.C } })),
        tap(message => {
          this.fastcastConnectionFacade.handleWebSocketMessage({ message });
        })
      )
      .toPromise();

    patchState({ connect, connectionClosed: false });
  }

  @Action(FastCastConnection.HandleWebSocketMessage)
  handleWebSocketMessage({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { message } }): void {
    const eventType = this.fastcastConnectionFacade.eventType;

    const pause = this.fastcastConnectionFacade.pause;

    if (pause) this.fastcastConnectionFacade.disconnect();

    switch (message.op) {
      case OPERATION_CODE.B:
        break;
      case OPERATION_CODE.CONNECT: {
        const outgoing = { op: OPERATION_CODE.S, sid: message.sid, tc: eventType };

        this.fastcastConnectionFacade.sendWebSocketMessage({ message: outgoing });
        break;
      }
      case OPERATION_CODE.P:
        // const outgoing = { op: OPERATION_CODE.P, sid: message.sid, pl: message.pl, tc: eventType, mid: message.mid };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));
        break;
      case OPERATION_CODE.H: {
        this.fastcastConnectionFacade.fetchFastcast(message.pl);
        break;
      }
      case OPERATION_CODE.I: {
        const uri = fastcastURIBuilder(eventType, message.mid);
        this.fastcastConnectionFacade.fetchFastcast(uri);
        break;
      }
      case OPERATION_CODE.Error:
        this.fastcastConnectionFacade.disconnect();
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
      new FastcastSports.AddOrUpdate(sports),
      new FastcastLeagues.AddOrUpdate(leagues),
      new FastcastEvents.AddOrUpdate(events),
      new FastcastTeams.AddOrUpdate(teams),
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
      new FastcastSports.AddOrUpdate(sports),
      new FastcastLeagues.AddOrUpdate(leagues),
      new FastcastEvents.AddOrUpdate(events),
      new FastcastTeams.AddOrUpdate(teams),
      new FastCastConnection.SetSelectedLeague({ leagueSlug: leagues[0].id }),
    ]);
  }
}
