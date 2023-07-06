import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballPlayerCard } from '../actions/fantasy-baseball-player-card.actions';
import { FantasyBaseballLeagueFacade } from '../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerCardFacade } from '../facade/fantasy-baseball-player-card.facade';
import { BaseballPlayerCard } from '../models/baseball-player.model';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballPlayerCard.stateName + 'Actionhandler' })
@Injectable()
export class FantasyBaseballPlayerCardActionHandler {
  constructor(
    private baseballPlayerCardFacade: FantasyBaseballPlayerCardFacade,

    private baseballLeagueFacade: FantasyBaseballLeagueFacade,
    private mlbService: FantasyBaseballService,
    private store: Store
  ) {}

  @Action(FantasyBaseballPlayerCard.Fetch)
  async baseballLeague(_: StateContext<GenericStateClass<BaseballPlayerCard>>, { payload: { playerId } }): Promise<void> {
    const leagueId = this.baseballLeagueFacade.leagueId;
    const year = this.baseballLeagueFacade.seasonId;
    const scoringPeriod = this.baseballLeagueFacade.scoringPeriod;

    if (!exists(leagueId) || !exists(year) || !exists(scoringPeriod)) throw new Error('leagueId, year or scoringPeriod cannot be null');

    try {
      const player = await this.mlbService.baseballPlayerCard(leagueId, year, scoringPeriod, playerId).toPromise();

      this.baseballPlayerCardFacade.addOrUpdate(player);
    } catch (e) {}
  }
}