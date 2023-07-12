import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { benchPlayersFilter, injuredPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { FootballPlayer } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';

import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { FOOTBALL_LINEUP_MAP, FootballPosition } from '@sports-ui/ui-sdk/espn';
import { PlayerStatsYear } from '@sports-ui/ui-sdk/espn-client';
import { FantasyFootballTeamState } from '../state/fantasy-football-team.state';

export class FantasyFootballTeamSelectors extends GenericSelector(FantasyFootballTeamState) {
  @Selector([RouterSelector.getTeamId, FantasyFootballTeamSelectors.getById])
  static getTeamInfoByTeamId(teamId: string | null, getTeamById: (id: string | null) => FootballTeam) {
    if (!exists(teamId)) throw new Error('cannot retrieve Team without valid teamId');
    return getTeamById(teamId);
  }

  @Selector([FantasyFootballTeamSelectors.getList])
  static standings(teamList: FootballTeam[]): FootballTeam[] {
    return teamList.sort((a, b) => b.wins - a.wins);
  }

  @Selector([FantasyFootballTeamSelectors.getList])
  static getTeamFilterOptions(teams: FootballTeam[]): FilterOptions<string>[] {
    return teams.map(t => ({ value: t.id, label: t.name }));
  }

  @Selector([RouterSelector.getTeamId, FantasyFootballTeamSelectors.getById])
  static getRosterByTeamId(teamId: string | null, getById: (id: string | null) => FootballTeam | null): FootballPlayer[] {
    const team = getById(teamId);
    return team ? team.roster : [];
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStarters(rosterByTeamId: FootballPlayer[]): FootballPlayer[] {
    return startingPlayersFilter(rosterByTeamId, FOOTBALL_LINEUP_MAP);
  }

  // @Selector([FantasyFootballLeagueSelectors.getCurrentStatTypePeriod, FantasyFootballTeamSelectors.getTeamStarters])
  // static getTeamStartersLineupCard(
  //   currentStatTypePeriod: string,
  //   getTeamStarters: (id: string | null) => FootballPlayer[]
  // ): (id: string | null) => FootballPlayerLineupCard[] {
  //   return (id: string | null) =>
  //     getTeamStarters(id).map(p => {
  //       const { id, name, img, team, teamId, teamUid, position, injuryStatus } = p;

  //       const projectedPoints = statsValidator(p.stats, currentStatTypePeriod).appliedTotal;

  //       return {
  //         id,
  //         name,
  //         img,
  //         team,
  //         teamId,
  //         teamUid,
  //         position,
  //         injuryStatus,
  //         projectedPoints,
  //       };
  //     });
  // }

  @Selector([FantasyFootballTeamSelectors.getTeamStarters])
  static getTeamStartersPoints(teamStarters: FootballPlayer[]): number {
    return teamStarters.reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamBench(rosterByTeamId: FootballPlayer[]): FootballPlayer[] {
    return benchPlayersFilter(rosterByTeamId, FOOTBALL_LINEUP_MAP);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamBench])
  static getTeamBenchPoints(teamBench: FootballPlayer[]): number {
    return teamBench.reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamInjuredReserve(rosterByTeamId: FootballPlayer[]): FootballPlayer[] {
    return injuredPlayersFilter(rosterByTeamId);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStats(rosterByTeamId: FootballPlayer[]) {
    return (statPeriodId: string): FootballPlayer[] =>
      rosterByTeamId.map(p => {
        const stats = statsValidator(p.stats, statPeriodId);

        return {
          ...p,
          stats,
        };
      });
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats])
  static getTeamStatsByPositionId(getTeamStats: (statPeriod: string) => FootballPlayer[]) {
    return (statPeriod: string, positionId: FootballPosition) => getTeamStats(statPeriod).filter(p => p.defaultPositionId === positionId);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamPositionsCount(rosterByTeamId: FootballPlayer[]) {
    return (id: string | null) => {
      const teamPositionCount = {};

      rosterByTeamId.map(p => {
        const position = FOOTBALL_LINEUP_MAP[p.defaultPositionId].abbrev;

        if (position in teamPositionCount) {
          teamPositionCount[position]++;
        } else {
          teamPositionCount[position] = 0;
          teamPositionCount[position]++;
        }
      });

      return teamPositionCount;
    };
  }
}

function statsValidator(
  stats: {
    [year: string]: PlayerStatsYear | null;
  } | null,
  statPeriod: string | null
) {
  if (exists(stats) && exists(statPeriod)) return stats;

  return null;
}
