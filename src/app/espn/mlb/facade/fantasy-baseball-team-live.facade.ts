import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyBaseballTeamLiveSelector } from '../selectors/fantasy-baseball-team-live.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamLiveFacade extends GenericFacade(FantasyBaseballTeamLiveSelector) {
  standings$ = select(FantasyBaseballTeamLiveSelector.standings);
  liveBattingStats$ = select(FantasyBaseballTeamLiveSelector.getLiveTeamBatterStats);
}
