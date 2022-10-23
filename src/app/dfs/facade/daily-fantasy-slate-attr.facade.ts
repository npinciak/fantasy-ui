import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchSlateAttr } from '../state/daily-fantasy-slate-attr.state';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasySlateAttrFacade {
  constructor(private store: Store) {}

  fetchSlateAttr(slate: string): Observable<void> {
    return this.store.dispatch(new FetchSlateAttr({ slate }));
  }
}
