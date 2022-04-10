import { FilterOptions } from '@app/@shared/models/filter.model';
import { EspnFastcastEventSelectors } from '@app/espn/selectors/espn-fastcast-event.selectors';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_LINEUP, MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_STATS_KEYS, MLB_STATS_MAP, MLB_WEIGHTED_STATS } from '../consts/stats.const';
import { statsKeyMap } from '../helpers';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { Stat } from '../models/mlb-stats.model';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamsSelector {
  @Selector([FantasyBaseballTeamState.map])
  static selectTeamList(teams: BaseballTeamMap): BaseballTeamTableRow[] {
    return Object.values(teams).map(t => ({
      ...t,
      rotoStatsMap: statsKeyMap(t.rotoStats),
    }));
  }

  // @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  @Selector()
  static selectStatListFilters(): FilterOptions[] {
    return MLB_STATS_KEYS.map(k => {
      return {
        label: MLB_STATS_MAP[k].description,
        value: k,
      };
    });
  }

  @Selector([FantasyBaseballTeamState.map])
  static selectTeamById(teams: BaseballTeamMap): (id: string) => BaseballTeamTableRow {
    return (id: string) => ({
      ...teams[id],
      rotoStatsMap: statsKeyMap(teams[id].rotoStats),
    });
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => BaseballTeamTableRow): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) =>
      selectTeamBatters(id)
        .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
        .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static getTeamBenchBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([
    FantasyBaseballTeamsSelector.selectTeamBatters,
    FantasyBaseballLeagueState.seasonId,
    EspnFastcastEventSelectors.selectEventIdList,
  ])
  static selectTeamBatterStats(selectRosterByTeamId: (id: string) => BaseballPlayer[], seasonId: string, eventIdList: string[]) {
    return (id: string, statPeriod: string) => {
      const players = selectRosterByTeamId(id);

      return players.map(p => {
        if (p.stats == null) {
          return;
        }

        const statsEntity = p?.stats[statPeriod];
        const seasonConst = MLB_WEIGHTED_STATS[seasonId];
        const advancedStats = new AdvStats({ seasonConst, statsEntity });

        const adv = {};
        adv[Stat.fip] = advancedStats.fip;
        adv[Stat.wOBA] = advancedStats.wOBA;
        adv[Stat.wRAA] = advancedStats.wRAA;
        adv[Stat.BABIP] = advancedStats.wRAA;
        const stats = { ...statsEntity, ...adv };

        return {
          name: p?.name,
          img: p.img,
          team: p.team,
          position: p.position,
          playerOwnershipChange: p.playerOwnershipChange,
          playerOwnershipPercentOwned: p.playerOwnershipPercentOwned,
          stats,
        };
      });
    };
  }
}
