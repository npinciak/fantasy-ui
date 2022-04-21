import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TeamsPayload, TeamsPayloadActionClass } from '../actions/espn-fantasy-teams-generic.actions';

export interface EspnFantasyBaseClass<T> {
  new (...args: any[]): any;
  selectEntityById(state: EspnFantasyBaseStateModel<T>): (id: string) => T;
  selectEntityList(map: Record<string, T>): T[];
  selectEntityIdList(map: Record<string, T>): string[];
  selectEntityIdSet(ids: string[]): Set<string>;
}

export interface EspnFantasyBaseStateModel<T> {
  map: Record<string, T>;
}

export function EspnFantasyBaseState<T>({
  name,
  setEntities: setEntities,
}: {
  name: string;
  setEntities: TeamsPayloadActionClass;
}): EspnFantasyBaseClass<T> {
  @State<EspnFantasyBaseStateModel<T>>({
    name,
    defaults: {
      map: {},
    },
  })
  @Injectable()
  class EspnFantasyStateBase {
    public static setTeams = setEntities;

    @Selector([EspnFantasyStateBase])
    static selectMap(state: EspnFantasyBaseStateModel<T>): Record<string, T> {
      return state.map;
    }

    @Selector([EspnFantasyStateBase])
    static selectEntityById(state: EspnFantasyBaseStateModel<T>): (id: string) => T {
      return (id: string) => state.map[id];
    }

    @Selector([EspnFantasyStateBase.selectMap])
    static selectEntityList(map: Record<string, T>): T[] {
      return Object.values(map);
    }

    @Selector([EspnFantasyStateBase.selectMap])
    static selectEntityIdList(map: Record<string, T>): string[] {
      return Object.keys(map);
    }

    @Selector([EspnFantasyStateBase.selectEntityIdList])
    static selectEntityIdSet(ids: string[]): Set<string> {
      return new Set(ids);
    }

    @Action(setEntities)
    patchTeams({ patchState }: StateContext<EspnFantasyBaseStateModel<T>>, { payload: { teams } }: { payload: TeamsPayload }): void {
      const map = entityMap(teams, team => team.id);
      patchState({ map });
    }
  }
  return EspnFantasyStateBase;
}
