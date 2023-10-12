import { Injectable } from '@angular/core';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { DfsSlateAttributesStateModel } from '@app/dfs/models/dfs-slate-attr.model';
import { Action, State, StateContext } from '@ngxs/store';
import { DfsNflSlateDetailsActions } from '../actions/dfs-nfl-slate-details.actions';
import { DfsNflSlatePlayerDetailsFacade } from '../facade/dfs-nfl-slate-player-details.facade';
import { DfsNflSlateTeamDetailsFacade } from '../facade/dfs-nfl-slate-team-details.facade';
import { NflSlateService } from '../service/nfl-slate.service';

@State({ name: DfsNflSlateDetailsActions.stateName + 'Actionhandler' })
@Injectable()
export class DfsNflSlateDetailsHandlerState {
  constructor(
    private nflSlateService: NflSlateService,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    private dfsNflSlatePlayerDetailsFacade: DfsNflSlatePlayerDetailsFacade,
    private dfsNflSlateTeamDetailsFacade: DfsNflSlateTeamDetailsFacade
  ) {}

  @Action(DfsNflSlateDetailsActions.Fetch)
  async fetchSlateDetails(
    _: StateContext<DfsSlateAttributesStateModel>,
    { payload: { slateId } }: { payload: { slateId } }
  ): Promise<void> {
    const sport = this.dfsSelectedSlateConfigurationFacade.sport;
    const site = this.dfsSelectedSlateConfigurationFacade.site;

    if (!sport || !site) return;

    const { teams, players } = await this.nflSlateService.getNflGameAttributesBySlateId({ sport, site, slateId }).toPromise();

    await this.dfsNflSlatePlayerDetailsFacade.clear().toPromise();
    await this.dfsNflSlateTeamDetailsFacade.clear().toPromise();

    await Promise.all([
      this.dfsNflSlateTeamDetailsFacade.addOrUpdate(teams).toPromise(),
      this.dfsNflSlatePlayerDetailsFacade.addOrUpdate(players).toPromise(),
    ]);
  }
}
