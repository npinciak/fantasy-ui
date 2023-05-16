import { ActionCompletion } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SelectedStateModel } from './generic-selected.state.model';

export interface IdsPayload {
  ids: string[];
}

export interface IdsPayloadActionClass {
  type: string;
  new (payload: IdsPayload): { payload: IdsPayload };
}

export interface EmptyPayloadActionClass {
  type: string;
  new (): any;
}

export interface ISelectedStateClass {
  new (...args: any[]): any;
  selectAction: IdsPayloadActionClass;
  deselectAction: IdsPayloadActionClass;
  toggleAction: IdsPayloadActionClass;
  toggleOffAction: IdsPayloadActionClass;
  clearAction: EmptyPayloadActionClass;
}

export interface ISelectedFacade {
  selectedIds$: Observable<string[]>;
  selectedIdsSet$: Observable<Set<string>>;
  selectedLength$: Observable<number>;
  toggledIds$: Observable<string[]>;
  toggledIdsSet$: Observable<Set<string>>;
  isSelected$: Observable<(lineItemId: string) => boolean>;
  isToggled$: Observable<(lineItemId: string) => boolean>;
  select(ids: string[]): Observable<void>;
  deselect(ids: string[]): Observable<void>;
  toggle(ids: string[]): Observable<void>;
  toggleOff(ids: string[]): Observable<void>;
  clear(): Observable<void>;
  isSelected(id: string): boolean;
  isToggled(id: string): boolean;
  getSelectedIds(): string[];
  getSelectedIdsSet(): Set<string>;
  getToggledIds(): string[];
  getToggledIdsSet(): Set<string>;
  onSelectedIdsChanged(): Observable<ActionCompletion>;
  onToggle(): Observable<ActionCompletion>;
}

export interface ISelectedSelectorClass {
  new (...args: any[]): any;
  stateClass: ISelectedStateClass;
  getSelectedIds(state: SelectedStateModel): string[];
  getSelectedIdsSet(ids: string[]): Set<string>;
  getSelectedIdsLength(ids: string[]): number;
  getToggledIds(state: SelectedStateModel): string[];
  getToggledIdsSet(ids: string[]): Set<string>;
  isIdSelected(state: SelectedStateModel): (id: string) => boolean;
  isIdToggled(state: SelectedStateModel): (id: string) => boolean;
}
