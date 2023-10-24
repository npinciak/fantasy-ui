import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  IBaseFreeAgentsFilterActionsClass,
  IBaseFreeAgentsFilterMetaData,
  IBaseFreeAgentsFilterStateModel,
} from './base-free-agents-filter.model';
import { IBaseFreeAgentFilterSelectorsClass } from './base-free-agents-filter.selectors';

export function BaseFreeAgentsFilterFacade<StateModel extends IBaseFreeAgentsFilterStateModel>(
  actions: IBaseFreeAgentsFilterActionsClass,
  selector: IBaseFreeAgentFilterSelectorsClass<StateModel>
): { new (...args: any[]): IBaseFreeAgentsFilterFacade } {
  @Injectable()
  class BaseFreeAgentsFilterFacadeClass {
    constructor(private store: Store) {}

    filterInjured$: Observable<boolean> = select(selector.slices.filterInjured);
    selectedLineupSlotIds$: Observable<Record<number, boolean>> = this.store.select(selector.slices.selectedLineupSlotIds);
    selectedScoringPeriodIds$: Observable<Record<string, boolean>> = this.store.select(selector.slices.selectedScoringPeriodIds);
    metaData$: Observable<IBaseFreeAgentsFilterMetaData> = this.store.select(selector.slices.metaData);
    selectedAvailabilityStatus$: Observable<Record<string, boolean>> = this.store.select(selector.slices.selectedAvailabilityStatus);

    get filterInjured(): boolean {
      return this.store.selectSnapshot(selector.slices.filterInjured);
    }

    get selectedLineupSlotIds(): Record<number, boolean> {
      return this.store.selectSnapshot(selector.slices.selectedLineupSlotIds);
    }

    get selectedScoringPeriodIds(): Record<number, boolean> {
      return this.store.selectSnapshot(selector.slices.selectedScoringPeriodIds);
    }

    get metaData(): IBaseFreeAgentsFilterMetaData {
      return this.store.selectSnapshot(selector.slices.metaData);
    }

    get selectedAvailabilityStatus(): Record<string, boolean> {
      return this.store.selectSnapshot(selector.slices.selectedAvailabilityStatus);
    }

    get selectedLineupSlotIdsList(): string[] {
      return this.store.selectSnapshot(selector.getSelectedLineupSlotIdsList);
    }

    get selectedTeamIdsList(): string[] {
      return this.store.selectSnapshot(selector.getSelectedTeamIdsList);
    }

    get selectedScoringPeriodIdsList(): string[] {
      return this.store.selectSnapshot(selector.getSelectedScoringPeriodIdsList);
    }

    get selectedAvailabilityStatusList(): string[] {
      return this.store.selectSnapshot(selector.getSelectedAvailabilityStatusList);
    }

    toggleAvailabilityStatus(ids: string[]): Observable<void> {
      return this.store.dispatch(new actions.ToggleAvailabilityStatus({ ids }));
    }

    toggleLineupSlotIds(ids: string[]): Observable<void> {
      return this.store.dispatch(new actions.ToggleLineupSlotIds({ ids }));
    }

    toggleTeamIds(ids: string[]): Observable<void> {
      return this.store.dispatch(new actions.ToggleTeamIds({ ids }));
    }

    toggleScoringPeriodIds(ids: string[]): Observable<void> {
      return this.store.dispatch(new actions.ToggleScoringPeriodIds({ ids }));
    }
  }
  return BaseFreeAgentsFilterFacadeClass;
}

export interface IBaseFreeAgentsFilterFacade {
  filterInjured$: Observable<boolean>;
  selectedLineupSlotIds$: Observable<Record<number, boolean>>;
  selectedScoringPeriodIds$: Observable<{ [id: string]: boolean }>;
  metaData$: Observable<IBaseFreeAgentsFilterMetaData>;
  selectedAvailabilityStatus$: Observable<{ [id: string]: boolean }>;
  filterInjured: boolean;
  selectedLineupSlotIds: Record<number, boolean>;
  selectedScoringPeriodIds: Record<string, boolean>;
  metaData: IBaseFreeAgentsFilterMetaData;
  selectedAvailabilityStatus: Record<string, boolean>;
  selectedLineupSlotIdsList: string[];
  selectedTeamIdsList: string[];
  selectedScoringPeriodIdsList: string[];
  selectedAvailabilityStatusList: string[];
  toggleAvailabilityStatus(ids: string[]): Observable<void>;
  toggleLineupSlotIds(ids: string[]): Observable<void>;
  toggleTeamIds(ids: string[]): Observable<void>;
  toggleScoringPeriodIds(ids: string[]): Observable<void>;
}
