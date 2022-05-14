import { exists } from '@app/@shared/helpers/utils';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastTeamSelectors } from '@app/espn-fastcast/selectors/espn-fastcast-team.selectors';
import { Selector } from '@ngxs/store';
import { AdvStats } from '../class/advStats.class';
import { MLB_LINEUP, MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_WEIGHTED_STATS, YearToStatTypePeriod } from '../consts/stats.const';
import { BaseballPlayer, BaseballPlayerBatterStatsRow } from '../models/baseball-player.model';
import { BaseballTeamLive, BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { Stat, StatTypePeriodId } from '../models/mlb-stats.model';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamsSelector {
  static transformToBaseballPlayerBatterStatsRow(p: BaseballPlayer, statPeriod: string, seasonId: string): BaseballPlayerBatterStatsRow {
    const statsEntity = exists(p.stats) ? p.stats[statPeriod] : {};
    const seasonConst = MLB_WEIGHTED_STATS[seasonId];
    const advancedStats = new AdvStats({ seasonConst, statsEntity });

    const adv = {};
    Object.assign(adv, {
      [Stat.fip]: advancedStats.fip,
      [Stat.wOBA]: advancedStats.wOBA,
      [Stat.wRAA]: advancedStats.wRAA,
      [Stat.BABIP]: advancedStats.babip,
      [Stat.ISO]: advancedStats.iso,
      [Stat.LOB_PCT]: advancedStats.leftOnBasePercent,
    });

    const stats = { ...statsEntity, ...adv };
    return {
      name: p.name,
      img: p.img,
      team: p.team,
      position: p.position,
      playerOwnershipChange: p.playerOwnershipChange,
      playerOwnershipPercentOwned: p.playerOwnershipPercentOwned,
      stats,
    };
  }

  static startingPlayers(players: BaseballPlayer[]): BaseballPlayer[] {
    return players
      .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
      .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  static benchPlayers(players: BaseballPlayer[]): BaseballPlayer[] {
    return players.filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyBaseballTeamState.map])
  static selectTeamList(teams: BaseballTeamMap): BaseballTeamTableRow[] {
    return Object.values(teams);
  }

  @Selector([FantasyBaseballTeamState.map, FantasyBaseballTeamsLiveState.selectEntityById])
  static selectTeamListLive(teams: BaseballTeamMap, liveTeams: (id: string) => BaseballTeamLive): Partial<BaseballTeamLive[]> {
    return Object.values(teams).map(t => {
      const liveTeam = liveTeams(t.id);
      return { ...t, liveTeam };
    });
  }

  @Selector([FantasyBaseballTeamState.map])
  static selectTeamById(teams: BaseballTeamMap): (id: string) => BaseballTeamTableRow {
    return (id: string) => teams[id];
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => BaseballTeamTableRow): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsLiveState.selectEntityById])
  static getLiveTeamBatters(selectLiveTeamById: (id: string) => BaseballTeamLive): (id: string) => BaseballPlayer[] {
    return (id: string) => selectLiveTeamById(id).roster.filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.startingPlayers(selectTeamBatters(id));
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamBenchBatters(selectTeamBatters: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.benchPlayers(selectTeamBatters(id));
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers])
  static selectTeamStartingPitchers(selectTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.startingPlayers(selectTeamPitchers(id));
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers])
  static selectTeamPitchersBench(selectTeamPitchers: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => FantasyBaseballTeamsSelector.benchPlayers(selectTeamPitchers(id));
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters, FantasyBaseballLeagueState.seasonId])
  static selectTeamBatterStats(
    selectTeamBatters: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerBatterStatsRow[] {
    return (id: string, statPeriod: string) => {
      const players = selectTeamBatters(id);
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
    };
  }

  @Selector([FantasyBaseballTeamsSelector.getLiveTeamBatters, EspnFastcastTeamSelectors.getById])
  static selectLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    selectFastcastTeamById: (id: string) => FastcastEventTeam | null
  ) {
    return (id: string) => {
      const batters = FantasyBaseballTeamsSelector.startingPlayers(getLiveTeamBatters(id));
      return batters.map(p => {
        const eventUid = selectFastcastTeamById(p?.teamUid)?.eventUid;

        let stats = {};
        if (eventUid) {
          const event = YearToStatTypePeriod(StatTypePeriodId.Live, `${eventUid.split('~')[3].replace('c:', '')}`);
          stats = exists(p.stats) ? p.stats[event] : {};
        }

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

  @Selector([FantasyBaseballTeamsSelector.selectTeamPitchers, FantasyBaseballLeagueState.seasonId])
  static selectTeamPitcherStats(
    selectTeamPitchers: (id: string) => BaseballPlayer[],
    seasonId: string
  ): (id: string, statPeriod: string) => BaseballPlayerBatterStatsRow[] {
    return (id: string, statPeriod: string) => {
      const players = selectTeamPitchers(id);
      return players.map(p => FantasyBaseballTeamsSelector.transformToBaseballPlayerBatterStatsRow(p, statPeriod, seasonId));
    };
  }
}
