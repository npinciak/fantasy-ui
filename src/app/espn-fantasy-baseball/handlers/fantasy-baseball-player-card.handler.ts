import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { ProTeamEntity } from '@sports-ui/ui-sdk';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { firstValueFrom } from 'rxjs';
import { FantasyBaseballPlayerCard } from '../actions/fantasy-baseball-player-card.actions';
import { FantasyBaseballProTeamSchedule } from '../actions/fantasy-baseball-pro-team-schedule.actions';
import { FantasyBaseballLeagueFacade } from '../facade/fantasy-baseball-league.facade';
import { FantasyBaseballPlayerCardFacade } from '../facade/fantasy-baseball-player-card.facade';
import { FantasyBaseballProTeamScheduleFacade } from '../facade/fantasy-baseball-pro-team-schedule.facade';
import { BaseballPlayerCard } from '../models/baseball-player.model';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballPlayerCard.stateName + 'ActionHandler' })
@Injectable()
export class FantasyBaseballPlayerCardActionHandler {
  constructor(
    private fantasyBaseballProTeamScheduleFacade: FantasyBaseballProTeamScheduleFacade,
    private baseballPlayerCardFacade: FantasyBaseballPlayerCardFacade,
    private baseballLeagueFacade: FantasyBaseballLeagueFacade,
    private mlbService: FantasyBaseballService
  ) {}

  @Action(FantasyBaseballPlayerCard.Fetch)
  async baseballPlayerCard(_: StateContext<GenericStateClass<BaseballPlayerCard>>, { payload: { playerId } }): Promise<void> {
    const leagueId = this.baseballLeagueFacade.leagueId;
    const year = this.baseballLeagueFacade.seasonId;
    const scoringPeriod = this.baseballLeagueFacade.scoringPeriod;

    if (!exists(leagueId) || !exists(year) || !exists(scoringPeriod)) throw new Error('leagueId, year or scoringPeriod cannot be null');

    try {
      const player = await firstValueFrom(this.mlbService.baseballPlayerCard(leagueId, year, scoringPeriod, playerId));

      this.baseballPlayerCardFacade.addOrUpdate(player);
    } catch (e) {}
  }

  @Action(FantasyBaseballProTeamSchedule.Fetch)
  async proTeamSchedules(_: StateContext<GenericStateClass<ProTeamEntity>>): Promise<void> {
    const year = this.baseballLeagueFacade.seasonId;

    if (!exists(year)) throw new Error('year cannot be null');

    try {
      const res = await firstValueFrom(this.mlbService.proteamSchedules(year));

      this.fantasyBaseballProTeamScheduleFacade.addOrUpdate(res);
    } catch (e) {}
  }
}
