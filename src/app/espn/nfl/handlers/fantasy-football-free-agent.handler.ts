import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { PLAYER_AVAILABILITY_STATUS } from 'sports-ui-sdk';
import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';
import { FantasyFootballFreeAgentFilterState } from '../state/fantasy-football-free-agent-filter.state';

@State({ name: FantasyFootballFreeAgent.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballFreeAgentActionHandler {
  constructor(private service: FantasyFootballService, private store: Store) {}

  @Action(FantasyFootballFreeAgent.Fetch, { cancelUncompleted: true })
  fetchFantasyFootballFreeAgents(_: StateContext<GenericStateModel<FootballPlayer>>, { payload: { leagueId, season } }) {
    // const leagueId = this.store.selectSnapshot(RouterSelector) ?? '';
    const scoringPeriodId = this.store.selectSnapshot(FantasyFootballLeagueSelector.getScoringPeriodId);

    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const lineupSlotId = this.store.selectSnapshot(FantasyFootballFreeAgentFilterState.getSelectedLineupSlotId);

    const filterSlotIds = { value: [lineupSlotId] };

    const filterStatus = {
      value: [PLAYER_AVAILABILITY_STATUS.FreeAgent, PLAYER_AVAILABILITY_STATUS.Waivers],
    }; // { value: availabilityStatus };
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
    // this.service
    //   .fetchFreeAgents({ leagueId, scoringPeriodId, filter })
    //   .pipe(map(freeAgents => this.store.dispatch([new FantasyFootballFreeAgent.AddOrUpdate(freeAgents)])));
  }
}
