import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShowFastcastScoreboard } from '../actions/shell.actions';
import { ShellState } from '../state/shell.state';

@Injectable({
  providedIn: 'root',
})
export class ShellFacade {
  @Select(ShellState.showFastcastScoreboard) showFastcastScoreboard$: Observable<boolean>;

  constructor(private store: Store) {}

  showFastcastScoreboard(showFastcastScoreboard: boolean): Observable<any> {
    return this.store.dispatch(new ShowFastcastScoreboard({ showFastcastScoreboard }));
  }
}
