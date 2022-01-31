import { Injectable } from '@angular/core';
import { NFLPlayerTableRow } from '../models/nfl-player-table-row.model';
import { AddPlayer, RemovePlayer } from '../state/nfl-dfs-lineup.actions';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsLineupFacade {
  addPlayer = (player: NFLPlayerTableRow) => new AddPlayer({ player });
  removePlayer = (player: NFLPlayerTableRow) => new RemovePlayer({ player });
}
