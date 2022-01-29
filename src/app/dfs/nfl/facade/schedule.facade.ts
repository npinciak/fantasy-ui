import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

/**
 * @deprecated moved to daily-fantasy-schedule.facade
 */
@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade {
  @Select() public selectNflMatchupList$: Observable<any[]>;

  @Select() public nflMatchupsEmpty$: Observable<boolean>;
  @Select() public selectTeamsInSlate$: Observable<string[]>;
}
