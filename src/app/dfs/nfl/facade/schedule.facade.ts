import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NFLScheduleSelectors } from '../selectors/schedule.selector';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade {
  @Select(NFLScheduleSelectors.selectNflMatchupList) public selectNflMatchupList$: Observable<any[]>;

  @Select(NFLScheduleSelectors.nflMatchupsEmpty) public nflMatchupsEmpty$: Observable<boolean>;
  @Select(NFLScheduleSelectors.selectTeamsInSlate) public selectTeamsInSlate$: Observable<string[]>;
}
