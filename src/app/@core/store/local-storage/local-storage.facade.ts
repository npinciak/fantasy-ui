import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocalStorageSelectors } from './local-storage.selectors';
import { LocalStorageKeys, RemoveLocalStorageValue, SetLocalStorageValue } from './local-storage.state';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageFacade {
  constructor(private store: Store) {}

  getLocalStorageValue(key: LocalStorageKeys): string | null {
    return this.store.selectSnapshot(LocalStorageSelectors.getLocalStorageValue)(key);
  }

  setLocalStorageValue(key: LocalStorageKeys, value: string): Observable<void> {
    return this.store.dispatch(new SetLocalStorageValue({ key, value }));
  }

  removeLocalStorageValue(key: LocalStorageKeys, value: string): Observable<void> {
    return this.store.dispatch(new RemoveLocalStorageValue({ key, value }));
  }
}
