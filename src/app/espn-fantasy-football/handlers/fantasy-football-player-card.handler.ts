import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk';
import { firstValueFrom } from 'rxjs';
import { FantasyFootballPlayerCard } from '../actions/fantasy-football-player-card.actions';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';
import { FantasyFootballPlayerCardFacade } from '../facade/fantasy-football-player-card.facade';
import { FootballPlayerCard } from '../models/football-player.model';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballPlayerCard.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballPlayerCardActionHandler {
  constructor(
    private fantasyFootballService: FantasyFootballService,
    private footballLeagueFacade: FantasyFootballLeagueFacade,
    private footballPlayerCardFacade: FantasyFootballPlayerCardFacade
  ) {}

  @Action(FantasyFootballPlayerCard.Fetch)
  async fetchFootballPlayerCard(_: StateContext<GenericStateClass<FootballPlayerCard>>, { payload: { playerId } }): Promise<void> {
    const leagueId = this.footballLeagueFacade.leagueId;
    const year = this.footballLeagueFacade.seasonId;
    const scoringPeriod = this.footballLeagueFacade.scoringPeriodId;

    if (!exists(leagueId) || !exists(year) || !exists(scoringPeriod)) throw new Error('leagueId, year or scoringPeriod cannot be null');

    try {
      const player = await firstValueFrom(this.fantasyFootballService.fetchFootballPlayerCard(leagueId, year, scoringPeriod, playerId));
      this.footballPlayerCardFacade.addOrUpdate(player);
    } catch (e) {}
  }
}
