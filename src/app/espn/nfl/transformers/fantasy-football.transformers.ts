import { exists } from '@app/@shared/utilities/utilities.m';
import { FantasyPlayer } from '@app/espn/models/fantasy-player.model';
import { EspnClient, FOOTBALL_LINEUP_MAP, NFL_POSITION_MAP, NFL_TEAM_MAP, SPORT_ID } from 'sports-ui-sdk/lib/espn/espn.m';
import { headshotImgBuilder, logoImgBuilder } from '../../espn.const';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { EspnTransformers } from '../../transformers/espn-transformers.m';
import { FootballLeague } from '../models/fantasy-football-league.model';
import { FootballPlayer, FootballPlayerFreeAgent } from '../models/football-player.model';
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

export function clientPlayerToFootballPlayer(player: EspnClient.TeamRosterEntry): FootballPlayer {
  const { lineupSlotId, playerPoolEntry } = player;

  if (!exists(playerPoolEntry)) throw new Error('playerPoolEntry must be defined');

  const playerInfo: FantasyPlayer = EspnTransformers.clientPlayerToFantasyPlayer({
    clientPlayer: playerPoolEntry.player,
    sport: SPORT_ID.Football,
    leagueId: EspnClient.LeagueId.NFL,
    teamMap: NFL_TEAM_MAP,
    positionMap: NFL_POSITION_MAP,
  });

  const league = 'nfl';

  const isDST = playerInfo.defaultPositionId === 16;

  return {
    ...playerInfo,
    lineupSlotId,
    img: !isDST
      ? headshotImgBuilder({ id: player.playerId, league })
      : logoImgBuilder({ id: playerInfo.team, league, height: 40, width: 54 }),
    lineupSlot: FOOTBALL_LINEUP_MAP[lineupSlotId].abbrev,
    points: playerPoolEntry.appliedStatTotal,
  };
}

export function clientTeamListToTeamList(team: EspnClient.FootballTeam): FootballTeam {
  const roster = team.roster.entries.map(p => clientPlayerToFootballPlayer(p));

  const {
    id,
    abbrev,
    logo,
    playoffSeed: currentRank,
    record: {
      overall: { wins, losses, ties, pointsAgainst, percentage, pointsFor },
    },
  } = team;

  return {
    id: id.toString(),
    name: `${team.location} ${team.nickname}`,
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

export function clientFreeAgentToFootballPlayer(data: EspnClient.FreeAgentEntry[]): FootballPlayerFreeAgent[] {
  return data.map(p => {
    if (!exists(p)) throw new Error('player must be defined');

    const playerInfo = EspnTransformers.clientPlayerToFantasyPlayer({
      clientPlayer: p.player,
      sport: SPORT_ID.Football,
      leagueId: EspnClient.LeagueId.NFL,
      teamMap: NFL_TEAM_MAP,
      positionMap: NFL_POSITION_MAP,
    });

    const isDST = playerInfo.defaultPositionId === 16;

    const league = 'nfl';

    return {
      ...playerInfo,
      img: !isDST ? headshotImgBuilder({ id: p.id, league }) : logoImgBuilder({ id: playerInfo.team, league, height: 40, width: 55 }),
      lineupSlotId: playerInfo.defaultPositionId,
      lineupSlot: FOOTBALL_LINEUP_MAP[playerInfo.defaultPositionId].abbrev,
      points: 0, // p.player.appliedStatTotal,
    };
  });
}

export function transformToFootballPlayerStatsRow(player: FootballPlayer, statPeriod: string): any | null {
  const { id, name, injured, injuryStatus, img, team, position, lineupSlotId, percentChange, percentOwned } = player;

  if (!exists(player.stats)) return null;
  if (!exists(player.stats[statPeriod])) return null;

  const stats = player.stats[statPeriod]!.stats;

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
