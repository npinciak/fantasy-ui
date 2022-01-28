import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { SlateAttrTeam } from '@app/dfs/models/team.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export interface NbaDfsTeamSlateAttrProperties {}

export type NbaDfsTeamSlateAttr = SlateAttrTeam & NbaDfsTeamSlateAttrProperties;

export class PatchNbaTeamSlateAttr {
  public static readonly type = `[NbaDfsTeamSlate] PatchNbaTeamSlateAttr`;
  constructor(public payload: { teams: NbaDfsTeamSlateAttr[] }) {}
}

export class NbaDfsTeamSlateStateModel {
  map: { [id: string]: NbaDfsTeamSlateAttr };
}

const defaults = {
  map: {},
};

@State<NbaDfsTeamSlateStateModel>({
  name: 'nbaDfsTeamSlate',
  defaults,
})
@Injectable()
export class NbaDfsTeamSlateState {
  @Selector([NbaDfsTeamSlateState])
  static getPlayerSlateMap(state: NbaDfsTeamSlateStateModel): { [id: string]: NbaDfsTeamSlateAttr } {
    return state.map;
  }

  @Action(PatchNbaTeamSlateAttr)
  patchTeamSlateAttr({ getState, patchState }: StateContext<NbaDfsTeamSlateStateModel>, { payload: { teams } }: PatchNbaTeamSlateAttr) {
    const map = entityMap(teams);
    patchState({ ...getState(), map });
  }
}
