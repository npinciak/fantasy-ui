import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { SlateAttrTeam } from '@app/dfs/models/team.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NflDfsTeamSlateAttrProperties {}

export type NflDfsTeamSlateAttr = SlateAttrTeam & NflDfsTeamSlateAttrProperties;

export class PatchNFLTeamSlateAttr {
  public static readonly type = `[nflDfsTeamSlate] PatchTeamSlateAttr`;
  constructor(public payload: { teams: NflDfsTeamSlateAttr[] }) {}
}

export class NflDfsTeamSlateStateModel {
  map: { [id: string]: NflDfsTeamSlateAttr };
}

const defaults = {
  map: {},
};

@State<NflDfsTeamSlateStateModel>({
  name: 'nflDfsTeamSlate',
  defaults,
})
@Injectable()
export class NflDfsTeamSlateState {
  @Selector([NflDfsTeamSlateState])
  static getPlayerSlateMap(state: NflDfsTeamSlateStateModel): { [id: string]: NflDfsTeamSlateAttr } {
    return state.map;
  }

  @Action(PatchNFLTeamSlateAttr)
  patchTeamSlateAttr({ getState, patchState }: StateContext<NflDfsTeamSlateStateModel>, { payload: { teams } }: PatchNFLTeamSlateAttr) {
    const map = entityMap(teams);
    patchState({ ...getState(), map });
  }
}
