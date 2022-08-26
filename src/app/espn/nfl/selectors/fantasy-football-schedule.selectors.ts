import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { unique } from '@app/@shared/helpers/unique-by';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientScheduleEntity } from '@client/espn-client.model';
import { Selector } from '@ngxs/store';
import { FantasyMatchup, FantasyMatchupMap } from '../models/fantasy-schedule.model';
import { FootballTeam } from '../models/football-team.model';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballScheduleSelectors extends GenericSelector(FantasyFootballScheduleState) {
  @Selector([FantasyFootballScheduleSelectors.getList])
  static getMatchupPeriodIds(matchupList: EspnClientScheduleEntity[]): number[] {
    const ids = matchupList.map(m => m.matchupPeriodId);
    return unique(ids);
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupPeriodIds])
  static getMatchupPeriodIdFilterOptions(ids: number[]): FilterOptions<number>[] {
    return ids.map(id => ({ value: id, label: `Week ${id}` }));
  }

  @Selector([FantasyFootballScheduleSelectors.getList, FantasyFootballTeamSelectors.getById])
  static getMatchupListWithFantasyTeams(
    matchupList: EspnClientScheduleEntity[],
    getTeamById: (id: number) => FootballTeam
  ): FantasyMatchup[] {
    return Object.values(matchupList).map(m => {
      const home = getTeamById(m.away.teamId);
      const away = getTeamById(m.home.teamId);

      return {
        id: m.id,
        matchupPeriodId: m.matchupPeriodId,
        homeTeam: {
          ...home,
          totalPoints: m.home.totalPoints,
          isWinner: m.winner === 'HOME' ?? null,
          rank: home.currentRank,
          cumulativeScore: m.home.cumulativeScore,
        },
        awayTeam: {
          ...away,
          totalPoints: m.away.totalPoints,
          rank: away.currentRank,
          isWinner: m.winner === 'AWAY' ?? null,
          cumulativeScore: m.away.cumulativeScore,
        },
      };
    });
  }

  @Selector([FantasyFootballScheduleSelectors.getMatchupListWithFantasyTeams])
  static matchupListByMatchupPeriodId(matchupList: FantasyMatchup[]): FantasyMatchupMap {
    const map = {};

    matchupList.map(m => {
      if (m.matchupPeriodId in map) {
        map[m.matchupPeriodId].push(m);
      } else {
        map[m.matchupPeriodId] = [];
        map[m.matchupPeriodId].push(m);
      }
    });
    return map as FantasyMatchupMap;
  }

  @Selector([FantasyFootballScheduleSelectors.matchupListByMatchupPeriodId])
  static getMatchupListByMatchupPeriodId(matchupListByMatchupPeriodId: FantasyMatchupMap): (id: number) => FantasyMatchup[] {
    return (id: number) => matchupListByMatchupPeriodId[id];
  }
}
