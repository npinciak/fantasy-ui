import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NFLPlayerTableRow } from '../models/nfl-player-table-row.model';
import { AddPlayer, RemovePlayer } from '../state/nfl-dfs-lineup.actions';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsLineupFacade {
  @Dispatch() addPlayer = (player: NFLPlayerTableRow) => new AddPlayer({ player });
  @Dispatch() removePlayer = (player: NFLPlayerTableRow) => new RemovePlayer({ player });
}
