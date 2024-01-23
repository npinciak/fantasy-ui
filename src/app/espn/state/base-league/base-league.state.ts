import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { FantasyLeagueBaseStateModel, IBaseLeagueActionsClass, INITIAL_STATE } from './base-league.model';

export function FantasyLeagueBaseState({ actionHandler }: { actionHandler: IBaseLeagueActionsClass }) {
  @State<FantasyLeagueBaseStateModel>({
    name: 'espnLeagueBaseState',
    defaults: INITIAL_STATE,
  })
  @Injectable()
  class EspnLeagueStateBase {
    static setLeague = actionHandler.SetLeague;

    @Action(actionHandler.SetLeague)
    setFantasyLeague(
      { setState }: StateContext<FantasyLeagueBaseStateModel>,
      { payload: { state } }: { payload: { state: FantasyLeagueBaseStateModel } }
    ) {
      setState({ ...state });
    }

    @Action(actionHandler.SetCurrentScoringPeriodId)
    setCurrentScoringPeriodId(
      { setState }: StateContext<FantasyLeagueBaseStateModel>,
      { payload: { scoringPeriodId } }: { payload: { scoringPeriodId: string | null } }
    ) {
      setState(patch<FantasyLeagueBaseStateModel>({ scoringPeriodId }));
    }
  }
  return EspnLeagueStateBase;
}
