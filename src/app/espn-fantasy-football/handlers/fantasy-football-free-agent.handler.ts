import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { firstValueFrom } from 'rxjs';
import { FantasyFootballFreeAgentActions } from '../actions/fantasy-football-free-agent.actions';
import { FantasyFootballFreeAgentsFilterFacade } from '../facade/fantasy-football-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFacade } from '../facade/fantasy-football-free-agents.facade';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballFreeAgentActions.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballFreeAgentActionHandler {
  constructor(
    private fantasyFootballFreeAgentsFilterFacade: FantasyFootballFreeAgentsFilterFacade,
    private freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    private fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    private fantasyFootballService: FantasyFootballService
  ) {}

  @Action(FantasyFootballFreeAgentActions.Fetch)
  async fetchFantasyFootballFreeAgents(_: StateContext<GenericStateModel<FootballPlayer>>, { payload: { leagueId } }) {
    const selectedLineupSlotIdsList = this.fantasyFootballFreeAgentsFilterFacade.selectedLineupSlotIdsList;
    const selectedAvailabilityStatusList = this.fantasyFootballFreeAgentsFilterFacade.selectedAvailabilityStatusList;
    const selectedScoringPeriodIdsList = this.fantasyFootballFreeAgentsFilterFacade.selectedScoringPeriodIdsList;
    const pageLimit = this.fantasyFootballFreeAgentsFilterFacade.metaData.currentPageSize;
    const pageOffset = this.fantasyFootballFreeAgentsFilterFacade.metaData.currentPageIndex;
    const scoringPeriodId = this.fantasyFootballLeagueFacade.scoringPeriodId;
    const injured = this.fantasyFootballFreeAgentsFilterFacade.filterInjured;

    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const filterInjured = { value: injured };
    const filterSlotIds = { value: selectedLineupSlotIdsList.map(id => Number(id)) };
    const filterStatus = { value: selectedAvailabilityStatusList };
    const filterStatsForTopScoringPeriodIds = {
      value: 2,
      additionalValue: selectedScoringPeriodIdsList,
    };
    const filter = {
      players: {
        filterInjured,
        filterStatus,
        filterSlotIds,
        filterStatsForTopScoringPeriodIds,
        limit: pageLimit,
        offset: pageOffset,
        sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
      },
    };
    this.freeAgentsFacade.clear();
    const freeAgents = await firstValueFrom(this.fantasyFootballService.fetchFreeAgents({ leagueId, scoringPeriodId, filter }));
    this.freeAgentsFacade.addOrUpdate(freeAgents);
  }
}
