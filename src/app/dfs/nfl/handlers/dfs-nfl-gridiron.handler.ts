import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { DfsSelectedSlateConfigurationFacade } from '@app/dfs/facade/dfs-selected-slate-configuration.facade';
import { Action, State, StateContext } from '@ngxs/store';
import { existsFilter } from '@sports-ui/ui-sdk';
import { DfsNflGridIronActions } from '../actions/dfs-nfl-grid-iron.actions';
import { DfsNflGridIronFacade } from '../facade/dfs-nfl-gridiron.facade';
import { GridIronPlayer } from '../models/nfl-gridIron.model';
import { NflSlateService } from '../service/nfl-slate.service';

@State({ name: DfsNflGridIronActions.stateName + 'Actionhandler' })
@Injectable()
export class DfsNflGridIronHandlerState {
  constructor(
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    private dfsNflGridIronFacade: DfsNflGridIronFacade,
    private nflService: NflSlateService
  ) {}

  @Action(DfsNflGridIronActions.Fetch)
  async fetchGridIronPlayers(_: StateContext<GenericStateModel<GridIronPlayer>>): Promise<void> {
    const site = this.dfsSelectedSlateConfigurationFacade.site;
    const projectionType = this.dfsSelectedSlateConfigurationFacade.projectionType;

    const players = await this.nflService.getGridIronPlayerProjections({ site, projectionType }).toPromise();

    this.dfsNflGridIronFacade.addOrUpdate(existsFilter(players));
  }
}
