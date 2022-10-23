import { Injectable } from '@angular/core';
import { SchemeHeaderExpertService } from '@app/sports-ui/service/scheme-header-expert.service';
import { Action, State, StateContext } from '@ngxs/store';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiLeagues } from '../actions/sports-ui-leagues.actions';

export class SetLeagueSportValue {
  static readonly type = '[sportsUiLeagueForm] SetLeagueSportValue';
  constructor(public payload: { leagueSport: FantasySports }) {}
}

export class SetLeagueIdValue {
  static readonly type = '[sportsUiLeagueForm] SetLeagueIdValue';
  constructor(public payload: { leagueId: string }) {}
}

export class SetLeagueNameValue {
  static readonly type = '[sportsUiLeagueForm] SetLeagueNameValue';
  constructor(public payload: { leagueName: string }) {}
}

export class Reset {
  static readonly type = '[sportsUiLeagueForm] Reset';
}

export class Submit {
  static readonly type = '[sportsUiLeagueForm] Submit';
}

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

  @Action(SetLeagueSportValue)
  setSportValue({ patchState }: StateContext<SportsUiLeagueFormStateModel>, { payload: { leagueSport } }: SetLeagueSportValue): void {
    patchState({ leagueSport });
  }

  @Action(SetLeagueIdValue)
  setLeagueIdValue({ patchState }: StateContext<SportsUiLeagueFormStateModel>, { payload: { leagueId } }: SetLeagueIdValue): void {
    patchState({ leagueId });
  }

  @Action(Reset)
  reset({ setState }: StateContext<SportsUiLeagueFormStateModel>): void {
    setState({
      leagueId: null,
      leagueSport: FantasySports.Baseball,
      leagueName: null,
      leagueYear: new Date().getFullYear().toString(),
      verified: false,
    });
  }

  @Action(Submit)
  async submit({ dispatch }: StateContext<SportsUiLeagueFormStateModel>) {
    await dispatch(new SportsUiLeagues.VerifyLeagues()).toPromise();
    // dispatch([new CreateLeague()]);
  }

  @Action(SportsUiLeagues.CreateLeague)
  async create({ getState, dispatch }: StateContext<SportsUiLeagueFormStateModel>) {
    const { leagueSport, leagueId, leagueYear, leagueName } = getState();
    if (leagueId && leagueSport && leagueYear) {
      await this.api.createLeague({ leagueSport, leagueId, leagueYear, leagueName: leagueSport }).toPromise();
      dispatch([new SportsUiLeagues.FetchLeagues(), new Reset()]);
    }
  }

  @Action(SportsUiLeagues.VerifyLeagues)
  async verify({ getState, patchState, dispatch }: StateContext<SportsUiLeagueFormStateModel>) {
    const { leagueId, leagueSport, leagueYear } = getState();

    if (leagueId && leagueSport && leagueYear) {
      try {
        const data = await this.api.verifyLeague({ leagueId, leagueSport, leagueYear }).toPromise();
        const leagueName = data.leagueName;

        patchState({ leagueName });
        dispatch([new SportsUiLeagues.CreateLeague()]);
      } catch (er) {
        console.error(er);
      }
    }
  }
}
