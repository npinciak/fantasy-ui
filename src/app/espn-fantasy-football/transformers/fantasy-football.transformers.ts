import { FantasyLeague } from '@app/espn/models/fantasy-league.model';
import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { EspnTransformers } from '@app/espn/transformers/espn-transformers.m';
import { EspnClient, FOOTBALL_LINEUP_MAP, NFL_POSITION_MAP, NFL_TEAM_MAP } from '@sports-ui/ui-sdk/espn';
import { FreeAgentEntry, PlayerCardEntity, ProLeagueType, SPORT_TYPE, ScheduleTeam, TeamRosterEntry } from '@sports-ui/ui-sdk/espn-client';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { FantasyFootballImageBuilder } from '../fantasy-football-image-builder';
import { FootballLeague } from '../models/fantasy-football-league.model';
import { FantasyMatchup, FantasyMatchupMap, FantasyMatchupTeam } from '../models/fantasy-schedule.model';
import { FootballPlayer, FootballPlayerCard, FootballPlayerFreeAgent, FootballPlayerStatsRow } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';

export function clientLeagueToFootballLeague(res: EspnClient.FootballLeague, genericLeagueSettings: FantasyLeague): FootballLeague {
  const { schedule } = res;
  const teams = res.teams.map(t => clientTeamListToTeamList(t));
  const freeAgents = clientFreeAgentToFootballPlayer(res.players);

  return {
    ...genericLeagueSettings,
    teams,
    schedule,
    freeAgents,
  };
}

export function clientPlayerToFootballPlayer(player: TeamRosterEntry): FootballPlayer {
  const { lineupSlotId, playerPoolEntry } = player;

  if (!exists(playerPoolEntry)) throw new Error('playerPoolEntry must be defined');

  const playerInfo: FantasyPlayer = EspnTransformers.clientPlayerToFantasyPlayer({
    clientPlayer: playerPoolEntry.player,
    sport: SPORT_TYPE.Football,
    leagueId: ProLeagueType.NFL,
    teamMap: NFL_TEAM_MAP,
    positionMap: NFL_POSITION_MAP,
  });

  const isDST = playerInfo.defaultPositionId === 16;

  const img = !isDST
    ? FantasyFootballImageBuilder.headshotImgBuilder({ id: playerInfo.id })
    : FantasyFootballImageBuilder.logoImgBuilder({ id: playerInfo.team, height: 40, width: 55 });

  return {
    ...playerInfo,
    lineupSlotId,
    img,
    lineupSlot: FOOTBALL_LINEUP_MAP[lineupSlotId].abbrev,
  };
}

export function clientFreeAgentToFootballPlayer(data: FreeAgentEntry[]): FootballPlayerFreeAgent[] {
  return data.map(p => {
    if (!exists(p)) throw new Error('player must be defined');

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: p.player,
      sport: SPORT_TYPE.Football,
      leagueId: ProLeagueType.NFL,
      teamMap: NFL_TEAM_MAP,
      positionMap: NFL_POSITION_MAP,
    });

    const isDST = playerInfo.defaultPositionId === 16;

    const img = !isDST
      ? FantasyFootballImageBuilder.headshotImgBuilder({ id: playerInfo.id })
      : FantasyFootballImageBuilder.logoImgBuilder({ id: playerInfo.team, height: 40, width: 55 });

    return {
      ...playerInfo,
      img,
      lineupSlotId: playerInfo.defaultPositionId,
      lineupSlot: FOOTBALL_LINEUP_MAP[playerInfo.defaultPositionId].abbrev,
      points: 0, // p.player.appliedStatTotal,
    };
  });
}

export function clientTeamListToTeamList(team: EspnClient.FootballTeam): FootballTeam {
  const roster = team.roster.entries.map(p => clientPlayerToFootballPlayer(p));

  const {
    id,
    abbrev,
    logo,
    name,
    playoffSeed: currentRank,
    record: {
      overall: { wins, losses, ties, pointsAgainst, percentage, pointsFor },
    },
  } = team;

  return {
    id: id.toString(),
    name,
    abbrev,
    logo,
    wins,
    losses,
    ties,
    roster,
    pointsAgainst,
    percentage,
    pointsFor,
    currentRank,
  };
}

export function transformToFootballPlayerStatsRow(player: FootballPlayer, statPeriod: string): FootballPlayerStatsRow | null {
  const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, percentChange, percentOwned, defaultPositionId } = player;

  if (!exists(player.stats)) return null;
  if (!exists(player.stats[statPeriod])) return null;

  const { stats, appliedAverage, appliedTotal, appliedTotalCeiling } = player.stats[statPeriod]!;

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
    defaultPositionId,
    highlightedPlayer: false,
    stats,
    appliedAverage,
    appliedTotal,
    appliedTotalCeiling,
  };
}

export function transformTeamToMatchupTeam(
  team: FootballTeam | null,
  scheduleTeam: ScheduleTeam,
  isWinner: boolean
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
  };
}

export function transformMatchupListToMatchupMap(matchupList: FantasyMatchup[]): FantasyMatchupMap {
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

export function clientPlayerCardToFootballPlayerCard(players: PlayerCardEntity[]): FootballPlayerCard[] {
  return players.map(player => {
    const {
      player: { lastNewsDate, stance, laterality },
      ratings,
    } = player;

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: player.player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: NFL_TEAM_MAP,
      positionMap: NFL_POSITION_MAP,
    });

    const starterStatusByProGame = player.player.starterStatusByProGame ?? null;

    const playerCardImage = FantasyFootballImageBuilder.headshotImgBuilder({ id: playerInfo.id, width: 426, height: 320 });

    return {
      ...playerInfo,
      starterStatusByProGame,
      lastNewsDate,
      isStarting: false,
      playerRatings: ratings,
      stance,
      laterality,
      playerCardImage,
    };
  });
}
