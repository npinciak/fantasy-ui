import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballFreeAgents } from '../actions/fantasy-football-free-agents.actions';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballService } from '../services/fantasy-football.service';
import { FantasyFootballFreeAgentsFilterState } from './fantasy-football-free-agents-filter.state';

import { map } from 'rxjs/operators';
import { PLAYER_AVAILABILITY_STATUS } from 'sports-ui-sdk/lib/espn/models/espn-client.const';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';

@State({ name: FantasyFootballFreeAgents.name })
@Injectable()
export class FantasyFootballFreeAgentsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballFreeAgents,
}) {
  constructor(private service: FantasyFootballService, private store: Store) {
    super();
  }

  @Action(FantasyFootballFreeAgents.Fetch, { cancelUncompleted: true })
  fetchFantasyFootballFreeAgents({}: StateContext<GenericStateModel<FootballPlayer>>, { payload: { leagueId, season } }) {
    // const leagueId = this.store.selectSnapshot(RouterSelector) ?? '';
    const scoringPeriodId = this.store.selectSnapshot(FantasyFootballLeagueSelector.getScoringPeriodId);

    if (!scoringPeriodId) throw new Error('scoringPeriodId cannot be missing');

    const lineupSlotId = this.store.selectSnapshot(FantasyFootballFreeAgentsFilterState.getSelectedLineupSlotId);

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
    this.service
      .fetchFreeAgents({ leagueId, scoringPeriodId, filter })
      .pipe(map(freeAgents => this.store.dispatch([new FantasyFootballFreeAgents.ClearAndAdd(freeAgents)])));
  }
}
