import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';
import { DfsMlbSlatePlayer } from '../mlb/actions/dfs-mlb-slate-player.actions';
import { DfsMlbSlateTeamDetails } from '../mlb/actions/dfs-mlb-slate-team.actions';
import { DfsNflGridIron } from '../nfl/actions/dfs-nfl-grid-iron.actions';
import { DfsNflSlatePlayerAttributes } from '../nfl/actions/dfs-nfl-slate-player-attributes.actions';

import { DfsNflSlateTeamDetails } from '../nfl/actions/dfs-nfl-slate-team.actions';
import { SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';

import { DfsSelectedSlateConfigurationFacade } from '../facade/dfs-selected-slate-configuration.facade';

import { SlateService } from '../service/slate.service';

export class DfsSlateAttributesStateModel {
  slate: string | null;
  site: number | string | null;
}

const defaults = {
  slate: null,
  site: null,
};

@State({ name: DfsSlateAttributes.stateName + 'Actionhandler' })
@Injectable()
export class DfsSlateAttributesHandlerState {
  constructor(
    private store: Store,
    private slateService: SlateService,
    private dfsSelectedSlateConfigurationFacade: DfsSelectedSlateConfigurationFacade
  ) {}

  @Action(DfsSlateAttributes.Fetch)
  async fetchSlateAttr(_: StateContext<DfsSlateAttributesStateModel>, { payload: { slateId } }: { payload: { slateId } }): Promise<void> {
    const sport = this.dfsSelectedSlateConfigurationFacade.sport;
    const site = this.dfsSelectedSlateConfigurationFacade.site;

    if (!sport || !site) return;

    const { teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slateId }).toPromise();

    // this.store.dispatch([new DfsWeather.AddOrUpdate(weather)]);

    switch (sport) {
      case 'mlb':
        this.store.dispatch([new DfsMlbSlatePlayer.AddOrUpdate(players), new DfsMlbSlateTeamDetails.AddOrUpdate(teams)]);

        break;
      case 'nfl':
        await this.store
          .dispatch([
            new DfsNflSlatePlayerAttributes.AddOrUpdate(players),
            new DfsNflSlateTeamDetails.AddOrUpdate(teams as SlateTeamNfl[]),
            new DfsNflGridIron.Fetch({ site }),
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
