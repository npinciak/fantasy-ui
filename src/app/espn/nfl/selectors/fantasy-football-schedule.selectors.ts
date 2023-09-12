import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { exists } from '@app/@shared/utilities/utilities.m';

import { BaseEspnEndpointBuilder } from '@app/espn/endpoint-builder/base-espn-endpoint-builder';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { Selector } from '@ngxs/store';
import { SCHEDULE_WINNER } from '@sports-ui/ui-sdk/espn';
import { ScheduleEntity } from '@sports-ui/ui-sdk/espn-client';
import { unique } from '@sports-ui/ui-sdk/helpers';
import { FantasyMatchup, FantasyMatchupMap } from '../models/fantasy-schedule.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { transformMatchupListToMatchupMap, transformTeamToMatchupTeam } from '../transformers/fantasy-football.transformers';
import { FantasyFootballLeagueSelector } from './fantasy-football-league.selectors';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballScheduleSelectors extends GenericSelector(FantasyFootballScheduleState) {
  @Selector([FantasyFootballScheduleSelectors.getList])
  static getMatchupPeriodIds(matchupList: ScheduleEntity[]): number[] {
    return unique(matchupList.map(m => m.matchupPeriodId));
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupPeriodIds])
  static getMatchupPeriodIdFilterOptions(ids: number[]): FilterOptions<number>[] {
    return ids.map(id => ({ value: id, label: `Week ${id}` }));
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

      const scheduleWinnerTypeMap = {
        [SCHEDULE_WINNER.UNDECIDED]: false,
        [SCHEDULE_WINNER.HOME]: true,
        [SCHEDULE_WINNER.AWAY]: false,
      };

      const homeWinner = scheduleWinnerTypeMap[m.winner];
      const awayWinner = scheduleWinnerTypeMap[m.winner];

      const homeTeam = transformTeamToMatchupTeam(home, m.home, homeWinner);
      const awayTeam = transformTeamToMatchupTeam(away, m.away, awayWinner);

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

  @Selector([FantasyFootballScheduleSelectors.getMatchupListWithFantasyTeams])
  static matchupMapByMatchupPeriodId(matchupList: FantasyMatchup[]): FantasyMatchupMap {
    return transformMatchupListToMatchupMap(matchupList);
  }

  @Selector([
    FantasyFootballScheduleSelectors.matchupMapByMatchupPeriodId,
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
