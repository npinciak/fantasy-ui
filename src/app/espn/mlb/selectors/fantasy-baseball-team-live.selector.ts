import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { benchPlayersFilter, startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BASEBALL_LINEUP_MAP, BaseballStat } from '@sports-ui/ui-sdk/espn';
import { FantasyBaseballScoringPeriod } from '../fantasy-baseball-scoring-period';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballTransformers } from '../transformers/fantasy-baseball.transformers.m';
import { FantasyBaseballEventSelector } from './fantasy-baseball-event.selector';
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

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getLiveTeamBatters, FantasyBaseballEventSelector.getById])
  static getLiveTeamStartingBatterStats(
    teamId: string | null,
    liveTeamBatters: BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ) {
    if (!teamId) throw new Error('teamId cannot be null');

    const batters = startingPlayersFilter(liveTeamBatters, BASEBALL_LINEUP_MAP);
    return batters.map(p => {
      const games = exists(p.stats) ? Object.keys(p.stats) : [];

      const gameList = games.map(g => {
        const eventId = g.split('05')[1];
        const event = getLiveBaseballEventById(eventId);
        return event ? FantasyBaseballScoringPeriod.liveScoring(event.id) : null;
      });

      const eventUid = gameList[0] != null ? gameList[0] : null;

      let stats = {} as any;
      if (exists(eventUid)) {
        stats = exists(p.stats) ? p.stats[eventUid]?.stats : {};
      }

      const { id, name, img, team, position, injured, injuryStatus, lineupSlotId, percentChange, percentOwned, eligibleLineupSlots } = p;

      return {
        id,
        name,
        img,
        team,
        position,
        injured,
        injuryStatus,
        lineupSlotId,
        eligibleLineupSlots,
        percentChange,
        percentOwned,
        stats,
      };
    });
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getLiveTeamBatters, FantasyBaseballEventSelector.getById])
  static getLiveTeamBenchBatterStats(
    teamId: string | null,
    liveTeamBatters: BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ) {
    if (!teamId) throw new Error('teamId cannot be null');

    const batters = benchPlayersFilter(liveTeamBatters, BASEBALL_LINEUP_MAP);
    return batters.map(p => {
      const games = exists(p.stats) ? Object.keys(p.stats) : [];

      const gameList = games.map(g => {
        const eventId = g.split('05')[1];
        const event = getLiveBaseballEventById(eventId);
        return event ? FantasyBaseballScoringPeriod.liveScoring(event.id) : null;
      });

      const eventUid = gameList[0] != null ? gameList[0] : null;

      let stats = {} as any;
      if (exists(eventUid)) {
        stats = exists(p.stats) ? p.stats[eventUid]?.stats : {};
      }

      const { id, name, img, team, position, injured, injuryStatus, lineupSlotId, percentChange, percentOwned, eligibleLineupSlots } = p;

      return {
        id,
        name,
        img,
        team,
        position,
        injured,
        injuryStatus,
        lineupSlotId,
        eligibleLineupSlots,
        percentChange,
        percentOwned,
        stats,
      };
    });
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBenchBatterStats])
  static getLiveTeamBenchBatterStatsTableRows(liveTeamBatters: BaseballPlayer[]) {
    return existsFilter(liveTeamBatters.map(player => FantasyBaseballTransformers.transformToLiveBaseballPlayerBatterStatsRow(player)));
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamStartingBatterStats])
  static getLiveTeamStartingBatterStatsTableRows(liveTeamBatters: BaseballPlayer[]) {
    return existsFilter(liveTeamBatters.map(player => FantasyBaseballTransformers.transformToLiveBaseballPlayerBatterStatsRow(player)));
  }
}
