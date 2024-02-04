import { FangraphsConstants } from '@app/@shared/fangraphs/fangraphs-const.model';
import { isPitcher } from '@app/espn/espn-helpers';
import { FantasyLeague } from '@app/espn/models/fantasy-league.model';
import { EspnTransformers } from '@app/espn/transformers/espn-transformers.m';
import { BASEBALL_LINEUP_MAP, BaseballLineupSlot, BaseballStat, EspnClient, MLB_POSITION_MAP, MLB_TEAM_MAP } from '@sports-ui/ui-sdk/espn';
import { FreeAgent, PlayerCardEntity, ProLeagueType, SPORT_TYPE, TeamRosterEntry } from '@sports-ui/ui-sdk/espn-client';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { MlbAdvancedStats } from '../class/mlb-advanced-stats';
import { FantasyBaseballImageBuilder } from '../fantasy-baseball-image-builder';
import { FantasyBaseballScoringPeriod } from '../fantasy-baseball-scoring-period';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer, BaseballPlayerCard, BaseballPlayerLiveStatsRow, BaseballPlayerStatsRow } from '../models/baseball-player.model';
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
  const { abbrev, logo, valuesByStat, pointsByStat, name } = team;

  return {
    id: team.id.toString(),
    name,
    abbrev,
    logo,
    roster: clientPlayerToBaseballPlayer(team.roster?.entries),
    totalPoints: team.points,
    liveScore: 0,
    currentRank: team.playoffSeed,
    valuesByStat,
    pointsByStat,
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

export function clientPlayerCardToBaseballPlayerCard(players: PlayerCardEntity[]): BaseballPlayerCard[] {
  return players.map(player => {
    const {
      player: { eligibleSlots, lastNewsDate, stance, laterality },
      ratings,
    } = player;

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player.player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const playerCardImage = FantasyBaseballImageBuilder.headshotImgBuilder({ id: playerInfo.id, width: 426, height: 320 });

    const starterStatusByProGame = player.player.starterStatusByProGame ?? null;

    return {
      ...playerInfo,
      isPitcher: isPitcher(eligibleSlots),
      starterStatusByProGame,
      lastNewsDate,
      isStarting: false,
      eligibleLineupSlots,
      playerRatings: ratings,
      stance,
      laterality,
      playerCardImage,
    };
  });
}

/**
 *
 * @param players
 * @returns
 */
export function clientPlayerToBaseballPlayer(players: TeamRosterEntry[]): BaseballPlayer[] {
  return players.map(player => {
    if (!exists(player.playerPoolEntry)) throw new Error('player.playerPoolEntry must be defined');

    const {
      lineupSlotId,
      playerPoolEntry: {
        player: { lastNewsDate, eligibleSlots },
        ratings,
      },
    } = player;

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player.playerPoolEntry.player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);
    const starterStatusByProGame = player.playerPoolEntry.player.starterStatusByProGame ?? null;

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
export function transformEspnFreeAgentToBaseballPlayer(freeAgents: FreeAgent[]): BaseballPlayer[] {
  return freeAgents.map(freeAgent => {
    if (!exists(freeAgent.player)) throw new Error('player.player must be defined');

    const {
      player,
      player: { eligibleSlots, lastNewsDate },
      ratings,
    } = freeAgent;

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);

    const starterStatusByProGame = freeAgent.player.starterStatusByProGame ?? null;

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
  seasonConst: FangraphsConstants
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

  const { fip, wOBA, wRAA, babip, iso, leftOnBasePercent, wRC } = MlbAdvancedStats(seasonConst, statsEntity);

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

export function transformToLiveBaseballPlayerBatterStatsRow(player: BaseballPlayer) {
  const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, eligibleLineupSlots, stats } = player;
  return { id, name, injured, injuryStatus, img, team, position, lineupSlotId, eligibleLineupSlots, stats };
}

export function transformLiveStatsToLiveStatsTableRows(
  players: BaseballPlayer[],
  getBaseballEvents: (id: string | null) => BaseballEvent | null
): BaseballPlayerLiveStatsRow[] {
  return players.map(p => {
    const games = exists(p.stats) ? Object.keys(p.stats) : [];

    const gameList = games.map(g => {
      const eventId = g.split('05')[1];
      const event = getBaseballEvents(eventId);
      return event ? FantasyBaseballScoringPeriod.liveScoring(event.id) : null;
    });

    const eventUid = gameList[0] != null ? gameList[0] : null;

    const statsEntity = exists(eventUid) ? (exists(p.stats) ? p.stats[eventUid]?.stats : null) : ({} as any);

    const stats = {
      ...statsEntity,
      [BaseballStat.IP]: exists(statsEntity[BaseballStat.IP]) ? statsEntity[BaseballStat.IP] * 0.333 : 0,
    };

    const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, eligibleLineupSlots, isPitcher } = p;

    return {
      id,
      name,
      injured,
      injuryStatus,
      img,
      team,
      position,
      lineupSlotId,
      eligibleLineupSlots,
      isPitcher,
      stats,
    };
  });
}
