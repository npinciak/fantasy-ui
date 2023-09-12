import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { benchPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BASEBALL_LINEUP_MAP, BaseballStat } from '@sports-ui/ui-sdk/espn';
import { exists, existsFilter } from '@sports-ui/ui-sdk/helpers';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer, BaseballPlayerLiveStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';
import { FantasyBaseballEventsSelector } from './fantasy-baseball-events.selector';
import { FantasyBaseballTeamSelector } from './fantasy-baseball-team.selector';

export class FantasyBaseballTeamLiveSelector extends GenericSelector(FantasyBaseballTeamsLiveState) {
  @Selector([FantasyBaseballTeamLiveSelector.getList, FantasyBaseballTeamSelector.getById])
  static standings(teamList: BaseballTeamLive[], getTeamByTeamId: (id: string | null) => BaseballTeam | null): BaseballTeam[] {
    return teamList
      .map(t => {
        const team = getTeamByTeamId(t.id);
        if (!team) throw new Error('Team cannot be null');
        return {
          ...team,
          ...t,
        };
      })
      .sort((a, b) => b.liveScore - a.liveScore);
  }

  @Selector([FantasyBaseballTeamLiveSelector.standings])
  static getStatsStandingsLineChartData(standings: BaseballTeam[]) {
    return (statFilter: BaseballStat) => {
      const batterStats = standings
        .map(p => ({ statValue: exists(p.valuesByStat) ? p.valuesByStat[statFilter] : 0, name: p.name }))
        .filter(d => d.statValue !== 0)
        .sort((a, b) => Number(b.statValue) - Number(a.statValue));

      return {
        label: batterStats.map(p => p.name),
        data: batterStats.map(p => p.statValue),
      };
    };
  }

  @Selector([FantasyBaseballTeamLiveSelector.standings])
  static getRotoStatsStandingsLineChartData(standings: BaseballTeam[]) {
    return (statFilter: BaseballStat) => {
      const batterStats = standings
        .map(p => ({ statValue: exists(p.pointsByStat) ? p.pointsByStat[statFilter] : 0, name: p.name }))
        .filter(d => d.statValue !== 0)
        .sort((a, b) => Number(b.statValue) - Number(a.statValue));

      return {
        label: batterStats.map(p => p.name),
        data: batterStats.map(p => p.statValue),
      };
    };
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getById])
  static getLiveTeamBatters(teamId: string | null, getLiveTeamById: (id: string) => BaseballTeamLive): BaseballPlayer[] {
    return teamId ? getLiveTeamById(teamId).roster.filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBatters])
  static getLiveTeamStartingBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(batters, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBatters])
  static getLiveTeamBenchBatters(batters: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(batters, BASEBALL_LINEUP_MAP);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getLiveTeamStartingBatters, FantasyBaseballEventsSelector.getById])
  static getLiveTeamStartingBatterStats(
    teamId: string | null,
    players: BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ): BaseballPlayerLiveStatsRow[] {
    if (!teamId) throw new Error('teamId cannot be null');
    return FantasyBaseballTransformers.transformLiveStatsToLiveStatsTableRows(players, getLiveBaseballEventById);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getLiveTeamBenchBatters, FantasyBaseballEventsSelector.getById])
  static getLiveTeamBenchBatterStats(
    teamId: string | null,
    players: BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ): BaseballPlayerLiveStatsRow[] {
    if (!teamId) throw new Error('teamId cannot be null');
    return FantasyBaseballTransformers.transformLiveStatsToLiveStatsTableRows(players, getLiveBaseballEventById);
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBenchBatterStats])
  static getLiveTeamBenchBatterStatsTableRows(liveTeamBatters: BaseballPlayer[]) {
    return existsFilter(liveTeamBatters.map(player => FantasyBaseballTransformers.transformToLiveBaseballPlayerBatterStatsRow(player)));
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamStartingBatterStats])
  static getLiveTeamStartingBatterStatsTableRows(liveTeamBatters: BaseballPlayer[]) {
    return existsFilter(liveTeamBatters.map(player => FantasyBaseballTransformers.transformToLiveBaseballPlayerBatterStatsRow(player)));
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getById])
  static getLiveTeamPitchers(teamId: string | null, getLiveTeamById: (id: string) => BaseballTeamLive): BaseballPlayer[] {
    return teamId ? getLiveTeamById(teamId).roster.filter(p => p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamPitchers])
  static getLiveTeamStartingPitchers(players: BaseballPlayer[]): BaseballPlayer[] {
    return startingPlayersFilter(players, BASEBALL_LINEUP_MAP);
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamPitchers])
  static getLiveTeamBenchPitchers(players: BaseballPlayer[]): BaseballPlayer[] {
    return benchPlayersFilter(players, BASEBALL_LINEUP_MAP);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getLiveTeamStartingPitchers, FantasyBaseballEventsSelector.getById])
  static getLiveTeamStartingPitcherStatsTableRows(
    teamId: string | null,
    pitchers: BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ): BaseballPlayerLiveStatsRow[] {
    if (!teamId) throw new Error('teamId cannot be null');
    return FantasyBaseballTransformers.transformLiveStatsToLiveStatsTableRows(pitchers, getLiveBaseballEventById);
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBenchPitchers])
  static getLiveTeamBenchPitcherStatsTableRows(players: BaseballPlayer[]) {
    return existsFilter(players.map(player => FantasyBaseballTransformers.transformToLiveBaseballPlayerBatterStatsRow(player)));
  }
}
