import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@app/@shared/models/typed-selector';
import { exists } from '@app/@shared/utilities/utilities.m';
import { benchPlayersFilter, injuredReservePlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { EspnClient, FootballPosition, FOOTBALL_LINEUP_MAP } from 'sports-ui-sdk';
import { FootballPlayer } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';

import { FantasyFootballTeamState } from '../state/fantasy-football-teams.state';

export class FantasyFootballTeamSelectors extends GenericSelector(FantasyFootballTeamState) {
  @Selector([FantasyFootballTeamSelectors.getList])
  static getTeamFilterOptions(teams: FootballTeam[]): FilterOptions<string>[] {
    return teams.map(t => ({ value: t.id, label: t.name }));
  }

  @Selector([FantasyFootballTeamSelectors.getById])
  static getRosterByTeamId(getById: (id: string | null) => FootballTeam | null): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => {
      if (!exists(id)) return [];
      const team = getById(id);
      return team ? team.roster : [];
    };
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStarters(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => startingPlayersFilter(getRosterByTeamId(id), FOOTBALL_LINEUP_MAP);
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
  static getTeamStartersPoints(getTeamStarters: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamStarters(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamBench(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => benchPlayersFilter(getRosterByTeamId(id), FOOTBALL_LINEUP_MAP);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamBench])
  static getTeamBenchPoints(getTeamBench: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamBench(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamInjuredReserve(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => injuredReservePlayersFilter(getRosterByTeamId(id));
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStats(getRosterByTeamId: (id: string | null) => FootballPlayer[]) {
    return (id: string | null, statPeriodId: string): FootballPlayer[] =>
      getRosterByTeamId(id).map(p => {
        const stats = statsValidator(p.stats, statPeriodId);

        return {
          ...p,
          stats,
        };
      });
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats])
  static getTeamStatsByPositionId(getTeamStats: (id: string | null, statPeriod: string) => FootballPlayer[]) {
    return (id: string | null, statPeriod: string, positionId: FootballPosition) =>
      getTeamStats(id, statPeriod).filter(p => p.defaultPositionId === positionId);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamPositionsCount(getRosterByTeamId: (id: string | null) => FootballPlayer[]) {
    return (id: string | null) => {
      const teamPositionCount = {};

      getRosterByTeamId(id).map(p => {
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
    [year: string]: EspnClient.PlayerStatsYear | null;
  } | null,
  statPeriod: string | null
) {
  if (exists(stats) && exists(statPeriod)) return stats;

  return null;
}
