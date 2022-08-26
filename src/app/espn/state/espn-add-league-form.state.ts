import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { Action, State, StateContext } from '@ngxs/store';
import { FetchEspnLeagues, VerifyEspnLeagues } from '../actions/espn-leagues.actions';
import { FantasySports } from '../models/espn-endpoint-builder.model';
import { SportsUiClientLeague } from '../models/league.model';

export class SetLeagueSportValue {
  static readonly type = '[espnAddLeagueForm] SetLeagueSportValue';
  constructor(public payload: { leagueSport: FantasySports }) {}
}

export class SetLeagueIdValue {
  static readonly type = '[espnAddLeagueForm] SetLeagueIdValue';
  constructor(public payload: { leagueId: string }) {}
}

export class SetLeagueNameValue {
  static readonly type = '[espnAddLeagueForm] SetLeagueNameValue';
  constructor(public payload: { leagueName: string }) {}
}

export class Reset {
  static readonly type = '[espnAddLeagueForm] Reset';
}

export class Submit {
  static readonly type = '[espnAddLeagueForm] Submit';
}

export interface EspnAddLeagueFormStateModel {
  leagueSport: FantasySports | null;
  leagueId: string | null;
  leagueName: string | null;
  verified: boolean;
}

@State<EspnAddLeagueFormStateModel>({
  name: 'espnAddLeagueForm',
  defaults: {
    leagueSport: FantasySports.Baseball,
    leagueId: null,
    leagueName: null,
    verified: false,
  },
})
@Injectable()
export class EspnAddLeagueFormState {
  constructor(private api: ApiService) {}

  @Action(SetLeagueSportValue)
  setSportValue({ patchState }: StateContext<EspnAddLeagueFormStateModel>, { payload: { leagueSport } }: SetLeagueSportValue): void {
    patchState({ leagueSport });
  }

  @Action(SetLeagueIdValue)
  setLeagueIdValue({ patchState }: StateContext<EspnAddLeagueFormStateModel>, { payload: { leagueId } }: SetLeagueIdValue): void {
    patchState({ leagueId });
  }

  @Action(Reset)
  reset({ setState }: StateContext<EspnAddLeagueFormStateModel>): void {
    setState({ leagueId: null, leagueSport: null, leagueName: null, verified: false });
  }

  @Action(Submit)
  async submit({ getState, dispatch }: StateContext<EspnAddLeagueFormStateModel>) {
    const { leagueId, leagueSport, leagueName } = getState();
    const year = new Date().getFullYear().toString();

    await dispatch(new VerifyEspnLeagues({ leagueSport, year, leagueId })).toPromise();

    dispatch([new FetchEspnLeagues(), new Reset()]);
  }

  @Action(VerifyEspnLeagues)
  async verify({ getState }: StateContext<EspnAddLeagueFormStateModel>, { payload: { leagueSport, year, leagueId } }: VerifyEspnLeagues) {
    try {
      const data = await this.api
        .post<{ leagueName: string }>('http://localhost:8080/leagues/verify', {
          leagueId,
          leagueSport,
          year,
        })
        .toPromise();
      const leagueName = data.leagueName;

      await this.api
        .post<SportsUiClientLeague[]>('http://localhost:8080/leagues', {
          leagueId,
          leagueSport,
          leagueName,
        })
        .toPromise();
    } catch (er) {
      console.error('error');
    }
  }
}
// const fantasySport = req.body.fantasySport;
// const year = req.body.year;
// const leagueId = req.body.leagueId;
