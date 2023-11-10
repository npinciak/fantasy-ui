import { Injectable } from '@angular/core';
import { FASTCAST_SERVICE_URI, fastcastURIBuilder } from '@app/espn/espn.const';
import { EspnService } from '@app/espn/service/espn.service';
import { Action, State, StateContext } from '@ngxs/store';
import { OPERATION_CODE, WebSocketBuilder, WebSocketResponseProps } from '@sports-ui/ui-sdk/espn-fastcast-client';
import { firstValueFrom, isObservable, lastValueFrom, startWith, tap } from 'rxjs';
import { FastCastConnection } from '../actions/espn-fastcast-connection.actions';
import { EspnFastcastConnectionFacade } from '../facade/espn-fastcast-connection.facade';
import { EspnFastcastEventFacade } from '../facade/espn-fastcast-event.facade';
import { EspnFastcastLeagueFacade } from '../facade/espn-fastcast-league.facade';
import { FastcastSportFacade } from '../facade/espn-fastcast-sport.facade';
import { FastcastTeamFacade } from '../facade/espn-fastcast-team.facade';
import { EspnFastcastConnectionStateModel } from '../models/fastcast-connection-state.model';
import { EspnFastcastService } from '../service/espn-fastcast.service';

@State({ name: FastCastConnection.stateName + 'Actionhandler' })
@Injectable()
export class EspnFastcastConnectionHandler {
  constructor(
    private espnService: EspnService,
    private fastcastConnectionFacade: EspnFastcastConnectionFacade,
    private fastcastSportsFacade: FastcastSportFacade,
    private fastcastTeamsFacade: FastcastTeamFacade,
    private fastcastEventsFacade: EspnFastcastEventFacade,
    private fastcastLeaguesFacade: EspnFastcastLeagueFacade,
    private fastcastService: EspnFastcastService
  ) {}

  @Action(FastCastConnection.ConnectWebSocket)
  async connectWebsocket(_: StateContext<EspnFastcastConnectionStateModel>): Promise<void> {
    const pause = this.fastcastConnectionFacade.pause;

    if (pause) return;

    const websocketInfo = await firstValueFrom(this.fastcastService.fastCastWebsocket());
    const socket = new WebSocketBuilder(websocketInfo, FASTCAST_SERVICE_URI);

    await lastValueFrom(
      this.fastcastService.connect(socket.websocketUri).pipe(
        startWith(
          this.fastcastConnectionFacade.sendWebSocketMessage({
            op: OPERATION_CODE.CONNECT,
          })
        ),
        tap(message => {
          if (!isObservable(message)) this.fastcastConnectionFacade.handleWebSocketMessage(message);
        })
      )
    );
  }

  @Action(FastCastConnection.HandleWebSocketMessage)
  handleWebSocketMessage(_: StateContext<EspnFastcastConnectionStateModel>, { payload }: { payload: WebSocketResponseProps }): void {
    const { op, sid, pl, mid } = payload;

    const eventType = this.fastcastConnectionFacade.eventType;

    const pause = this.fastcastConnectionFacade.pause;

    if (pause) this.fastcastConnectionFacade.disconnect();

    switch (op) {
      case OPERATION_CODE.B:
        break;
      case OPERATION_CODE.CONNECT: {
        const outgoing = { op: OPERATION_CODE.S, sid, tc: eventType! };

        this.fastcastConnectionFacade.sendWebSocketMessage(outgoing);
        break;
      }
      case OPERATION_CODE.P:
        // const outgoing = { op: OPERATION_CODE.P, sid: message.sid, pl: message.pl, tc: eventType, mid: message.mid };
        // dispatch(new SendWebSocketMessage({ message: outgoing }));
        break;
      case OPERATION_CODE.H: {
        this.fastcastConnectionFacade.fetchFastcast(pl);
        break;
      }
      case OPERATION_CODE.I: {
        const uri = fastcastURIBuilder(eventType, mid);
        this.fastcastConnectionFacade.fetchFastcast(uri);
        break;
      }
      case OPERATION_CODE.Error:
        this.fastcastConnectionFacade.disconnect();
        break;
      default:
        break;
    }

    this.fastcastConnectionFacade.setLastRefresh();
  }

  @Action(FastCastConnection.SendWebSocketMessage)
  sendWebSocketMessage(_: StateContext<EspnFastcastConnectionStateModel>, { payload }: { payload: WebSocketResponseProps }): void {
    this.fastcastService.sendMessage(payload);
  }

  @Action(FastCastConnection.DisconnectWebSocket)
  disconnectWebsocket(): void {
    this.fastcastService.disconnect();
    this.fastcastConnectionFacade.setDisconnectWebsocket();
  }

  @Action(FastCastConnection.FetchFastcast)
  async fetchFastcast(_: StateContext<EspnFastcastConnectionStateModel>, { payload: { uri } }): Promise<void> {
    const { sports, leagues, events, teams } = await firstValueFrom(this.espnService.fetchFastcast(uri));

    await Promise.all([
      firstValueFrom(this.fastcastEventsFacade.addOrUpdate(events)),
      firstValueFrom(this.fastcastTeamsFacade.addOrUpdate(teams)),
      firstValueFrom(this.fastcastSportsFacade.addOrUpdate(sports)),
      firstValueFrom(this.fastcastLeaguesFacade.addOrUpdate(leagues)),
    ]);
  }

  @Action(FastCastConnection.FetchStaticFastcast)
  async fetchStaticFastcast(
    _: StateContext<EspnFastcastConnectionStateModel>,
    { payload: { sport, league, weeks, seasontype } }
  ): Promise<void> {
    const { sports, leagues, events, teams } = await firstValueFrom(
      this.espnService.fetchStaticScoreboard({ sport, league, weeks, seasontype })
    );

    await Promise.all([
      firstValueFrom(this.fastcastEventsFacade.addOrUpdate(events)),
      firstValueFrom(this.fastcastTeamsFacade.addOrUpdate(teams)),
      firstValueFrom(this.fastcastSportsFacade.addOrUpdate(sports)),
      firstValueFrom(this.fastcastLeaguesFacade.addOrUpdate(leagues)),
      firstValueFrom(this.fastcastConnectionFacade.setSelectedLeague(leagues[0].id)),
    ]);
  }
}
