import { Injectable } from '@angular/core';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { Action, State } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
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
  async fetchSlateDetails(): Promise<void> {
    const sport = this.dfsSelectedSlateConfigurationFacade.sport;
    const site = this.dfsSelectedSlateConfigurationFacade.site;
    const slateId = this.dfsSelectedSlateConfigurationFacade.slateId;

    if (!sport || !site || !slateId) return;

    const { teams, players } = await firstValueFrom(this.nflSlateService.getNflGameAttributesBySlateId({ sport, site, slateId }));

    await firstValueFrom(this.dfsNflSlatePlayerDetailsFacade.clear());
    await firstValueFrom(this.dfsNflSlateTeamDetailsFacade.clear());

    await Promise.all([
      firstValueFrom(this.dfsNflSlateTeamDetailsFacade.addOrUpdate(teams)),
      firstValueFrom(this.dfsNflSlatePlayerDetailsFacade.addOrUpdate(players)),
    ]);
  }
}
