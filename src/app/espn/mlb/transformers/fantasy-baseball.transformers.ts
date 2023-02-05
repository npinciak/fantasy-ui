import { exists } from '@app/@shared/utilities/utilities.m';
import { EspnClient, MLB_LINEUP_MAP, MLB_POSITION_MAP, MLB_TEAM_MAP, SPORT_ID } from 'sports-ui-sdk';

import { isPitcher } from '../../espn-helpers';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { EspnTransformers } from '../../transformers/espn-transformers.m';

import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
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
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }

    const playerInfo = EspnTransformers.clientPlayerToPlayer(player.playerPoolEntry.player, {
      sport: SPORT_ID.Baseball,
      leagueId: EspnClient.LeagueId.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const { starterStatusByProGame, lastNewsDate } = player.playerPoolEntry.player;

    return {
      ...playerInfo,
      playerRatings: player.playerPoolEntry.ratings,
      isPitcher: isPitcher(player.playerPoolEntry.player.eligibleSlots),
      lineupSlotId: player.lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
      starterStatusByProGame,
      lastNewsDate,
    };
  });
}

export function transformEspnFreeAgentToBaseballPlayer(players: EspnClient.FreeAgent[]): BaseballPlayer[] {
  return players.map(player => {
    if (!exists(player.player)) {
      throw new Error('player.player must be defined');
    }

    const playerInfo = EspnTransformers.clientPlayerToPlayer(player.player, {
      sport: SPORT_ID.Baseball,
      leagueId: EspnClient.LeagueId.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const { lastNewsDate } = player.player;

    return {
      ...playerInfo,
      playerRatings: player.ratings,
      isPitcher: isPitcher(player.player.eligibleSlots),
      lineupSlotId: 0,
      isStarting: false,
      startingStatus: null,
      lineupSlot: '',
      starterStatusByProGame: {},
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
