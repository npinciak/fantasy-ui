import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { EspnFreeAgentAvailabilityStatus } from '@espnClient/espn-client.model';
import { State, StateContext, Store } from '@ngxs/store';
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

  async fetchFantasyFootballFreeAgents(
    { setState }: StateContext<GenericStateModel<FootballPlayer>>,
    { payload: { leagueId } }: FetchFantasyFootballFreeAgents
  ): Promise<void> {
    setState({ map: {} });

    // const leagueId = this.store.selectSnapshot(RouterSelector) ?? '';
    const scoringPeriodId = Number(this.store.selectSnapshot(FantasyFootballLeagueSelectors.getCurrentScoringPeriodId)) ?? 0;

    const lineupSlotId = this.store.selectSnapshot(FantasyFootballFreeAgentsFilterState.getSelectedLineupSlotId);

    const filterSlotIds = { value: [lineupSlotId] };
    const filterStatus = { value: [EspnFreeAgentAvailabilityStatus.FreeAgent, EspnFreeAgentAvailabilityStatus.Waivers] }; // { value: availabilityStatus };
    //   const filterSlotIds = { value: lineupSlotIds };
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
