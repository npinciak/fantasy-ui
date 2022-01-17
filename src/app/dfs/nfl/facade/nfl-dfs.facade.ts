import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NflDfsState } from '../state/nfl-dfs.state';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsFacade {
  @Select(NflDfsState.loading) public loading$: Observable<boolean>;

  @Select(NflDfsState.masterPlayers) public masterPlayersLength$: Observable<number>;
}
