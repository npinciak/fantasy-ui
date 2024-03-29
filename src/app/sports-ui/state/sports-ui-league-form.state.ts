import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiLeagueForm } from '../actions/sports-ui-league-form.actions';

export interface SportsUiLeagueFormStateModel {
  leagueSport: FantasySports | null;
  leagueId: string | null;
  leagueName: string | null;
  leagueYear: string;
  verified: boolean;
}

const INITIAL_STATE = {
  leagueSport: FantasySports.Baseball,
  leagueId: null,
  leagueName: null,
  leagueYear: new Date().getFullYear().toString(),
  verified: false,
};

@State<SportsUiLeagueFormStateModel>({
  name: 'sportsUiLeagueForm',
  defaults: INITIAL_STATE,
})
@Injectable()
export class SportsUiLeagueFormState {
  @Action(SportsUiLeagueForm.SetLeagueSportValue)
  setSportValue(
    { patchState }: StateContext<SportsUiLeagueFormStateModel>,
    { payload: { leagueSport } }: SportsUiLeagueForm.SetLeagueSportValue
  ): void {
    patchState({ leagueSport });
  }

  @Action(SportsUiLeagueForm.SetLeagueIdValue)
  setLeagueIdValue(
    { patchState }: StateContext<SportsUiLeagueFormStateModel>,
    { payload: { leagueId } }: SportsUiLeagueForm.SetLeagueIdValue
  ): void {
    patchState({ leagueId });
  }

  @Action(SportsUiLeagueForm.SetLeagueNameValue)
  setLeagueNameValue(
    { patchState }: StateContext<SportsUiLeagueFormStateModel>,
    { payload: { leagueName } }: SportsUiLeagueForm.SetLeagueNameValue
  ): void {
    patchState({ leagueName });
  }

  @Action(SportsUiLeagueForm.Reset)
  reset({ setState }: StateContext<SportsUiLeagueFormStateModel>): void {
    setState(INITIAL_STATE);
  }
}
