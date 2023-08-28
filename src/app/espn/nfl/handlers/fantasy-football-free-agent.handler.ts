import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';

import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';
import { FantasyFootballFreeAgentsFilterFacade } from '../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballFreeAgent.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballFreeAgentActionHandler {
  constructor(
    private fantasyFootballFreeAgentsFilterFacade: FantasyFootballFreeAgentsFilterFacade,
    private freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    private fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    private fantasyFootballService: FantasyFootballService
  ) {}

  @Action(FantasyFootballFreeAgent.Fetch)
  async fetchFantasyFootballFreeAgents(_: StateContext<GenericStateModel<FootballPlayer>>, { payload: { leagueId } }) {
    const lineupSlotId = this.fantasyFootballFreeAgentsFilterFacade.selectedLineupSlotId;
    const availabilityStatus = this.fantasyFootballFreeAgentsFilterFacade.selectedAvailabilityStatus;
    const pagination = this.fantasyFootballFreeAgentsFilterFacade.metaData;
    const scoringPeriodId = this.fantasyFootballLeagueFacade.currentScoringPeriodId;
    const injured = this.fantasyFootballFreeAgentsFilterFacade.injured;

    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const filterInjured = { value: injured };
    const filterSlotIds = { value: [lineupSlotId] };
    const filterStatus = { value: availabilityStatus };

    const filter = {
      players: {
        filterInjured,
        filterStatus,
        filterSlotIds,
        limit: pagination.currentPageSize,
        offset: pagination.currentPageIndex,
        sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
      },
    };

    this.freeAgentsFacade.clear();
    const freeAgents = await this.fantasyFootballService.fetchFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();
    this.freeAgentsFacade.addOrUpdate(freeAgents);
  }
}
