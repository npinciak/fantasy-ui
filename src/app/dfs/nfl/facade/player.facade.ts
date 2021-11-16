import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { NFLPlayerSelectors } from '../selectors/player.selector';
import { DfsSlatePlayer } from '@app/dfs/mlb/models/dfsPlayer.interface';
import { NFLTeamSelectors } from '../selectors/team.selector';

@Injectable({
  providedIn: 'root',
})
export class NFLPlayerFacade {
  @Select(NFLPlayerSelectors.selectPositions) public selectPositions$: Observable<string[]>;
  @Select(NFLPlayerSelectors.selectStatGroups) public selectStatGroups$: Observable<string[]>;

  @Select(NFLPlayerSelectors.playerTableRows) public playerTableRows$: Observable<any[]>;

  @Select(NFLPlayerSelectors.getPlayerList) public getPlayerList$: Observable<DfsSlatePlayer[]>;
  @Select(NFLPlayerSelectors.playersEmpty) public playersEmpty$: Observable<boolean>;
}
