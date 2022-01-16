import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { getKey } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TeamAwayOrTeamHome } from '../../mlb/models/dfsPlayer.interface';
import { PatchTeamsFromSchedule } from './nfl-dfs-team.actions';

export class NflDfsTeamStateModel {
  rgTeams: { [id: string]: TeamAwayOrTeamHome };
  defaultTeams: { [id: string]: TeamAwayOrTeamHome };
}

const defaults = {
  rgTeams: {},
  defaultTeams: {},
};

/**
 * @deprecated moved to daily-fantasy-team.state
 */
@State<NflDfsTeamStateModel>({
  name: 'nflDfsTeam',
  defaults,
})
@Injectable()
export class NflDfsTeamState {
  /**
   * @deprecated
   */
  @Selector([NflDfsTeamState])
  static rgTeams(x: NflDfsTeamStateModel): { [id: string]: TeamAwayOrTeamHome } {
    return x.rgTeams;
  }

  /**
   * @deprecated
   */
  @Selector()
  static teams(x: NflDfsTeamStateModel): { [id: string]: TeamAwayOrTeamHome } {
    return x.defaultTeams;
  }

  /**
   * @deprecated
   */
  @Action(PatchTeamsFromSchedule)
  async patchTeamsFromSchedule(ctx: StateContext<NflDfsTeamStateModel>, { schedule }: PatchTeamsFromSchedule): Promise<void> {
    const scheduleList = Object.values(schedule);

    const homeDefault = objMap(
      scheduleList,
      games => games.team_home.id,
      games => games.team_home
    );
    const awayDefault = objMap(
      scheduleList,
      games => games.team_away.id,
      games => games.team_away
    );
    const homeRg = objMap(
      scheduleList,
      games => games.team_home.rg_id,
      games => games.team_home
    );
    const awayRg = objMap(
      scheduleList,
      games => games.team_away.rg_id,
      games => games.team_away
    );

    ctx.patchState({
      ...state,
      defaultTeams: { ...homeDefault, ...awayDefault },
      rgTeams: { ...homeRg, ...awayRg },
    });
  }
}

const objMap = <T, U>(entities: T[], getId: (t: T) => number | string, getData: (t: T) => U) =>
  entities.reduce((acc, entity) => {
    acc[getKey(entity, getId)] = getObj(entity, getData);
    return acc;
  }, {});

const getObj = <T, U>(entity: T, fn?: (e: T) => U) => (fn ? fn(entity) : (entity as any));
