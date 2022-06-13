import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import {
  EspnClientEvent,
  EspnClientFreeAgent,
  EspnClientPlayer,
  EspnClientPlayerNewsFeedEntity,
  EspnClientPlayerStatsEntityMap,
  EspnClientPlayerStatsYear,
  EspnClientScheduleTeam,
  EspnClientTeam,
} from '@app/espn/espn-client.model';
import { playerImgBuilder } from '@app/espn/espn.const';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BATTING_LINEUP_SLOTS, MLB_LINEUP_MAP, PitcherIdSet } from '../consts/lineup.const';
import { MLB_POSITION_MAP } from '../consts/position.const';
import { MLB_TEAM_MAP } from '../consts/team.const';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbService {
  constructor(private espnClient: EspnService) {}

  static isPitcher(eligiblePos: number[]): boolean {
    for (let i = 0; i < eligiblePos.length; i++) {
      if (PitcherIdSet.has(eligiblePos[i])) {
        return true;
      }
      return false;
    }
    return false;
  }

  static transformEspnClientEventToBaseballEvent(event: EspnClientEvent): BaseballEvent {
    return {
      id: event.id,
      uid: event.uid,
      competitors: event.competitors.reduce((acc, val) => {
        acc[val.id] = {
          id: val.id,
          homeAway: val.homeAway,
          abbreviation: val.abbreviation,
        };
        return acc;
      }, {}),
    };
  }

  static transformEspnClientTeamListToTeamList(teams: EspnClientTeam[]): BaseballTeam[] {
    return teams.map(team => ({
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev: team.abbrev,
      logo: team.logo,
      roster: MlbService.transformEspnClientTeamPlayerToBaseballPlayer(team.roster?.entries),
      totalPoints: team.points,
      liveScore: 0,
      currentRank: team.playoffSeed,
      rotoStats: team.valuesByStat,
    }));
  }

  static transformEspnClientScheduleTeamListToTeamList(teams: EspnClientScheduleTeam[]): BaseballTeamLive[] {
    return teams.map(team => ({
      id: team.teamId.toString(),
      totalPoints: team.totalPoints,
      liveScore: team.totalPointsLive,
      roster: MlbService.transformEspnClientTeamPlayerToBaseballPlayer(team.rosterForCurrentScoringPeriod.entries),
    }));
  }

  static NEWtransformEspnClientTeamPlayerToBaseballPlayer(player: EspnClientPlayer): BaseballPlayer {
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }
    return {
      id: player.playerId.toString(),
      name: player.playerPoolEntry?.player?.fullName,
      img: playerImgBuilder(player.playerId, 'mlb'),
      team: MLB_TEAM_MAP[player.playerPoolEntry?.player?.proTeamId],
      teamId: player.playerPoolEntry?.player.proTeamId.toString(),
      teamUid: `s:1~l:10~t:${player.playerPoolEntry?.player.proTeamId}`,
      position: MLB_POSITION_MAP[player.playerPoolEntry?.player.defaultPositionId].abbrev,
      isInjured: exists(player.playerPoolEntry) ?? player.playerPoolEntry?.player.injured,
      injuryStatus: player.playerPoolEntry?.player.injuryStatus,
      playerRatings: player.playerPoolEntry?.ratings,
      playerOwnershipChange: player.playerPoolEntry?.player.ownership?.percentChange,
      playerOwnershipPercentOwned: player.playerPoolEntry?.player.ownership?.percentOwned,
      isPitcher: MlbService.isPitcher(player.playerPoolEntry?.player.eligibleSlots),
      stats: MlbService.flattenPlayerStats(player.playerPoolEntry?.player.stats),
      lineupSlotId: player.lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
      starterStatusByProGame: player.playerPoolEntry?.player.starterStatusByProGame,
      lastNewsDate: player.playerPoolEntry.player.lastNewsDate,
    };
  }

  static transformEspnClientTeamPlayerToBaseballPlayer(players: EspnClientPlayer[]): BaseballPlayer[] {
    return players.map(player => {
      if (!exists(player.playerPoolEntry)) {
        throw new Error('player.playerPoolEntry must be defined');
      }
      return {
        id: player.playerId.toString(),
        name: player.playerPoolEntry?.player.fullName,
        img: playerImgBuilder(player.playerId, 'mlb'),
        teamUid: `s:1~l:10~t:${player.playerPoolEntry?.player.proTeamId}`,
        teamId: player.playerPoolEntry?.player.proTeamId.toString(),
        team: MLB_TEAM_MAP[player.playerPoolEntry?.player.proTeamId],
        position: MLB_POSITION_MAP[player.playerPoolEntry?.player.defaultPositionId].abbrev,
        isInjured: player.playerPoolEntry?.player.injured,
        injuryStatus: player.playerPoolEntry?.player.injuryStatus,
        playerRatings: player.playerPoolEntry?.ratings,
        playerOwnershipChange: player.playerPoolEntry?.player.ownership?.percentChange,
        playerOwnershipPercentOwned: player.playerPoolEntry?.player.ownership?.percentOwned,
        isPitcher: MlbService.isPitcher(player.playerPoolEntry?.player.eligibleSlots),
        stats: MlbService.flattenPlayerStats(player.playerPoolEntry?.player.stats),
        lineupSlotId: player.lineupSlotId,
        isStarting: false,
        startingStatus: null,
        lineupSlot: MLB_LINEUP_MAP[player.lineupSlotId].abbrev,
        starterStatusByProGame: player.playerPoolEntry?.player.starterStatusByProGame,
        lastNewsDate: player.playerPoolEntry.player.lastNewsDate,
      };
    });
  }

  static flattenPlayerStats(stats: EspnClientPlayerStatsYear[]): EspnClientPlayerStatsEntityMap {
    return stats?.reduce((obj, val) => {
      obj[val.id] = val.stats;
      return obj;
    }, {} as EspnClientPlayerStatsEntityMap);
  }

  static transformEspnClientFreeAgentToBaseballPlayer(players: EspnClientFreeAgent[]): BaseballPlayer[] {
    return players.map(player => {
      if (!exists(player.player)) {
        throw new Error('player.player must be defined');
      }
      return {
        id: player.id.toString(),
        name: player.player.fullName,
        img: playerImgBuilder(player.id, 'mlb'),
        teamId: player.player.proTeamId.toString(),
        teamUid: `s:1~l:10~t:${player.player.proTeamId}`,
        team: MLB_TEAM_MAP[player.player.proTeamId],
        position: MLB_POSITION_MAP[player.player.defaultPositionId].abbrev,
        isInjured: player.player.injured,
        injuryStatus: player.player.injuryStatus,
        playerRatings: player.ratings,
        playerOwnershipChange: player.player.ownership?.percentChange,
        playerOwnershipPercentOwned: player.player.ownership?.percentOwned,
        isPitcher: MlbService.isPitcher(player.player.eligibleSlots),
        stats: MlbService.flattenPlayerStats(player.player.stats),
        lineupSlotId: 0,
        isStarting: false,
        startingStatus: null,
        lineupSlot: '',
        starterStatusByProGame: {},
        lastNewsDate: player.player.lastNewsDate,
      };
    });
  }

  /**
   * Return fantasy baseball league
   * @param leagueId
   * @returns
   */
  baseballLeague(leagueId: number): Observable<{
    seasonId: string;
    scoringPeriodId: string;
    teamsLive: BaseballTeamLive[];
    teams: BaseballTeam[];
    freeAgents: BaseballPlayer[];
  }> {
    return this.espnClient.espnFantasyLeagueBySport(FantasySports.baseball, leagueId).pipe(
      map(res => {
        const teams = res.teams;
        const schedule = res.schedule[0];
        const seasonId = res.seasonId.toString();
        const scoringPeriodId = res.scoringPeriodId.toString();
        return {
          seasonId,
          scoringPeriodId,
          teamsLive: exists(schedule.teams) ? MlbService.transformEspnClientScheduleTeamListToTeamList(schedule.teams) : [],
          teams: MlbService.transformEspnClientTeamListToTeamList(teams),
          freeAgents: MlbService.transformEspnClientFreeAgentToBaseballPlayer(res.players),
        };
      })
    );
  }

  baseballEvents(): Observable<BaseballEvent[]> {
    return this.espnClient
      .espnFantasyLeagueEvents(FantasySports.baseball)
      .pipe(map(res => res.events.map(e => MlbService.transformEspnClientEventToBaseballEvent(e))));
  }

  /**
   * Return baseball player latest news
   * @param payload
   * @returns
   */
  baseballPlayerNews(payload: { lookbackDays: string; playerId: string }): Observable<EspnClientPlayerNewsFeedEntity[]> {
    const data = {
      sport: FantasySports.baseball,
      lookbackDays: payload.lookbackDays,
      playerId: payload.playerId,
    };
    return this.espnClient.espnFantasyPlayerNewsBySport(data).pipe(map(res => res.feed));
  }

  /**
   * Return fantasy baseball league free agents
   * @param payload
   * @returns
   */
  baseballFreeAgents(payload: { leagueId: number; scoringPeriodId: number; filter: PaginatedFilter }): Observable<BaseballPlayer[]> {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    return this.espnClient
      .espnFantasyFreeAgentsBySport(FantasySports.baseball, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => MlbService.transformEspnClientFreeAgentToBaseballPlayer(res.players)));
  }

  private get filterHeaders() {
    return {
      players: {
        filterStatus: { value: ['FREEAGENT', 'WAIVERS'] },
        filterSlotIds: { value: BATTING_LINEUP_SLOTS },
        filterRanksForScoringPeriodIds: { value: [1] },
        sortPercOwned: { sortPriority: 2, sortAsc: false },
        sortDraftRanks: { sortPriority: 100, sortAsc: true, value: 'STANDARD' },
        limit: 50,
        filterStatsForTopScoringPeriodIds: {
          value: 5,
          additionalValue: ['002022', '102022', '002021', '012022', '022022', '032022', '042022', '062022', '010002022'],
        },
      },
    };
  }

  // PITCHING_LINEUP_SLOTS
}

export interface PaginatedFilter {
  players: PlayerFilterEntity;
}

export interface PlayerFilterEntity {
  filterStatus: FilterValueString;
  filterSlotIds: FilterValueNumber;
  // filterRanksForScoringPeriodIds: FilterValueNumber;
  // sortPercOwned: SortMetaData;
  sortDraftRanks: SortMetaData;
  limit: number;
}

export interface SortMetaData {
  sortPriority: number;
  sortAsc: boolean;
  value: string | null;
}

export interface FilterValueString {
  value: string[];
}

export interface FilterValueNumber {
  value: number[];
}

export interface FilterStatsForTopScoringPeriodIds {
  value: number;
  additionalValue: number[];
}
