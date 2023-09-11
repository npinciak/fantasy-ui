import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { exists } from '@app/@shared/utilities/utilities.m';

import { BaseEspnEndpointBuilder } from '@app/espn/endpoint-builder/base-espn-endpoint-builder';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { Selector } from '@ngxs/store';
import { SCHEDULE_WINNER } from '@sports-ui/ui-sdk/espn';
import { ScheduleEntity, ScheduleTeam } from '@sports-ui/ui-sdk/espn-client';
import { unique } from '@sports-ui/ui-sdk/helpers';
import { FantasyMatchup, FantasyMatchupMap, FantasyMatchupTeam } from '../models/fantasy-schedule.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { FantasyFootballLeagueSelector } from './fantasy-football-league.selectors';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballScheduleSelectors extends GenericSelector(FantasyFootballScheduleState) {
  @Selector([FantasyFootballScheduleSelectors.getList])
  static getMatchupPeriodIds(matchupList: ScheduleEntity[]): number[] {
    const ids = matchupList.map(m => m.matchupPeriodId);

    return unique(ids);
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupPeriodIds])
  static getMatchupPeriodIdFilterOptions(ids: number[]): FilterOptions<number>[] {
    return ids.map(id => ({ value: id, label: `Week ${id}` }));
  }

  static transformTeamToMatchupTeam(
    team: FootballTeam | null,
    scheduleTeam: ScheduleTeam,
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

  @Selector([
    FantasyFootballLeagueSelector.slices.id,
    FantasyFootballLeagueSelector.slices.seasonId,
    FantasyFootballScheduleSelectors.getList,
    FantasyFootballTeamSelectors.getById,
  ])
  static getMatchupListWithFantasyTeams(
    leagueId: string | null,
    seasonId: string | null,
    matchupList: ScheduleEntity[],
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

      const clickOutUrl = BaseEspnEndpointBuilder({
        sport: FantasySports.Football,
        leagueId: leagueId ?? '',
        year: seasonId ?? '',
      }).matchupClickout(m.home.teamId, m.matchupPeriodId);

      return {
        id,
        matchupPeriodId,
        homeTeam,
        awayTeam,
        clickOutUrl,
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
    FantasyFootballLeagueSelector.slices.finalScoringPeriod,
    FantasyFootballLeagueSelector.slices.scoringPeriodId,
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
