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

    @Action(actionHandler.SetCurrentScoringPeriodStartDate)
    setCurrentScoringPeriodStartDate(
      { setState }: StateContext<FantasyLeagueBaseStateModel>,
      { payload: { currentScoringPeriodStartDate } }: { payload: { currentScoringPeriodStartDate: string | null } }
    ) {
      setState(patch<FantasyLeagueBaseStateModel>({ currentScoringPeriodStartDate }));
    }

    @Action(actionHandler.SetCurrentScoringPeriodEndDate)
    setCurrentScoringPeriodEndDate(
      { setState }: StateContext<FantasyLeagueBaseStateModel>,
      { payload: { currentScoringPeriodEndDate } }: { payload: { currentScoringPeriodEndDate: string | null } }
    ) {
      setState(patch<FantasyLeagueBaseStateModel>({ currentScoringPeriodEndDate }));
    }
  }
  return EspnLeagueStateBase;
}
