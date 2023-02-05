import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClient, unique } from 'sports-ui-sdk';
import { exists } from '@app/@shared/utilities/utilities.m';

import { Selector } from '@ngxs/store';
import { FantasyMatchup, FantasyMatchupMap, FantasyMatchupTeam } from '../models/fantasy-schedule.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballScheduleSelectors extends GenericSelector(FantasyFootballScheduleState) {
  @Selector([FantasyFootballScheduleSelectors.getList])
  static getMatchupPeriodIds(matchupList: EspnClient.ScheduleEntity[]): number[] {
    const ids = matchupList.map(m => m.matchupPeriodId);

    return unique(ids);
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupPeriodIds])
  static getMatchupPeriodIdFilterOptions(ids: number[]): FilterOptions<number>[] {
    return ids.map(id => ({ value: id, label: `Week ${id}` }));
  }

  static transformTeamToMatchupTeam(
    team: FootballTeam | null,
    scheduleTeam: EspnClient.ScheduleTeam,
    isWinner: boolean | null
  ): FantasyMatchupTeam | null {
    if (!exists(team)) return null;

    const { cumulativeScore, totalProjectedPointsLive, totalPoints, totalPointsLive } = scheduleTeam;
    const { roster, currentRank } = team;

    return {
      ...team,
      currentRank,
      cumulativeScore,
      totalProjectedPointsLive,
      roster,
      totalPoints: exists(totalPointsLive) ? totalPointsLive : totalPoints,
      isWinner,
      currentPredictedWinPct: 0,
    };
  }

  @Selector([FantasyFootballScheduleSelectors.getList, FantasyFootballTeamSelectors.getById])
  static getMatchupListWithFantasyTeams(
    matchupList: EspnClient.ScheduleEntity[],
    getTeamById: (id: string | null) => FootballTeam | null
  ): FantasyMatchup[] {
    return matchupList.map(m => {
      const { id, matchupPeriodId } = m;

      const home = getTeamById(m.home.teamId.toString());
      const away = getTeamById(m.away.teamId.toString());

      const homeWinner = m.winner === EspnClient.ScheduleWinner.UNDECIDED ? null : m.winner === EspnClient.ScheduleWinner.HOME;
      const awayWinner = m.winner === EspnClient.ScheduleWinner.UNDECIDED ? null : m.winner === EspnClient.ScheduleWinner.AWAY;

      const homeTeam = FantasyFootballScheduleSelectors.transformTeamToMatchupTeam(home, m.home, homeWinner);
      const awayTeam = FantasyFootballScheduleSelectors.transformTeamToMatchupTeam(away, m.away, awayWinner);

      return {
        id,
        matchupPeriodId,
        homeTeam,
        awayTeam,
      };
    });
  }

  static matchupListToMatchupMap(matchupList: FantasyMatchup[]): FantasyMatchupMap {
    const map = {} as FantasyMatchupMap;

    matchupList.map(m => {
      if (m.matchupPeriodId in map) {
        map[m.matchupPeriodId].push(m);
      } else {
        map[m.matchupPeriodId] = [];
        map[m.matchupPeriodId].push(m);
      }
    });
    return map;
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupListWithFantasyTeams])
  static matchupListByMatchupPeriodId(matchupList: FantasyMatchup[]): FantasyMatchupMap {
    return FantasyFootballScheduleSelectors.matchupListToMatchupMap(matchupList);
  }

  @Selector([FantasyFootballScheduleSelectors.matchupListByMatchupPeriodId])
  static getMatchupListByMatchupPeriodId(matchupListByMatchupPeriodId: FantasyMatchupMap): (id: string | null) => FantasyMatchup[] {
    return (id: string | null) => (exists(id) ? matchupListByMatchupPeriodId[id] : []);
  }
}
