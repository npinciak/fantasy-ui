import { Injectable } from '@angular/core';
import { Player } from '@app/dfs/models/player.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NFLPlayerSelectors } from '../selectors/player.selector';

@Injectable({
  providedIn: 'root',
})
export class NFLPlayerFacade {
  @Select(NFLPlayerSelectors.selectPositions) public selectPositions$: Observable<string[]>;
  @Select(NFLPlayerSelectors.selectStatGroups) public selectStatGroups$: Observable<string[]>;

  @Select(NFLPlayerSelectors.playerTableRows) public playerTableRows$: Observable<any[]>;

  @Select(NFLPlayerSelectors.getPlayerList) public getPlayerList$: Observable<Player[]>;
  @Select(NFLPlayerSelectors.playersEmpty) public playersEmpty$: Observable<boolean>;
}
