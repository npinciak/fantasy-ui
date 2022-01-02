import { EspnClientRoster, EspnClientTeam } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { MLB_LINEUP } from '../consts/lineup.const';

import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamSelectors {
  @Selector([FantasyBaseballTeamState.getBaseballTeamMap])
  static selectTeamMap(teams: { [id: string]: EspnClientTeam }): { [id: string]: EspnClientTeam } {
    return teams;
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamMap])
  static selectTeamList(teams: { [id: string]: EspnClientTeam }): EspnClientTeam[] {
    return Object.values(teams);
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamMap])
  static selectTeamById(teams: { [id: string]: EspnClientTeam }): (id: string) => EspnClientTeam {
    return (id: string) => teams[id];
  }

  @Selector([FantasyBaseballTeamSelectors.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => EspnClientTeam): (id: string) => EspnClientRoster {
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
