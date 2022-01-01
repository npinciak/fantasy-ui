import { EspnClientScheduleEntity, EspnClientTeam } from '@app/espn/espn-client.model';
import { Selector } from '@ngxs/store';
import { FantasyMatchup } from '../models/fantasy-schedule.model';
import { FantasyTeam } from '../models/fantasy-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { FantasyFootballTeamsSelectors } from './fantasy-football-teams.selectors';

export class FantasyFootballScheduleSelectors {
  @Selector([FantasyFootballScheduleState.map])
  static selectMatchupById(map: { [id: number]: EspnClientScheduleEntity }): (id: number) => EspnClientScheduleEntity {
    return (id: number) => map[id];
  }

  @Selector([FantasyFootballScheduleState.map])
  static selectMatchupList(map: { [id: number]: EspnClientScheduleEntity }): EspnClientScheduleEntity[] {
    return Object.values(map);
  }

  @Selector([FantasyFootballScheduleSelectors.selectMatchupList])
  static selectMatchupPeriodIds(matchupList: EspnClientScheduleEntity[]): number[] {
    const set = new Set<number>();
    matchupList.map(m => set.add(m.matchupPeriodId));
    return Array.from(set.keys());
  }

  @Selector([FantasyFootballScheduleSelectors.selectMatchupList, FantasyFootballTeamsSelectors.selectFantasyTeamById])
  static selectMatchupListWithFantasyTeams(
    matchupList: EspnClientScheduleEntity[],
    selectFantasyTeamById: (id: number) => FantasyTeam
  ): FantasyMatchup[] {
    return Object.values(matchupList).map(m => {
      const home = selectFantasyTeamById(m.away.teamId);
      const away = selectFantasyTeamById(m.home.teamId);

      return {
        id: m.id,
        matchupPeriodId: m.matchupPeriodId,
        homeTeam: {
          ...home,
          totalPoints: m.home.totalPoints,
          isWinner: m.winner === 'HOME' ?? null,
        },
        awayTeam: {
          ...away,
          totalPoints: m.away.totalPoints,
          isWinner: m.winner === 'AWAY' ?? null,
        },
      };
    });
  }

  @Selector([FantasyFootballScheduleSelectors.selectMatchupListWithFantasyTeams])
  static matchupListByMatchupPeriodId(selectMatchupListWithFantasyTeams: FantasyMatchup[]): {
    [matchupPeriodId: number]: FantasyMatchup[];
  } {
    const map: { [matchupPeriodId: number]: FantasyMatchup[] } = {};

    selectMatchupListWithFantasyTeams.map(m => {
      if (m.matchupPeriodId in map) {
        map[m.matchupPeriodId].push(m);
      } else {
        map[m.matchupPeriodId] = [];
        map[m.matchupPeriodId].push(m);
      }
    });
    return map;
  }

  @Selector([FantasyFootballScheduleSelectors.matchupListByMatchupPeriodId])
  static selectMatchupListByMatchupPeriodId(matchupListByMatchupPeriodId: {
    [matchupPeriodId: number]: FantasyMatchup[];
  }): (id: number) => FantasyMatchup[] {
    return (id: number) => matchupListByMatchupPeriodId[id];
  }
}
