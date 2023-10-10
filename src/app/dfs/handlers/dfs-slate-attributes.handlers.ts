import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsSlateAttributesActions } from '../actions/dfs-slate-attr.actions';
import { DfsSelectedSlateConfigurationFacade } from '../facade/dfs-selected-slate-configuration.facade';
import { DfsMlbSlatePlayerActions } from '../mlb/actions/dfs-mlb-slate-player.actions';
import { DfsMlbSlateTeamDetailsActions } from '../mlb/actions/dfs-mlb-slate-team.actions';
import { SlateTeamNfl } from '../models/slate-team.model';
import { DfsNflGridIronActions } from '../nfl/actions/dfs-nfl-grid-iron.actions';
import { DfsNflSlatePlayerAttributesActions } from '../nfl/actions/dfs-nfl-slate-player-attributes.actions';
import { DfsNflSlateTeamDetailsActions } from '../nfl/actions/dfs-nfl-slate-team.actions';
import { SlateService } from '../service/slate.service';

export class DfsSlateAttributesStateModel {
  slate: string | null;
  site: number | string | null;
}

const defaults = {
  slate: null,
  site: null,
};

@State({ name: DfsSlateAttributesActions.stateName + 'Actionhandler' })
@Injectable()
export class DfsSlateAttributesHandlerState {
  constructor(
    private store: Store,
    private slateService: SlateService,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade
  ) {}

  @Action(DfsSlateAttributesActions.Fetch)
  async fetchSlateAttr(_: StateContext<DfsSlateAttributesStateModel>, { payload: { slateId } }: { payload: { slateId } }): Promise<void> {
    const sport = this.dfsSelectedSlateConfigurationFacade.sport;
    const site = this.dfsSelectedSlateConfigurationFacade.site;

    if (!sport || !site) return;

    const { teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slateId }).toPromise();

    // this.store.dispatch([new DfsWeather.AddOrUpdate(weather)]);

    switch (sport) {
      case 'mlb':
        this.store.dispatch([new DfsMlbSlatePlayerActions.AddOrUpdate(players), new DfsMlbSlateTeamDetailsActions.AddOrUpdate(teams)]);

        break;
      case 'nfl':
        await this.store
          .dispatch([
            new DfsNflSlatePlayerAttributesActions.AddOrUpdate(players),
            new DfsNflSlateTeamDetailsActions.AddOrUpdate(teams as SlateTeamNfl[]),
            new DfsNflGridIronActions.Fetch({ site }),
          ])
          .toPromise();
        break;
      case 'nba':
        // dispatch([new PatchNbaTeamSlateAttr({ teams })]);
        break;

      default:
        break;
    }

    // patchState({ slate });
  }
}
