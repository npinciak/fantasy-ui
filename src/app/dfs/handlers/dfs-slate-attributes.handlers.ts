import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/router/router.selectors';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';
import { DfsMlbSlatePlayer } from '../mlb/actions/dfs-mlb-slate-player.actions';
import { DfsMlbSlateTeamDetails } from '../mlb/actions/dfs-mlb-slate-team.actions';
import { DfsNflGridIron } from '../nfl/actions/dfs-nfl-grid-iron.actions';
import { DfsNflSlatePlayerAttributes } from '../nfl/actions/dfs-nfl-slate-player-attributes.actions';

import { DfsNflSlateTeamDetails } from '../nfl/actions/dfs-nfl-slate-team.actions';
import { PlayerProfiler } from '../nfl/models/nfl-profiler.model';
import { SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';

import { DfsNflProfilerQBFacade } from '../nfl/facade/dfs-nfl-profiler-qb.facade';
import { DfsNflProfilerRBFacade } from '../nfl/facade/dfs-nfl-profiler-rb.facade';
import { DfsNflProfilerTEFacade } from '../nfl/facade/dfs-nfl-profiler-te.facade';
import { DfsNflProfilerWRFacade } from '../nfl/facade/dfs-nfl-profiler-wr.facade';
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
    private dfsNflProfilerQbFacade: DfsNflProfilerQBFacade,
    private dfsNflProfilerRbFacade: DfsNflProfilerRBFacade,
    private dfsNflProfilerWrFacade: DfsNflProfilerWRFacade,
    private dfsNflProfilerTeFacade: DfsNflProfilerTEFacade
  ) {}

  @Action(DfsSlateAttributes.Fetch)
  async fetchSlateAttr(_: StateContext<DfsSlateAttributesStateModel>, { payload }: { payload: { slate } }): Promise<void> {
    const queryParams = this.store.selectSnapshot(RouterSelector.getRouterQueryParams);
    const routeData = this.store.selectSnapshot(RouterSelector.getRouterData);

    const sport = routeData?.sport as string;
    const site = queryParams?.site as string;
    const { slate } = payload;

    const { statGroups, teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slate }).toPromise();

    const qbStatGroup = exists(statGroups) ? statGroups.qb : ([] as PlayerProfiler[]);
    const rbStatGroup = exists(statGroups) ? statGroups.rb : ([] as PlayerProfiler[]);
    const wrStatGroup = exists(statGroups) ? statGroups.wr : ([] as PlayerProfiler[]);
    const teStatGroup = exists(statGroups) ? statGroups.te : ([] as PlayerProfiler[]);

    // this.store.dispatch([new DfsWeather.AddOrUpdate(weather)]);

    switch (sport) {
      case 'mlb':
        this.store.dispatch([new DfsMlbSlatePlayer.AddOrUpdate(players), new DfsMlbSlateTeamDetails.AddOrUpdate(teams)]);

        break;
      case 'nfl':
        await Promise.all([
          this.dfsNflProfilerQbFacade.clear().toPromise(),
          this.dfsNflProfilerRbFacade.clear().toPromise(),
          this.dfsNflProfilerWrFacade.clear().toPromise(),
          this.dfsNflProfilerTeFacade.clear().toPromise(),
        ]);

        await Promise.all([
          this.dfsNflProfilerQbFacade.addOrUpdate(qbStatGroup).toPromise(),
          this.dfsNflProfilerRbFacade.addOrUpdate(rbStatGroup).toPromise(),
          this.dfsNflProfilerWrFacade.addOrUpdate(wrStatGroup).toPromise(),
          this.dfsNflProfilerTeFacade.addOrUpdate(teStatGroup).toPromise(),
        ]);
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
