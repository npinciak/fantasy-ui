import { Selector } from '@ngxs/store';

import { MLB_LINEUP } from '../consts';
import { BaseballPlayer } from '../models/baseball-player.model';
import { Team } from '../models/team.model';
import { BaseballTeamState } from '../state/baseball-team.state';

export class BaseballTeamSelectors {
  @Selector([BaseballTeamState.getBaseballTeamMap])
  static selectTeamMap(teams: { [id: string]: Team }): { [id: string]: Team } {
    return teams;
  }

  @Selector([BaseballTeamSelectors.selectTeamMap])
  static selectTeamList(teams: { [id: string]: Team }): Team[] {
    return Object.values(teams);
  }

  @Selector([BaseballTeamSelectors.selectTeamMap])
  static selectTeamById(teams: { [id: string]: Team }): (id: string) => Team {
    return (id: string) => teams[id];
  }

  @Selector([BaseballTeamSelectors.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => Team): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([BaseballTeamSelectors.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([BaseballTeamSelectors.selectTeamBatters])
  static getTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && !MLB_LINEUP[p.lineupSlot].bench);
  }

  @Selector([BaseballTeamSelectors.selectTeamBatters])
  static getTeamBenchBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP[p.lineupSlot].bench);
  }

  @Selector([BaseballTeamSelectors.selectTeamBatters])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }
}
