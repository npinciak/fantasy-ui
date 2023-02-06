import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsFilterSelector } from '../selectors/fantasy-baseball-free-agents-filter.selector';
import { FantasyBaseballLeagueSelector } from '../selectors/fantasy-baseball-league.selector';
import { MlbService } from '../services/mlb.service';

@State({ name: FantasyBaseballFreeAgents.stateName })
@Injectable()
export class FantasyBaseballFreeAgentsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballFreeAgents,
}) {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  @Action(FantasyBaseballFreeAgents.Fetch)
  async fetchFantasyBaseballFreeAgents({}: StateContext<GenericStateModel<BaseballPlayer>>, { payload: { leagueId } }): Promise<void> {
    const lineupSlotIds = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedLineupSlotIds).map(id => Number(id));
    const availabilityStatus = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedAvailabilityStatus);
    const topScoringPeriodIds = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedTopScoringPeriodIds);

    const pagination = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getPagination);

    const scoringPeriodId = this.store.selectSnapshot(FantasyBaseballLeagueSelector.getScoringPeriodId);
    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const filterRanksForScoringPeriodIds = { value: [scoringPeriodId] };
    const filterSlotIds = { value: lineupSlotIds };
    const filterStatus = { value: availabilityStatus };
    const filterStatsForTopScoringPeriodIds = {
      value: 5,
      additionalValue: ['002022', '102022', '002021', '012022', '022022', '032022', '042022', '062022', '010002022'],
    };

    const sortStatId = { sortPriority: 1, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: null, additionalValue: '' };

    const players = {};

    if (lineupSlotIds.length > 0) {
      Object.assign(players, { filterSlotIds });
    }

    const filter = {
      players: {
        ...players,
        // sortStatId,
        filterStatus,
        // filterSlotIds,
        // filterStatsForTopScoringPeriodIds,
        // filterRanksForScoringPeriodIds,
        limit: pagination.currentPageSize,
        offset: pagination.currentPageIndex,
        sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
        // sortDraftRanks: { sortPriority: 100, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: 'STANDARD' },
      },
    };
    const freeAgents = await this.mlbService.baseballFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();
    this.store.dispatch([new FantasyBaseballFreeAgents.ClearAndAdd(freeAgents)]);
  }
}
// :{"value":5,"additionalValue":["002022","102022","002021","012022","022022","032022","042022","062022","010002022"]}
