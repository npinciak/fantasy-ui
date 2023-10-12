import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsSlateAttributesActions } from '../actions/dfs-slate-attr.actions';
import { DfsSelectedSlateConfigurationFacade } from '../facade/dfs-selected-slate-configuration.facade';
import { DfsMlbSlatePlayerFacade } from '../mlb/facade/dfs-mlb-slate-players.facade';
import { DfsSlateAttributesStateModel } from '../models/dfs-slate-attr.model';
import { SlateTeamNfl } from '../models/slate-team.model';
import { DfsNflGridIronActions } from '../nfl/actions/dfs-nfl-grid-iron.actions';
import { DfsNflSlatePlayerDetailsActions } from '../nfl/actions/dfs-nfl-slate-player-details.actions';
import { DfsNflSlateTeamDetailsActions } from '../nfl/actions/dfs-nfl-slate-team-details.actions';
import { DfsNflSlateTeamDetailsFacade } from '../nfl/facade/dfs-nfl-slate-team-details.facade';
import { NflSlateService } from '../nfl/service/nfl-slate.service';

@State({ name: DfsSlateAttributesActions.stateName + 'Actionhandler' })
@Injectable()
export class DfsSlateAttributesHandlerState {
  constructor(
    private store: Store,
    // private slateService: SlateService,
    private nflSlateService: NflSlateService,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade,
    // private dfsNflSlatePlayerAttributesFacade: DfsNflSlatePlayerAttributesFacade,
    private dfsNflSlateTeamDetailsFacade: DfsNflSlateTeamDetailsFacade,
    // private dfsNflGridIronActions: DfsNflGridIronFacade,
    private dfsMlbSlatePlayerFacade: DfsMlbSlatePlayerFacade // private dfsMlbSlateTeamDetailsFacade: DfsMlbSlateTeamDetailsFacade
  ) {}

  @Action(DfsSlateAttributesActions.Fetch)
  async fetchSlateAttr(_: StateContext<DfsSlateAttributesStateModel>, { payload: { slateId } }: { payload: { slateId } }): Promise<void> {
    const sport = this.dfsSelectedSlateConfigurationFacade.sport;
    const site = this.dfsSelectedSlateConfigurationFacade.site;

    if (!sport || !site) return;

    // const { teams, players } = await this.slateService.getGameAttributesBySlateId({ sport, site, slateId }).toPromise();

    // this.store.dispatch([new DfsWeather.AddOrUpdate(weather)]);

    const { teams, players } = await this.nflSlateService.getNflGameAttributesBySlateId({ sport, site, slateId }).toPromise();

    switch (sport) {
      case 'mlb':
        // this.dfsMlbSlatePlayerFacade.addOrUpdate(players);
        // this.store.dispatch([new DfsMlbSlatePlayerActions.AddOrUpdate(players), new DfsMlbSlateTeamDetailsActions.AddOrUpdate(teams)]);
        break;
      case 'nfl':
        // this.dfsNflSlateTeamDetailsFacade.addOrUpdate(teams);
        // const { teams, players } = await this.nflSlateService.getNflGameAttributesBySlateId({ sport, site, slateId }).toPromise();

        await this.store
          .dispatch([
            new DfsNflSlatePlayerDetailsActions.AddOrUpdate(players),
            new DfsNflSlateTeamDetailsActions.AddOrUpdate(teams as SlateTeamNfl[]),
            new DfsNflGridIronActions.Fetch({ site }),
          ])
          .toPromise();
        break;
      case 'nba':
        throw new Error(`NBA Not implemented`);
      default:
        break;
    }
  }
}
