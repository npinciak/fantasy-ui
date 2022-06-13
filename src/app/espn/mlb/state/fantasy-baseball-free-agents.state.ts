import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { setMap } from '@app/@shared/operators/entities.operators';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  ClearAndAddFantasyBaseballFreeAgents,
  FetchFantasyBaseballFreeAgents,
  SetFantasyBaseballFreeAgents,
} from '../actions/fantasy-baseball-free-agents.actions';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsFilterSelector } from '../selectors/fantasy-baseball-free-agents-filter.selector';
import { MlbService, PaginatedFilter } from '../services/mlb.service';

@State({ name: 'fantasyBaseballFreeAgents' })
@Injectable()
export class FantasyBaseballFreeAgentsState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyBaseballFreeAgents,
}) {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  private static getId = (t: BaseballPlayer) => t.id as unknown as string;

  @Action(ClearAndAddFantasyBaseballFreeAgents)
  clearAndAdd({ setState }: StateContext<GenericStateModel<BaseballPlayer>>, { payload }: { payload: BaseballPlayer[] }): void {
    setState(setMap(payload, FantasyBaseballFreeAgentsState.getId));
  }

  @Action(FetchFantasyBaseballFreeAgents)
  async fetchFantasyBaseballFreeAgents(
    { dispatch }: StateContext<GenericStateModel<BaseballPlayer>>,
    { payload: { leagueId, scoringPeriodId } }: FetchFantasyBaseballFreeAgents
  ): Promise<void> {
    const lineupSlotIds = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedLineupSlotIds).map(id => Number(id));
    const availabilityStatus = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedAvailabilityStatus);
    const filterScoringPeriodIds = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedScoringPeriodIds);
    const filterRanksForScoringPeriodIds = { value: [] };
    const filterSlotIds = { value: lineupSlotIds };
    const filterStatus = { value: availabilityStatus };
    const filterStatsForTopScoringPeriodIds = { value: filterScoringPeriodIds };

    const filter: PaginatedFilter = {
      players: {
        filterStatus,
        filterSlotIds,
        // filterStatsForTopScoringPeriodIds,
        // filterRanksForScoringPeriodIds,
        limit: 50,
        // sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
        sortDraftRanks: { sortPriority: 100, sortAsc: true, value: 'STANDARD' },
      },
    };
    const freeAgents = await this.mlbService.baseballFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();
    dispatch([new ClearAndAddFantasyBaseballFreeAgents(freeAgents)]);
  }
}
