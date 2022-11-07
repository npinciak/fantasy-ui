import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnClient } from '@espnClient/espn-client.model';
import { FOOTBALL_LINEUP_SLOT_MAP } from '../consts/lineup.const';
import { FootballPlayer } from '../models/football-player.model';
import { FootballPosition } from '../models/football-position.model';
import { FootballStat } from '../models/football-stats.model';
import { FootballTeam } from '../models/football-team.model';

import { FantasyFootballTeamState } from '../state/fantasy-football-teams.state';

export class FantasyFootballTeamSelectors extends GenericSelector(FantasyFootballTeamState) {
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
    return (id: string | null) =>
      getRosterByTeamId(id)
        .filter(p => FOOTBALL_LINEUP_SLOT_MAP[p.lineupSlotId].starter)
        .sort((a, b) => FOOTBALL_LINEUP_SLOT_MAP[a.lineupSlotId].displayOrder - FOOTBALL_LINEUP_SLOT_MAP[b.lineupSlotId].displayOrder);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStarters])
  static getTeamStartersPoints(getTeamStarters: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamStarters(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamBench(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => getRosterByTeamId(id).filter(p => FOOTBALL_LINEUP_SLOT_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamBench])
  static getTeamBenchPoints(getTeamBench: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamBench(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStats(getRosterByTeamId: (id: string | null) => FootballPlayer[]) {
    return (id: string | null, statPeriodId: string): FootballPlayer[] =>
      getRosterByTeamId(id).map(p => {
        const statsEntity = exists(p.stats) ? p.stats[statPeriodId] : {};

        let stats: EspnClient.PlayerStatsByYearMap = {
          ...statsEntity,
        };

        // if (stats.stats[FootballStat.RET] && stats.stats[FootballStat.GP]) {
        //   stats.stats[FootballStat.TargetsPerGame] = stats.stats[FootballStat.RET] / stats.stats[FootballStat.GP];
        // }
        const extendedStats = {};

        if (stats.stats[FootballStat.RET] && stats.stats[FootballStat.GP]) {
          Object.assign(extendedStats, { [FootballStat.TargetsPerGame]: stats.stats[FootballStat.RET] / stats.stats[FootballStat.GP] });
        }

        return {
          ...p,
          stats,
          extendedStats,
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
        const position = FOOTBALL_LINEUP_SLOT_MAP[p.defaultPositionId].abbrev;

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
