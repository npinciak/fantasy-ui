import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { FetchNFLResources } from '@app/dfs/mlb/state/dfs-slate.actions';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { DfsSlatePlayer, CoreSchedule, Schedule } from '../../mlb/models/dfsPlayer.interface';
import { DfsService } from '../service/dfs.service';
import { PlayerService } from '../../service/player.service';
import { NFLClientPlayerAttributes, NFLClientTeamAttributes } from '../models/nfl-slate-attr.model';
import { PatchProfiler } from './nfl-dfs-profiler.actions';
import { GridIronPlayer } from '../models/nfl-gridiron.model';
import { DfsUrlBuilder } from '../class/url-builder.class';
import { PatchTeamsFromSchedule } from './nfl-dfs-team.actions';

export class NflDfsStateModel {
  schedule: { [id: string]: CoreSchedule };
  masterPlayers: { [id: string]: DfsSlatePlayer };
  slatePlayers: { [id: string]: NFLClientPlayerAttributes };
  slateTeams: { [id: string]: NFLClientTeamAttributes };
  gridIronPlayers: { [id: string]: GridIronPlayer };
  slate: string;
  site: string;
  loading: boolean;
}

const defaults = {
  schedule: {},
  masterPlayers: {},
  slatePlayers: {},
  slateTeams: {},
  gridIronPlayers: {},
  slate: null,
  site: null,
  loading: false,
};

@State<NflDfsStateModel>({
  name: 'nflDfs',
  defaults,
})
@Injectable()
export class NflDfsState {
  constructor(private store: Store, private playerService: PlayerService, private dfsService: DfsService) {}

  @Selector()
  static loading(state: NflDfsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static slate(state: NflDfsStateModel): string {
    return state.slate;
  }

  @Selector()
  static site(state: NflDfsStateModel): string {
    return state.site;
  }

  @Selector()
  static schedule(state: NflDfsStateModel): { [id: number]: CoreSchedule } {
    return state.schedule;
  }

  @Selector()
  static gridIronPlayers(state: NflDfsStateModel): { [id: string]: GridIronPlayer } {
    return state.gridIronPlayers;
  }

  @Selector()
  static masterPlayers(state: NflDfsStateModel): { [id: string]: DfsSlatePlayer } {
    return state.masterPlayers;
  }

  @Selector()
  static slatePlayers(state: NflDfsStateModel): { [id: string]: NFLClientPlayerAttributes } {
    return state.slatePlayers;
  }

  @Selector()
  static slateTeams(state: NflDfsStateModel): { [id: string]: NFLClientTeamAttributes } {
    return state.slateTeams;
  }

  @Action(FetchNFLResources)
  async nflResources(
    { getState, patchState, setState }: StateContext<NflDfsStateModel>,
    { sport, site, slate }: FetchNFLResources
  ): Promise<void> {
    const urlBuilder = new DfsUrlBuilder('nfl');
    const state = getState();

    const original = urlBuilder.slateNonHttps;
    const newHttps = urlBuilder.slateHttps;

    try {
      patchState({ loading: true });

      const dfsPlayers = await this.playerService.playersBySlate(slate.slate_path.replace(original, newHttps)).toPromise();
      const slateAttributes = await this.dfsService.getGameAttrBySlateId(sport, site, slate.importId).toPromise();
      const gridPlayers = await this.dfsService.getGridIronPlayers(site).toPromise();

      const gridIronPlayers = entityMap(gridPlayers, player => player.PLAYERID);

      const masterPlayers = entityMap(dfsPlayers, player => player.player.id);

      const mschedule = {};

      dfsPlayers.map(p => {
        mschedule[p.schedule.id] = p.schedule;
      });

      const schedule: { [id: string]: Schedule } = { ...mschedule };

      const slateTeams = { ...slateAttributes.teams };
      const slatePlayers = { ...slateAttributes.players };
      const profiler = { ...slateAttributes.stat_groups };

      this.store.dispatch(new PatchProfiler({ profiler }));

      this.store.dispatch(new PatchTeamsFromSchedule(schedule));

      setState({
        ...state,
        schedule,
        masterPlayers,
        slateTeams,
        slatePlayers,
        gridIronPlayers,
        site,
        slate: slate.importId,
        loading: false,
      });
    } catch (error) {}
  }
}
