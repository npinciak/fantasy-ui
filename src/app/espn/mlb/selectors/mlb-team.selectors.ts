import { Selector } from '@ngxs/store';
import { BaseballPlayer } from '../class/player.class';
import { BaseballTeam } from '../class/team.class';
import { BaseballPlayerMap, BaseballTeamMap, MlbStateModel } from '../state/mlb-state.model';
import { MlbState } from '../state/mlb.state';
import { MlbSelectors } from './mlb.selectors';

export class MlbTeamSelectors {
  @Selector([MlbSelectors.baseballTeamMap])
  static selectBaseballTeamById(baseballTeams: BaseballTeamMap): (id: number) => BaseballTeam {
    return (id: number) => baseballTeams[id];
  }

  @Selector([MlbState.teams])
  static teamsEmpty(state: MlbStateModel) {
    return Object.values(state.teams).length === 0;
  }

  @Selector([MlbTeamSelectors.selectBaseballTeamById])
  static getTeamRoster(selectBaseballTeamById: (id: number) => BaseballTeam): (id: number) => BaseballPlayerMap {
    return (id: number) => selectBaseballTeamById(id).roster;
  }

  @Selector([MlbTeamSelectors.getTeamRoster])
  static getTeamBatters(getTeamRoster: (id: number) => BaseballPlayer): (id: number) => BaseballPlayer[] {
    return (id: number) => {
      const roster = getTeamRoster(id);
      return Object.values(roster)
        .filter(player => !player.isPitcher)
        .sort((a, b) => a.lineupSlot.displayOrder - b.lineupSlot.displayOrder);
    };
  }

  @Selector([MlbTeamSelectors.getTeamBatters])
  static getTeamStartingBatters(getTeamBatters: (id: number) => BaseballPlayer[]) {
    return (id: number) => getTeamBatters(id).filter(player => !player.isInjured && !player.lineupSlot.bench);
  }

  @Selector([MlbTeamSelectors.getTeamBatters])
  static getTeamBenchBatters(getTeamBatters: (id: number) => BaseballPlayer[]) {
    return (id: number) => getTeamBatters(id).filter(player => player.lineupSlot.bench);
  }

  @Selector([MlbTeamSelectors.getTeamRoster])
  static getTeamPitchers(getTeamRoster: (id: number) => BaseballPlayer): (id: number) => BaseballPlayer[] {
    return (id: number) => {
      const roster = getTeamRoster(id);
      return Object.values(roster)
        .filter(player => player.isPitcher)
        .sort((a, b) => a.lineupSlot.displayOrder - b.lineupSlot.displayOrder);
    };
  }

  @Selector([MlbTeamSelectors.getTeamPitchers])
  static getTeamStartingPitchers(getTeamPitchers: (id: number) => BaseballPlayer[]): (id: number) => BaseballPlayer[] {
    return (id: number) => getTeamPitchers(id).filter(player => !player.isInjured && !player.lineupSlot.bench);
  }
}
