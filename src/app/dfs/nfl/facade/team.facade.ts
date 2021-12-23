import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NFLTeamSelectors } from '../selectors/team.selector';

@Injectable({
  providedIn: 'root',
})
export class NFLTeamFacade {
  @Select(NFLTeamSelectors.selectTeamsList) public selectTeamsInSlate$: Observable<string[]>;
}
