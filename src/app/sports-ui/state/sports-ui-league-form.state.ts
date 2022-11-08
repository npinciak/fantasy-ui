import { Injectable } from '@angular/core';
import { SchemeHeaderExpertService } from '@app/sports-ui/service/scheme-header-expert.service';
import { Action, State, StateContext } from '@ngxs/store';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiLeagueForm } from '../actions/sports-ui-league-form.actions';
import { SportsUiLeagues } from '../actions/sports-ui-leagues.actions';

export interface SportsUiLeagueFormStateModel {
  leagueSport: FantasySports | null;
  leagueId: string | null;
  leagueName: string | null;
  leagueYear: string;
  verified: boolean;
}

@State<SportsUiLeagueFormStateModel>({
  name: 'sportsUiLeagueForm',
  defaults: {
    leagueSport: FantasySports.Baseball,
    leagueId: null,
    leagueName: null,
    leagueYear: new Date().getFullYear().toString(),
    verified: false,
  },
})
@Injectable()
export class SportsUiLeagueFormState {
  constructor(private api: SchemeHeaderExpertService) {}

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
    setState({
      leagueId: null,
      leagueSport: FantasySports.Baseball,
      leagueName: null,
      leagueYear: new Date().getFullYear().toString(),
      verified: false,
    });
  }

  @Action(SportsUiLeagueForm.Submit)
  async submit({ dispatch }: StateContext<SportsUiLeagueFormStateModel>) {
    await dispatch(new SportsUiLeagues.VerifyLeagues()).toPromise();
    // dispatch([new CreateLeague()]);
  }
}
