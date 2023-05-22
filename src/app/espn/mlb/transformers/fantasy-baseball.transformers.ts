import { FangraphsWobaFipConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { exists } from '@app/@shared/utilities/utilities.m';
import { BASEBALL_LINEUP_MAP, BaseballLineupSlot, BaseballStat, EspnClient, MLB_POSITION_MAP, MLB_TEAM_MAP, SPORT_ID } from 'sports-ui-sdk';
import { isPitcher } from '../../espn-helpers';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { EspnTransformers } from '../../transformers/espn-transformers.m';
import { AdvStats } from '../class/advStats.class';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

export function playerEligibleLineupSlotDisplay(val: BaseballLineupSlot[]) {
  return val
    .filter(slot =>
      [
        BaseballLineupSlot.FirstBase,
        BaseballLineupSlot.SecondBase,
        BaseballLineupSlot.SS,
        BaseballLineupSlot.ThirdBase,
        BaseballLineupSlot.C,
        BaseballLineupSlot.OF,
        BaseballLineupSlot.DH,
        BaseballLineupSlot.SP,
        BaseballLineupSlot.RP,
      ].includes(slot)
    )
    .map(slot => BASEBALL_LINEUP_MAP[slot].abbrev)
    .join(', ');
}

/**
 *
 * @param event
 * @returns
 */
export function clientEventToBaseballEvent(event: EspnClient.EventEntity): BaseballEvent {
  const { id, uid, competitors } = event;
  return {
    id,
    uid,
    competitors: competitors.reduce((acc, val) => ({ ...acc, [val.id]: { ...val } }), {}),
  };
}

/**
 *
 * @param team
 * @returns
 */
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

/**
 *
 * @param team
 * @returns
 */
export function clientScheduleTeamListToTeamList(team: EspnClient.ScheduleTeam): BaseballTeamLive {
  const { totalPoints, teamId, totalPointsLive, rosterForCurrentScoringPeriod } = team;

  return {
    id: teamId.toString(),
    totalPoints,
    liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
    roster: clientPlayerToBaseballPlayer(rosterForCurrentScoringPeriod.entries),
  };
}

/**
 *
 * @param players
 * @returns
 */
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

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: BASEBALL_LINEUP_MAP[lineupSlotId].abbrev,
      starterStatusByProGame,
      eligibleLineupSlots,
      lastNewsDate,
    };
  });
}

/**
 *
 * @param freeAgents
 * @returns
 */
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

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId: 0,
      isStarting: false,
      startingStatus: null,
      lineupSlot: null,
      starterStatusByProGame,
      eligibleLineupSlots,
      lastNewsDate,
    };
  });
}

/**
 *
 * @param res
 * @param genericLeagueSettings
 * @returns
 */
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

/**
 *
 * @param player
 * @param statPeriod
 * @param seasonConst
 * @returns
 */
export function transformToBaseballPlayerBatterStatsRow(
  player: BaseballPlayer,
  statPeriod: string,
  seasonConst: FangraphsWobaFipConstants
): BaseballPlayerStatsRow | null {
  const {
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
    percentStarted,
    eligibleLineupSlots,
  } = player;

  if (!exists(player.stats)) return null;
  if (!exists(player.stats[statPeriod])) return null;

  const statsEntity = player.stats[statPeriod]!.stats;

  const { fip, wOBA, wRAA, babip, iso, leftOnBasePercent, wRC } = new AdvStats({ seasonConst, statsEntity });

  const adv = {} as Record<BaseballStat, number>;

  adv[BaseballStat.fip] = fip;
  adv[BaseballStat.wOBA] = wOBA;
  adv[BaseballStat.wRAA] = wRAA;
  adv[BaseballStat.BABIP] = babip;
  adv[BaseballStat.ISO] = iso;
  adv[BaseballStat.LOB_PCT] = leftOnBasePercent;
  adv[BaseballStat.wRC] = wRC;

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
    percentStarted,
    highlightedPlayer: false,
    eligibleLineupSlots,
    stats,
  };
}
