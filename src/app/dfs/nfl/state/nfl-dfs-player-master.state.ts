import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export class NflDfsPlayerMasterStateModel {}

const defaults = {};

@State<NflDfsPlayerMasterStateModel>({
  name: 'nflDfsPlayerMaster',
  defaults,
})
@Injectable()
export class NflDfsPlayerMasterState {
  // @Action(PatchPlayerSlate)
  // async patchPlayerSlate(ctx: StateContext<NflDfsPlayerSlateState>, { dfsPlayers }: PatchPlayerSlate): Promise<void> {}
}
