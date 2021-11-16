import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { FetchNFLResources } from '@app/dfs/mlb/state/dfs-slate.actions';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { PlayerFilter } from '../../mlb/class/filter.class';
import { DfsSlatePlayer, CoreSchedule, Schedule, TeamAwayOrTeamHome } from '../../mlb/models/dfsPlayer.interface';
import { GameAttributes, PlayerAttributes, TeamAttributes } from '../../mlb/models/slate.interface';
import { SiteSlateConfig, Slot } from '../../mlb/models/slateSettings.interface';
import { DfsService } from '../service/dfs.service';
import { PlayerService } from '../../mlb/service/player.service';
import {
  NFLClientPlayerAttributes,
  NFLClientSlateAttributes,
  NFLClientTeam,
  NFLClientTeamAttributes,
} from '../models/nfl-slate-attr.model';
import { PatchProfiler } from './nfl-dfs-profiler.actions';
import { GridIronPlayer } from '../models/nfl-gridiron.model';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { DfsUrlBuilder } from '../class/url-builder.class';
import { updateItem } from '@ngxs/store/operators';
import { SlateSelectors } from '@app/dfs/mlb/selectors/slate.selector';
import { PatchTeamsFromSchedule } from './nfl-dfs-team.actions';
import { NFLPlayerTableRow, PlayerTableRow } from '../models/nfl-player-table-row.model';
import { AddPlayer, RemovePlayer } from './nfl-dfs-lineup.actions';

export class NflDfsLineupStateModel {
  // salary: number;
  lineup: { [slot: string]: NFLPlayerTableRow };
  positions: { [slot: string]: Slot };
}

const defaults = {
  // salary: null,
  lineup: {},
  positions: {},
};

@State<NflDfsLineupStateModel>({
  name: 'nflDfsLineup',
  defaults,
})
@Injectable()
export class NflDfsLineupState {
  constructor() {}

  @Action(AddPlayer)
  addPlayer(ctx: StateContext<NflDfsLineupStateModel>, { payload }: AddPlayer) {
    // const player = {};

    const lineup = {
      [payload.player.position]: payload.player,
    };

    ctx.patchState({
      lineup: { ...lineup },
    });
  }

  @Action(RemovePlayer)
  removePlayer(ctx: StateContext<NflDfsLineupStateModel>, { payload }: RemovePlayer) {
    ctx.patchState({});
  }
}
