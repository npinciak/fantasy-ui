import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DfsSlatePlayer, Schedule } from '../models/dfsPlayer.interface';
import { GameAttributes, PlayerAttributes, TeamAttributes } from '../models/slate.interface';
import { SiteSlateConfig } from '../models/slateSettings.interface';
import { PlayerService } from '../../service/player.service';
import { FetchResources } from './dfs-slate.actions';
import { UpdateStatLine } from './mlb-dfs.actions';

export class MlbDfsStateModel {
  schedule: { [id: number]: Schedule };
  masterPlayers: { [id: number]: DfsSlatePlayer };
  slateGames: { [id: number]: GameAttributes };
  slatePlayers: { [id: number]: PlayerAttributes };
  slateTeams: { [id: number]: TeamAttributes };
  slateConfigs: SiteSlateConfig;
  statLine: string;
}

const defaults = {
  schedule: {},
  masterPlayers: {},
  slateGames: {},
  slatePlayers: {},
  slateTeams: {},
  slateConfigs: null,
  statLine: 'oneWeek',
};

/**
 * @deprecated moved to daily-fantasy-players.state,  daily-fantasy-schedule.state, daily-fantasy-slate.state
 */
@State<MlbDfsStateModel>({
  name: 'mlbDfs',
  defaults,
})
@Injectable()
export class MlbDfsState {
  constructor(private playerService: PlayerService) {}

  @Selector()
  static schedule(state: MlbDfsStateModel): { [id: number]: Schedule } {
    return state.schedule;
  }

  @Selector()
  static statLine(state: MlbDfsStateModel): string {
    return state.statLine;
  }

  @Selector()
  static masterPlayers(state: MlbDfsStateModel): { [id: number]: DfsSlatePlayer } {
    return state.masterPlayers;
  }

  @Selector()
  static slatePlayers(state: MlbDfsStateModel): { [id: number]: PlayerAttributes } {
    return state.slatePlayers;
  }

  @Selector()
  static slateGames(state: MlbDfsStateModel): { [id: number]: GameAttributes } {
    return state.slateGames;
  }

  @Selector()
  static slateConfigs(state: MlbDfsStateModel): SiteSlateConfig {
    return state.slateConfigs;
  }

  @Selector()
  static slateTeams(state: MlbDfsStateModel): { [id: number]: TeamAttributes } {
    return state.slateTeams;
  }

  @Action(FetchResources)
  async fetchResources(ctx: StateContext<MlbDfsStateModel>, { sport, site, slate }: FetchResources): Promise<void> {
    const original = 'http://json.rotogrinders.com.s3.amazonaws.com';
    const newHttps = 'https://s3.amazonaws.com/json.rotogrinders.com';

    // try {
    //   const data = await this.playerService.playersBySlate(slate.slate_path.replace(original, newHttps)).toPromise();
    //   const slateAttributes = await this.dfsService.getGameAttrBySlateId(sport, site, slate.importId).toPromise();

    //   const dfsPlayers = data.map(p => p.player);

    //   const schedule = data
    //     .map(p => p.game)
    //     .reduce((obj, val) => {
    //       obj[val.id] = val;
    //       return obj;
    //     }, {});

    //   const masterPlayers = entityMap(dfsPlayers, player => Number(player.rgId));

    //   const slateTeams = { ...slateAttributes.teams };
    //   const slateGames = { ...slateAttributes.games };
    //   const slatePlayers = { ...slateAttributes.players };

    //   ctx.patchState({
    //     schedule,
    //     masterPlayers,
    //     slateTeams,
    //     slateGames,
    //     slatePlayers,
    //   });
    // } catch (error) {}
  }

  // @Action(FetchSlates)
  // async fetchSlates(ctx: StateContext<MlbDfsStateModel>, { site, sport }: FetchSlates): Promise<void> {
  //   try {
  //     const res = await this.dfsService.getSlatesByDate(site, sport).toPromise();
  //     ctx.patchState({ draftkingsSlates: { ...res[site] } });
  //   } catch (error) {}
  // }

  @Action(UpdateStatLine)
  updateStatLine(ctx: StateContext<MlbDfsStateModel>, { statLine }: UpdateStatLine) {
    return ctx.patchState({
      statLine,
    });
  }
}
