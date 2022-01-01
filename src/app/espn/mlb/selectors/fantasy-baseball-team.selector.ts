import { Selector } from '@ngxs/store';

import { MLB_LINEUP } from '../consts';
import { BaseballPlayer } from '../models/baseball-player.model';
import { Team } from '../models/team.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamSelectors {
  @Selector([FantasyBaseballTeamState.getBaseballTeamMap])
  static selectTeamMap(teams: { [id: string]: Team }): { [id: string]: Team } {
    return teams;
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamMap])
  static selectTeamList(teams: { [id: string]: Team }): Team[] {
    return Object.values(teams);
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamMap])
  static selectTeamById(teams: { [id: string]: Team }): (id: string) => Team {
    return (id: string) => teams[id];
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => Team): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([FantasyBaseballTeamSelectors.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamBatters])
  static getTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && !MLB_LINEUP[p.lineupSlot].bench);
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamBatters])
  static getTeamBenchBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP[p.lineupSlot].bench);
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamBatters])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }
}
