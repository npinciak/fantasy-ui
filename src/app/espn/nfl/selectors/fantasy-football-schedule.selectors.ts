import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { unique } from '@app/@shared/helpers/unique-by';
import { exists } from '@app/@shared/helpers/utils';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnClientScheduleEntity, EspnClientScheduleTeam, EspnClientScheduleWinner } from '@espnClient/espn-client.model';
import { Selector } from '@ngxs/store';
import { FantasyMatchup, FantasyMatchupMap, FantasyMatchupTeam } from '../models/fantasy-schedule.model';
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

  static transformTeamToMatchupTeam(
    team: FootballTeam | null,
    scheduleTeam: EspnClientScheduleTeam,
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
    matchupList: EspnClientScheduleEntity[],
    getTeamById: (id: string | null) => FootballTeam | null
  ): FantasyMatchup[] {
    return matchupList.map(m => {
      const home = getTeamById(m.home.teamId.toString());
      const away = getTeamById(m.away.teamId.toString());

      const homeWinner = m.winner === EspnClientScheduleWinner.UNDECIDED ? null : m.winner === EspnClientScheduleWinner.HOME;
      const awayWinner = m.winner === EspnClientScheduleWinner.UNDECIDED ? null : m.winner === EspnClientScheduleWinner.AWAY;

      const homeTeam = FantasyFootballScheduleSelectors.transformTeamToMatchupTeam(home, m.home, homeWinner);
      const awayTeam = FantasyFootballScheduleSelectors.transformTeamToMatchupTeam(away, m.away, awayWinner);

      return {
        id: m.id,
        matchupPeriodId: m.matchupPeriodId,
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
  static getMatchupListByMatchupPeriodId(matchupListByMatchupPeriodId: FantasyMatchupMap): (id: number | null) => FantasyMatchup[] {
    return (id: number | null) => (exists(id) ? matchupListByMatchupPeriodId[id] : []);
  }
}
