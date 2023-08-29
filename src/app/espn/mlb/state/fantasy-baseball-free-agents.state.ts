import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentFilterSelector } from '../selectors/fantasy-baseball-free-agent-filter.selector';
import { FantasyBaseballLeagueSelector } from '../selectors/fantasy-baseball-league.selector';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballFreeAgents.stateName })
@Injectable()
export class FantasyBaseballFreeAgentsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballFreeAgents,
}) {
  constructor(private mlbService: FantasyBaseballService, private store: Store) {
    super();
  }

  @Action(FantasyBaseballFreeAgents.Fetch)
  async fetchFantasyBaseballFreeAgents(_: StateContext<GenericStateModel<BaseballPlayer>>, { payload: { leagueId } }): Promise<void> {
    const lineupSlotIds = this.store.selectSnapshot(FantasyBaseballFreeAgentFilterSelector.getSelectedLineupSlotIds).map(id => Number(id));
    const availabilityStatus = this.store.selectSnapshot(FantasyBaseballFreeAgentFilterSelector.getSelectedAvailabilityStatus);
    const topScoringPeriodIds = this.store.selectSnapshot(FantasyBaseballFreeAgentFilterSelector.getSelectedTopScoringPeriodIds);

    const pagination = this.store.selectSnapshot(FantasyBaseballFreeAgentFilterSelector.slices.metaData);

    const scoringPeriodId = this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.scoringPeriodId);
    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const filterInjured = { value: this.store.selectSnapshot(FantasyBaseballFreeAgentFilterSelector.slices.filterInjured) };

    const filterRanksForScoringPeriodIds = { value: [scoringPeriodId] };
    const filterSlotIds = { value: lineupSlotIds };
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

    this.store.dispatch([new FantasyBaseballFreeAgents.Clear()]);

    const freeAgents = await this.mlbService.baseballFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();
    this.store.dispatch([new FantasyBaseballFreeAgents.AddOrUpdate(freeAgents)]);
  }
}
// :{"value":5,"additionalValue":["002022","102022","002021","012022","022022","032022","042022","062022","010002022"]}
