import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { EspnFreeAgentAvailabilityStatus } from '@espnClient/espn-client.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  ClearAndAddFantasyFootballFreeAgents,
  FetchFantasyFootballFreeAgents,
  SetFantasyFootballFreeAgents,
} from '../actions/fantasy-football-free-agents.actions';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';
import { FantasyFootballFreeAgentsFilterState } from './fantasy-football-free-agents-filter.state';

@State({ name: 'fantasyFootballFreeAgents' })
@Injectable()
export class FantasyFootballFreeAgentsState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyFootballFreeAgents,
  clearAndAdd: ClearAndAddFantasyFootballFreeAgents,
}) {
  constructor(private service: FantasyFootballService, private store: Store) {
    super();
  }

  @Action(FetchFantasyFootballFreeAgents)
  async fetchFantasyFootballFreeAgents({ setState }: StateContext<GenericStateModel<FootballPlayer>>): Promise<void> {
    setState({ map: {} });

    const leagueId = this.store.selectSnapshot(FantasyFootballLeagueSelectors.getLeagueId) ?? '';
    const scoringPeriodId = Number(this.store.selectSnapshot(FantasyFootballLeagueSelectors.getCurrentScoringPeriodId)) ?? 0;

    const lineupSlotIds = this.store.selectSnapshot(FantasyFootballFreeAgentsFilterState.getSelectedLineupdSlotIdsList);
    // const availabilityStatus = this.store.selectSnapshot(FantasyFootballFreeAgentsFilterSelector.getSelectedAvailabilityStatus);
    //   const topScoringPeriodIds = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getSelectedTopScoringPeriodIds);

    //   const pagination = this.store.selectSnapshot(FantasyBaseballFreeAgentsFilterSelector.getPagination);

    //   const scoringPeriodId = Number(this.store.selectSnapshot(FantasyBaseballLeagueState.getCurrentScoringPeriodId)) ?? 0;

    //   const filterRanksForScoringPeriodIds = { value: [scoringPeriodId] };
    const filterSlotIds = { value: lineupSlotIds };
    const filterStatus = { value: [EspnFreeAgentAvailabilityStatus.FreeAgent] }; // { value: availabilityStatus };
    //   const filterStatsForTopScoringPeriodIds = {
    //     value: 5,
    //     additionalValue: ['002022', '102022', '002021', '012022', '022022', '032022', '042022', '062022', '010002022'],
    //   };

    //   const sortStatId = { sortPriority: 1, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: null, additionalValue: '' };

    //   const players = {};

    //   if (lineupSlotIds.length > 0) {
    //     Object.assign(players, { filterSlotIds });
    //   }

    const filter = {
      players: {
        //   ...players,
        // sortStatId,
        filterStatus,
        filterSlotIds,
        // filterStatsForTopScoringPeriodIds,
        // filterRanksForScoringPeriodIds,
        limit: 100, //pagination.currentPageSize,
        offset: 0, //pagination.currentPageIndex,
        sortPercOwned: { sortPriority: 2, sortAsc: false, value: null },
        // sortDraftRanks: { sortPriority: 100, sortAsc: pagination.sortDirection === 'asc' ? true : false, value: 'STANDARD' },
      },
    };
    const freeAgents = await this.service.footballFreeAgents({ leagueId, scoringPeriodId, filter }).toPromise();

    this.store.dispatch([new SetFantasyFootballFreeAgents(freeAgents)]);
  }
}
