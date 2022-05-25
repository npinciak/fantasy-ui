import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext } from '@ngxs/store';
import { FetchFantasyBaseballFreeAgents, PatchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { BaseballPlayer } from '../models/baseball-player.model';
import { MlbService } from '../services/mlb.service';

@State({ name: 'fantasyBaseballFreeAgents' })
@Injectable()
export class FantasyBaseballFreeAgentsState extends GenericState({ idProperty: 'id', patchAction: PatchFantasyBaseballFreeAgents }) {
  constructor(private mlbService: MlbService) {
    super();
  }

  @Action(FetchFantasyBaseballFreeAgents)
  async fetchFantasyBaseballFreeAgents(
    { dispatch }: StateContext<GenericStateModel<BaseballPlayer>>,
    { payload: { leagueId, scoringPeriodId } }: FetchFantasyBaseballFreeAgents
  ): Promise<void> {
    const freeAgents = await this.mlbService.baseballFreeAgents({ leagueId, scoringPeriodId }).toPromise();
    dispatch([new PatchFantasyBaseballFreeAgents(freeAgents)]);
  }
}
