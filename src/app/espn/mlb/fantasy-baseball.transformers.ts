import { exists } from '@app/@shared/helpers/utils';
import { EspnClient, MLB_TEAM_MAP } from 'sports-ui-sdk';

import { isPitcher } from '../espn-helpers';
import { EspnTransformers } from '../espn.transformers';
import { FantasyLeague } from '../models/fantasy-league.model';
import { MLB_LINEUP_MAP } from './consts/lineup.const';

import { MLB_POSITION_MAP } from './consts/position.const';
import { BaseballEvent } from './models/baseball-event.model';
import { BaseballLeague } from './models/baseball-league.model';
import { BaseballPlayer } from './models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from './models/baseball-team.model';

export namespace FantasyBaseballTransformers {
  export function clientEventToBaseballEvent(event: EspnClient.EventEntity): BaseballEvent {
    const { id, uid } = event;

    return {
      id,
      uid,
      competitors: event.competitors.reduce((acc, val) => {
        const { id, homeAway, abbreviation } = val;
        acc[val.id] = { id, homeAway, abbreviation };
        return acc;
      }, {}),
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
        sport: EspnClient.Sport.Baseball,
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

  export function transformEspnClientFreeAgentToBaseballPlayer(players: EspnClient.FreeAgent[]): BaseballPlayer[] {
    return players.map(player => {
      if (!exists(player.player)) {
        throw new Error('player.player must be defined');
      }

      const playerInfo = EspnTransformers.clientPlayerToPlayer(player.player, {
        sport: EspnClient.Sport.Baseball,
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
      freeAgents: transformEspnClientFreeAgentToBaseballPlayer(res.players),
    };
  }
}
