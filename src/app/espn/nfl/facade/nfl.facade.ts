import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class NFLFacade {
  constructor(private store: Store) {}

  public getLeague(leagueId: string) {
    return;
  }
}
