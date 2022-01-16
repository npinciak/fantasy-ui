import { Injectable } from '@angular/core';
import { FetchNFLResources } from '@app/dfs/mlb/state/dfs-slate.actions';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { DfsSlatePlayer } from '../../mlb/models/dfsPlayer.interface';
import { PlayerService } from '../../service/player.service';
import { DfsUrlBuilder } from '../class/url-builder.class';
import { NFLClientPlayerAttributesMap, NFLClientSlateAttrTeamMap } from '../models/nfl-client.model';
import { GridIronPlayer } from '../models/nfl-gridiron.model';

export class NflDfsStateModel {
  masterPlayers: { [id: string]: DfsSlatePlayer };
  slatePlayers: NFLClientPlayerAttributesMap;
  slateTeams: NFLClientSlateAttrTeamMap;
  gridIronPlayers: { [id: string]: GridIronPlayer };
  slate: string;
  site: string;
  loading: boolean;
}

const defaults = {
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
  constructor(private store: Store, private playerService: PlayerService) {}

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
  static gridIronPlayers(state: NflDfsStateModel): { [id: string]: GridIronPlayer } {
    return state.gridIronPlayers;
  }

  @Selector()
  static masterPlayers(state: NflDfsStateModel): { [id: string]: DfsSlatePlayer } {
    return state.masterPlayers;
  }

  @Selector()
  static slatePlayers(state: NflDfsStateModel): NFLClientPlayerAttributesMap {
    return state.slatePlayers;
  }

  @Selector()
  static slateTeams(state: NflDfsStateModel): NFLClientSlateAttrTeamMap {
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

      // const data = await this.playerService.playersBySlate(slate.slate_path.replace(original, newHttps)).toPromise();
      // const slateAttributes = await this.dfsService.getGameAttrBySlateId(sport, site, slate.importId).toPromise();
      // const gridPlayers = await this.dfsService.getGridIronPlayers(site).toPromise();

      // const gridIronPlayers = entityMap(gridPlayers, player => player.PLAYERID);

      // const dfsPlayers = data.map(p => p.player);
      // const masterPlayers = entityMap(dfsPlayers, player => player.id);

      // const slateTeams = { ...slateAttributes.teams };
      // const slatePlayers = { ...slateAttributes.players };
      // const profiler = { ...slateAttributes.stat_groups };

      // this.store.dispatch(new PatchProfiler({ profiler }));

      // this.store.dispatch(new PatchTeamsFromSchedule(schedule));

      setState({
        ...state,
        // masterPlayers,
        // slateTeams,
        // // slatePlayers,
        // gridIronPlayers,
        site,
        slate: slate.importId,
        loading: false,
      });
    } catch (error) {}
  }
}
