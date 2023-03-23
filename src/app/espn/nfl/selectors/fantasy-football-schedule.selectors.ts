import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { EspnClient, SCHEDULE_WINNER, unique } from 'sports-ui-sdk';

import { Selector } from '@ngxs/store';
import { FantasyMatchup, FantasyMatchupMap, FantasyMatchupTeam } from '../models/fantasy-schedule.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { FantasyFootballLeagueSelector } from './fantasy-football-league.selectors';
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

      const homeWinner = m.winner === SCHEDULE_WINNER.UNDECIDED ? null : m.winner === SCHEDULE_WINNER.HOME;
      const awayWinner = m.winner === SCHEDULE_WINNER.UNDECIDED ? null : m.winner === SCHEDULE_WINNER.AWAY;

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

  @Selector([
    FantasyFootballScheduleSelectors.matchupListByMatchupPeriodId,
    FantasyFootballLeagueSelector.getFinalScoringPeriod,
    FantasyFootballLeagueSelector.getScoringPeriodId,
  ])
  static getMatchupListByMatchupPeriodId(
    matchupListByMatchupPeriodId: FantasyMatchupMap,
    finalScoringPeriod: string | null,
    currentScoringPeriod: string | null
  ): FantasyMatchup[] {
    if (!exists(currentScoringPeriod) || !exists(finalScoringPeriod)) return [];

    return Number(currentScoringPeriod) > Number(finalScoringPeriod)
      ? matchupListByMatchupPeriodId[16]
      : matchupListByMatchupPeriodId[currentScoringPeriod];
  }
}
