import { State, Action, Selector, StateContext } from '@ngxs/store';
import { EspnAction } from './espn.actions';

export interface EspnStateModel {
  items: string[];
}

@State<EspnStateModel>({
  name: 'espn',
  defaults: {
    items: []
  }
})
export class EspnState {

  @Selector()
  public static getState(state: EspnStateModel) {
    return state;
  }

  @Action(EspnAction)
  public add(ctx: StateContext<EspnStateModel>, { payload }: EspnAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
