import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';
import { FantasyFootballFreeAgentsFacade } from '../facade/fantasy-football-free-agents.facade';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballFreeAgentFilterSelector } from '../selectors/fantasy-football-free-agent-filter.selector';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballFreeAgent.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballFreeAgentActionHandler {
  constructor(
    private freeAgentsFacade: FantasyFootballFreeAgentsFacade,
    private fantasyFootballService: FantasyFootballService,
    private store: Store
  ) {}

  @Action(FantasyFootballFreeAgent.Fetch, { cancelUncompleted: true })
  async fetchFantasyFootballFreeAgents(_: StateContext<GenericStateModel<FootballPlayer>>, { payload: { leagueId, season } }) {
    const lineupSlotIds = this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.getSelectedLineupSlotIds).map(id => Number(id));
    const lineupSlotId = this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.getSelectedLineupSlotId);
    const availabilityStatus = this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.getSelectedAvailabilityStatus);
    const topScoringPeriodIds = this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.getSelectedTopScoringPeriodIds);

    const pagination = this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.slices.metaData);

    const scoringPeriodId = this.store.selectSnapshot(FantasyFootballLeagueSelector.getScoringPeriodId);
    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const filterInjured = { value: this.store.selectSnapshot(FantasyFootballFreeAgentFilterSelector.slices.filterInjured) };

    const filterRanksForScoringPeriodIds = { value: [scoringPeriodId] };
    const filterSlotIds = { value: [lineupSlotId] };
    const filterStatus = { value: availabilityStatus };
    const filterStatsForTopScoringPeriodIds = {
      value: 5,
      additionalValue: topScoringPeriodIds,
    };

    const sortStatId = { sortPriority: 1, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: null, additionalValue: '' };

    // const players = {};

    // if (lineupSlotIds.length > 0) {
    //   players['filterSlotIds'] = filterSlotIds;
    // }

    const filter = {
      players: {
        // ...players,
        filterInjured,
        // sortStatId,
        filterStatus,
        filterSlotIds,
        // filterStatsForTopScoringPeriodIds,
        // filterRanksForScoringPeriodIds,
        limit: pagination.currentPageSize,
        offset: pagination.currentPageIndex,
        sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
        // sortDraftRanks: { sortPriority: 100, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: 'STANDARD' },
      },
    };

    this.freeAgentsFacade.clear();
    const freeAgents = await this.fantasyFootballService.fetchFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();
    this.freeAgentsFacade.addOrUpdate(freeAgents);
  }
}
