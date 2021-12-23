import { Injectable } from '@angular/core';
import { MatchupSelectors } from '@app/dfs/mlb/selectors/matchup.selector';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { NFLScheduleSelectors } from '../selectors/schedule.selector';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade {
  @Select(NFLScheduleSelectors.selectNflMatchupList) public selectNflMatchupList$: Observable<any[]>;

  @Select(NFLScheduleSelectors.nflMatchupsEmpty) public nflMatchupsEmpty$: Observable<boolean>;
  @Select(NFLScheduleSelectors.selectTeamsInSlate) public selectTeamsInSlate$: Observable<string[]>;
}
