import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { EspnClientScheduleEntity } from '@app/espn/espn-client.model';
import { EspnClientTeam } from '@app/espn/mlb/interface';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

export class PatchFantasyFootballTeams {
  public static readonly type = `[fantasyFootballTeams] PatchFantasyFootballTeams`;
  constructor(public payload: { teams: EspnClientTeam[] }) {}
}

interface FantasyFootballTeamsStateModel {
  map: { [id: string]: EspnClientTeam };
  isLoading: boolean;
}

@State<FantasyFootballTeamsStateModel>({
  name: 'fantasyFootballTeams',
  defaults: {
    map: {},
    isLoading: true,
  },
})
@Injectable()
export class FantasyFootballTeamsState {
  constructor(private store: Store) {}

  @Selector()
  static map(state: FantasyFootballTeamsStateModel) {
    return state.map;
  }

  @Action(PatchFantasyFootballTeams)
  patchFantasyFootballTeams(
    { getState, patchState }: StateContext<FantasyFootballTeamsStateModel>,
    { payload: { teams } }: PatchFantasyFootballTeams
  ) {
    const state = getState();

    const map = entityMap(teams);

    patchState({ ...state, map });
  }
}
