import { exists } from '@app/@shared/helpers/utils';
import { EspnClient } from 'sports-ui-sdk';
import { headshotImgBuilder, logoImgBuilder } from '../espn.const';
import { EspnTransformers } from '../espn.transformers';
import { FantasyLeague } from '../models/fantasy-league.model';
import { FootballLineup } from './consts/lineup.const';
import { NFL_POSITION_MAP } from './consts/position.const';
import { NFL_TEAM_MAP } from './consts/team.const';
import { FootballLeague } from './models/fantasy-football-league.model';
import { FootballPlayer, FootballPlayerFreeAgent } from './models/football-player.model';
import { FootballTeam } from './models/football-team.model';

export namespace FantasyFootballTransformers {
  export function clientLeagueToFootballLeague(res: EspnClient.FootballLeague, genericLeagueSettings: FantasyLeague): FootballLeague {
    const { schedule } = res;
    const teams = res.teams.map(t => clientTeamListToTeamList(t));

    return {
      ...genericLeagueSettings,
      teams,
      schedule,
      freeAgents: clientFreeAgentToFootballPlayer(res.players),
    };
  }

  export function clientPlayerToFootballPlayer(player: EspnClient.TeamRosterEntry): FootballPlayer {
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }

    const { lineupSlotId } = player;

    const playerInfo = EspnTransformers.clientPlayerToPlayer(player.playerPoolEntry.player, {
      sport: EspnClient.Sport.Football,
      leagueId: EspnClient.LeagueId.NFL,
      teamMap: NFL_TEAM_MAP,
      positionMap: NFL_POSITION_MAP,
    });

    const league = 'nfl';

    const isDST = playerInfo.defaultPositionId === 16;

    return {
      ...playerInfo,
      lineupSlotId,
      img: !isDST ? headshotImgBuilder(player.playerId, { league }) : logoImgBuilder(playerInfo.team, { league, height: 40, width: 54 }),
      lineupSlot: FootballLineup.LineupSlotMap[player.lineupSlotId].abbrev,
      points: player.playerPoolEntry.appliedStatTotal,
    };
  }

  export function clientTeamListToTeamList(team: EspnClient.FootballTeam): FootballTeam {
    const roster = team.roster.entries.map(p => clientPlayerToFootballPlayer(p));

    const { abbrev, logo, record, playoffSeed: currentRank } = team;

    const { wins, losses, ties, pointsAgainst, percentage, pointsFor } = record.overall;

    return {
      id: team.id.toString(),
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
      if (!exists(p)) {
        throw new Error('player must be defined');
      }

      const playerInfo = EspnTransformers.clientPlayerToPlayer(p.player, {
        sport: EspnClient.Sport.Football,
        leagueId: EspnClient.LeagueId.NFL,
        teamMap: NFL_TEAM_MAP,
        positionMap: NFL_POSITION_MAP,
      });

      const isDST = playerInfo.defaultPositionId === 16;

      const league = 'nfl';

      return {
        ...playerInfo,
        img: !isDST ? headshotImgBuilder(p.id, { league }) : logoImgBuilder(playerInfo.team, { league, height: 40, width: 55 }),
        lineupSlotId: playerInfo.defaultPositionId,
        lineupSlot: FootballLineup.LineupSlotMap[playerInfo.defaultPositionId].abbrev,
        points: 0, // p.player.appliedStatTotal,
      };
    });
  }
}
