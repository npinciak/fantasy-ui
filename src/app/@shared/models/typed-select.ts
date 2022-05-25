import { ɵɵdirectiveInject } from '@angular/core';
import { StateToken, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateSelector, TypedSelector } from './typed-selector';

export function select<TModel>(selector: TypedSelector<TModel>): Observable<TModel>;
export function select<TModel>(selector: StateToken<TModel>): Observable<TModel>;
export function select<TModel>(selector: StateSelector): Observable<TModel>;
export function select<TModel>(selector: any): Observable<TModel> {
  const store = ɵɵdirectiveInject(Store);
  return store.select<TModel>(selector);
}
