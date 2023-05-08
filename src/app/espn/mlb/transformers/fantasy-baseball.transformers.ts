import { exists } from '@app/@shared/utilities/utilities.m';
import { BaseballStat, EspnClient, MLB_LINEUP_MAP, MLB_POSITION_MAP, MLB_TEAM_MAP, SPORT_ID } from 'sports-ui-sdk';

import { isPitcher } from '../../espn-helpers';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { EspnTransformers } from '../../transformers/espn-transformers.m';
import { AdvStats } from '../class/advStats.class';

import { FangraphsWobaFipConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

export function clientEventToBaseballEvent(event: EspnClient.EventEntity): BaseballEvent {
  const { id, uid, competitors } = event;
  return {
    id,
    uid,
    competitors: competitors.reduce((acc, val) => ({ ...acc, [val.id]: { ...val } }), {}),
  };
}

export function clientTeamListToTeamList(team: EspnClient.Team): BaseballTeam {
  const { abbrev, logo } = team;

  return {
    id: team.id.toString(),
    name: `${team.location} ${team.nickname}`,
    abbrev,
    logo,
    roster: clientPlayerToBaseballPlayer(team.roster?.entries),
    totalPoints: team.points,
    liveScore: 0,
    currentRank: team.playoffSeed,
    rotoStats: team.valuesByStat,
  };
}

export function clientScheduleTeamListToTeamList(team: EspnClient.ScheduleTeam): BaseballTeamLive {
  const { totalPoints, teamId, totalPointsLive, rosterForCurrentScoringPeriod } = team;

  return {
    id: teamId.toString(),
    totalPoints,
    liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
    roster: clientPlayerToBaseballPlayer(rosterForCurrentScoringPeriod.entries),
  };
}

export function clientPlayerToBaseballPlayer(players: EspnClient.TeamRosterEntry[]): BaseballPlayer[] {
  return players.map(player => {
    if (!exists(player.playerPoolEntry)) throw new Error('player.playerPoolEntry must be defined');

    const {
      lineupSlotId,
      playerPoolEntry: {
        player: { starterStatusByProGame, lastNewsDate, eligibleSlots },
        ratings,
      },
    } = player;

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player.playerPoolEntry.player,
      sport: SPORT_ID.Baseball,
      leagueId: EspnClient.LeagueId.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: MLB_LINEUP_MAP[lineupSlotId].abbrev,
      starterStatusByProGame,
      lastNewsDate,
    };
  });
}

export function transformEspnFreeAgentToBaseballPlayer(freeAgents: EspnClient.FreeAgent[]): BaseballPlayer[] {
  return freeAgents.map(freeAgent => {
    if (!exists(freeAgent.player)) throw new Error('player.player must be defined');

    const {
      player,
      player: { starterStatusByProGame, eligibleSlots, lastNewsDate },
      ratings,
    } = freeAgent;

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player,
      sport: SPORT_ID.Baseball,
      leagueId: EspnClient.LeagueId.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId: 0,
      isStarting: false,
      startingStatus: null,
      lineupSlot: null,
      starterStatusByProGame,
      lastNewsDate,
    };
  });
}

export function clientLeagueToBaseballLeague(res: EspnClient.BaseballLeague, genericLeagueSettings: FantasyLeague): BaseballLeague {
  const schedule = res.schedule[0];

  const teams = res.teams.map(t => clientTeamListToTeamList(t));
  const teamsLive = exists(schedule.teams) ? schedule.teams.map(t => clientScheduleTeamListToTeamList(t)) : [];

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive,
    freeAgents: transformEspnFreeAgentToBaseballPlayer(res.players),
  };
}

export function transformToBaseballPlayerBatterStatsRow(
  player: BaseballPlayer,
  statPeriod: string,
  seasonConst: FangraphsWobaFipConstants
): BaseballPlayerStatsRow | null {
  const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, percentChange, percentOwned } = player;

  if (!exists(player.stats)) return null;
  if (!exists(player.stats[statPeriod])) return null;

  const statsEntity = player.stats[statPeriod]!.stats;

  const { fip, wOBA, wRAA, babip, iso, leftOnBasePercent } = new AdvStats({ seasonConst, statsEntity });

  const adv = {} as Record<BaseballStat, number>;

  adv[BaseballStat.fip] = fip;
  adv[BaseballStat.wOBA] = wOBA;
  adv[BaseballStat.wRAA] = wRAA;
  adv[BaseballStat.BABIP] = babip;
  adv[BaseballStat.ISO] = iso;
  adv[BaseballStat.LOB_PCT] = leftOnBasePercent;

  const stats = {
    ...adv,
    ...statsEntity,
    [BaseballStat.IP]: exists(statsEntity[BaseballStat.IP]) ? statsEntity[BaseballStat.IP] * 0.333 : 0,
  };

  return {
    id,
    name,
    injured,
    injuryStatus,
    img,
    team,
    position,
    lineupSlotId,
    percentChange,
    percentOwned,
    highlightedPlayer: false,
    stats,
  };
}
