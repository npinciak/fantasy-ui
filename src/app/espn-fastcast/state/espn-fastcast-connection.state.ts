import { Injectable } from '@angular/core';
import { FastCastConnection } from '@app/espn-fastcast/actions/espn-fastcast-connection.actions';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { EspnFastcastConnectionStateModel, INITIAL_STATE } from '../models/fastcast-connection-state.model';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';
import { EspnFastcastSportSelectors } from '../selectors/espn-fastcast-sport.selectors';
import { transformSportToFastcastEventType } from '../transformers/espn-fastcast.transformers';

@State<EspnFastcastConnectionStateModel>({
  name: FastCastConnection.stateName,
  defaults: INITIAL_STATE,
})
@Injectable()
export class EspnFastcastConnectionState {
  constructor(private store: Store) {}

  @Action(FastCastConnection.SetDisconnect)
  setDisconnectWebsocket({ patchState }: StateContext<EspnFastcastConnectionStateModel>): void {
    const disconnect = new Date().getTime();
    patchState({ disconnect });
  }

  @Action(FastCastConnection.SetLastRefresh)
  setLastRefresh({ patchState }: StateContext<EspnFastcastConnectionStateModel>): void {
    const lastRefresh = new Date().getTime();
    patchState({ lastRefresh });
  }

  @Action(FastCastConnection.SetSelectedEventType)
  setSelectedEventType({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { eventType } }): void {
    const sportId = exists(eventType) ? (eventType.split('~')[0] as string) : null;

    const sport = this.store.selectSnapshot(EspnFastcastSportSelectors.getById)(sportId)?.slug;
    const league = this.store.selectSnapshot(EspnFastcastLeagueSelectors.getById)(eventType)?.abbreviation.toLowerCase();

    if (sport != undefined && league != undefined) {
      const eventType = transformSportToFastcastEventType({ sport, league });
      patchState({ eventType });
    }
  }

  @Action(FastCastConnection.SetSelectedLeague)
  setSelectedLeague({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { leagueSlug } }): void {
    patchState({ league: leagueSlug });
  }

  @Action(FastCastConnection.SetSelectedDate)
  setSelectedDate({ patchState }: StateContext<EspnFastcastConnectionStateModel>, { payload: { date } }): void {
    patchState({ date });
  }

  @Action(FastCastConnection.SetFastcastPause)
  setFastcastPause({ patchState, getState }: StateContext<EspnFastcastConnectionStateModel>): void {
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
