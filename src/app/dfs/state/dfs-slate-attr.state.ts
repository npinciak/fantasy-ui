import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';
import { DfsWeather } from '../actions/dfs-weather.actions';
import { DfsMlbSlatePlayer } from '../mlb/actions/dfs-mlb-slate-player.actions';
import { DfsMlbSlateTeamDetails } from '../mlb/actions/dfs-mlb-slate-team.actions';
import { DfsNflGridIron } from '../nfl/actions/dfs-nfl-grid-iron.actions';
import { DfsNflProfilerQb } from '../nfl/actions/dfs-nfl-profiler-qb.actions';
import { DfsNflProfilerRb } from '../nfl/actions/dfs-nfl-profiler-rb.actions';
import { DfsNflProfilerTe } from '../nfl/actions/dfs-nfl-profiler-te.actions';
import { DfsNflProfilerWr } from '../nfl/actions/dfs-nfl-profiler-wr.actions';
import { DfsNflSlatePlayerAttributes } from '../nfl/actions/dfs-nfl-slate-player-attributes.actions';

import { DfsNflSlateTeamDetails } from '../nfl/actions/dfs-nfl-slate-team.actions';
import { PlayerProfiler } from '../nfl/models/nfl-profiler.model';
import { SlateTeamNfl } from '../nfl/models/nfl-slate-attr.model';

import { SlateService } from '../service/slate.service';

export class DfsSlateAttributesStateModel {
  slate: string | null;
  site: number | string | null;
}

const defaults = {
  slate: null,
  site: null,
};

@State<DfsSlateAttributesStateModel>({
  name: DfsSlateAttributes.stateName,
  defaults,
})
@Injectable()
export class DfsSlateAttributesState {
  constructor(private store: Store, private slateService: SlateService) {}

  @Selector()
  static slate(state: DfsSlateAttributesStateModel): string | null {
    return state.slate;
  }

  @Action(DfsSlateAttributes.Fetch)
  async FetchSlateAttr({ patchState }: StateContext<DfsSlateAttributesStateModel>, { payload }: { payload: { slate } }): Promise<void> {
    const queryParams = this.store.selectSnapshot(RouterSelector.getRouterQueryParams);
    const routeData = this.store.selectSnapshot(RouterSelector.getRouterData);

    const sport = routeData?.sport as string;
    const site = queryParams?.site as string;
    const { slate } = payload;

    const { statGroups, teams, players, weather } = await this.slateService.getGameAttrBySlateId({ sport, site, slate }).toPromise();

    const qbStatGroup = exists(statGroups) ? statGroups.qb : ([] as PlayerProfiler[]);
    const rbStatGroup = exists(statGroups) ? statGroups.rb : ([] as PlayerProfiler[]);
    const wrStatGroup = exists(statGroups) ? statGroups.wr : ([] as PlayerProfiler[]);
    const teStatGroup = exists(statGroups) ? statGroups.te : ([] as PlayerProfiler[]);

    this.store.dispatch([new DfsWeather.ClearAndAdd(weather)]);

    switch (sport) {
      case 'mlb':
        this.store.dispatch([new DfsMlbSlatePlayer.ClearAndAdd(players), new DfsMlbSlateTeamDetails.ClearAndAdd(teams)]);

        break;
      case 'nfl':
        await this.store
          .dispatch([
            new DfsNflSlatePlayerAttributes.ClearAndAdd(players),
            new DfsNflSlateTeamDetails.ClearAndAdd(teams as SlateTeamNfl[]),
            new DfsNflProfilerQb.ClearAndAdd(qbStatGroup),
            new DfsNflProfilerRb.ClearAndAdd(rbStatGroup),
            new DfsNflProfilerWr.ClearAndAdd(wrStatGroup),
            new DfsNflProfilerTe.ClearAndAdd(teStatGroup),
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

    patchState({ slate });
  }
}
