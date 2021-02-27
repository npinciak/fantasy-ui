import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CoreAction } from './core.actions';

export interface CoreStateModel {
  items: string[];
}

@State<CoreStateModel>({
  name: 'core',
  defaults: {
    items: []
  }
})

@Injectable()

export class CoreState {

  @Selector()
  public static getState(state: CoreStateModel) {
    return state;
  }

  @Action(CoreAction)
  public add(ctx: StateContext<CoreStateModel>, { payload }: CoreAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
