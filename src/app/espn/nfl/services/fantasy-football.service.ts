import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { flattenPlayerStats } from '@app/espn/espn-helpers';
import { headshotImgBuilder, logoImgBuilder } from '@app/espn/espn.const';
import { PaginatedFilter } from '@app/espn/mlb/services/mlb.service';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import {
  EspnClientFootballLeague,
  EspnClientFootballTeam,
  EspnClientFreeAgentEntry,
  EspnClientLeague,
  EspnClientPlayer,
} from '@client/espn-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NFL_LINEUP_MAP } from '../consts/lineup.const';
import { NFL_POSITION_MAP } from '../consts/position.const';
import { NFL_TEAM_MAP } from '../consts/team.const';
import { FantasyFootballLeague } from '../models/fantasy-football-league.model';
import { FootballPlayer, FootballPlayerFreeAgent } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballService {
  static transformEspnClientTeamPlayerToFootballPlayer(player: EspnClientPlayer): FootballPlayer {
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }

    const team = NFL_TEAM_MAP[player.playerPoolEntry.player.proTeamId];
    const isDST = player.playerPoolEntry.player.defaultPositionId === 16;
    const stats = flattenPlayerStats(player.playerPoolEntry.player.stats);

    return {
      id: player.playerId.toString(),
      name: player.playerPoolEntry.player.fullName,
      img: !isDST ? headshotImgBuilder(player.playerId, 'nfl') : logoImgBuilder(team, 'nfl'),
      team,
      teamId: player.playerPoolEntry.player.proTeamId.toString(),
      teamUid: `s:20~l:28~t:${player.playerPoolEntry?.player.proTeamId}`,
      position: NFL_POSITION_MAP[player.playerPoolEntry.player.defaultPositionId].abbrev,
      defaultPositionId: player.playerPoolEntry.player.defaultPositionId,
      isInjured: player.playerPoolEntry.player.injured,
      injuryStatus: player.playerPoolEntry.player.injuryStatus,
      lineupSlotId: player.lineupSlotId,
      lineupSlot: NFL_LINEUP_MAP[player.lineupSlotId].abbrev,
      points: player.playerPoolEntry.appliedStatTotal,
      stats,
    };
  }

  static transformEspnClientScheduleTeamListToTeamList(data: any[]) {
    return [];
  }

  static calculatePredictedWinPct(pointsScored: number, pointsAllowed: number, exp: number) {
    const R = pointsScored / pointsAllowed;

    return Math.pow(R, exp) / (Math.pow(R, exp) + 1);
  }

  static calculateScoringRatio(pointsScored: number, pointsAllowed: number) {
    return pointsScored / pointsAllowed;
  }

  static calculatePredictedWinPctDiff(predictedWinPct: number, winPct: number) {
    return predictedWinPct - winPct;
  }

  static calculateAbsoluteError(predictedWinPct: number, actualWinPct: number) {
    return Math.abs(actualWinPct - predictedWinPct);
  }

  static transformEspnClientTeamListToTeamList(team: EspnClientFootballTeam): FootballTeam {
    const scoringRatio = FantasyFootballService.calculateScoringRatio(team.record.overall.pointsFor, team.record.overall.pointsAgainst);
    const predictedWinPct = FantasyFootballService.calculatePredictedWinPct(
      team.record.overall.pointsFor,
      team.record.overall.pointsAgainst,
      2
    );
    const predictedWinPctDiff = FantasyFootballService.calculatePredictedWinPctDiff(predictedWinPct, team.record.overall.percentage);
    const roster = team.roster.entries.map(p => FantasyFootballService.transformEspnClientTeamPlayerToFootballPlayer(p));
    const absoluteError = FantasyFootballService.calculateAbsoluteError(predictedWinPct, team.record.overall.percentage);
    return {
      id: team.id.toString(),
      name: `${team.location} ${team.nickname}`,
      abbrev: team.abbrev,
      logo: team.logo,
      wins: team.record.overall.wins,
      losses: team.record.overall.losses,
      ties: team.record.overall.ties,
      winPct: team.record.overall.percentage,
      pointsAgainst: team.record.overall.pointsAgainst,
      pointsScored: team.record.overall.pointsFor,
      currentRank: team.playoffSeed,
      scoringRatio,
      predictedWinPct,
      predictedWinPctDiff,
      absoluteError,
      predictedWins: null,
      roster,
    };
  }

  static transformEspnClientFreeAgentToFootballPlayer(data: EspnClientFreeAgentEntry[]): FootballPlayerFreeAgent[] {
    return data.map(p => {
      if (!exists(p)) {
        throw new Error('player must be defined');
      }

      const team = NFL_TEAM_MAP[p.player.proTeamId];
      const isDST = p.player.defaultPositionId === 16;

      const stats = flattenPlayerStats(p.player.stats);

      return {
        id: p.id.toString(),
        name: p.player.fullName,
        img: !isDST ? headshotImgBuilder(p.id, 'nfl') : logoImgBuilder(team, 'nfl'),
        team,
        teamId: p.player.proTeamId.toString(),
        teamUid: `s:20~l:28~t:${p.player.proTeamId}`,
        position: NFL_POSITION_MAP[p.player.defaultPositionId].abbrev,
        defaultPositionId: p.player.defaultPositionId,
        isInjured: p.player.injured,
        injuryStatus: p.player.injuryStatus,
        lineupSlotId: p.player.defaultPositionId,
        lineupSlot: NFL_LINEUP_MAP[p.player.defaultPositionId].abbrev,
        points: 0, // p.player.appliedStatTotal,
        stats,
      };
    });
  }
  // static transformTeamImportToFantasyTeam(teamImport: EspnClientTeam): FantasyTeam {
  //   return {
  //     id: teamImport.id.toString(),
  //     name: `${teamImport.location} ${teamImport.nickname}`,
  //     logo: teamImport.logo,
  //     record: `${teamImport.record.overall.wins}-${teamImport.record.overall.ties}-${teamImport.record.overall.losses}`,
  //   };
  // }

  constructor(private espnClient: EspnService) {}

  static transformEspnClientLeagueToFootballLeague(espnLeague: EspnClientLeague) {
    return {}; // espnLeague;
  }

  /**
   * Return fantasy football league
   * @param leagueId
   * @param year
   * @returns
   */
  footballLeague(leagueId: string, year: string): Observable<FantasyFootballLeague> {
    return this.espnClient.espnFantasyLeagueBySport<EspnClientFootballLeague>({ sport: FantasySports.Football, leagueId, year }).pipe(
      map(res => {
        const teams = []; // res.teams.map(t => FantasyFootballService.transformEspnClientTeamListToTeamList(t));
        const schedule = res.schedule;
        const seasonId = res.seasonId.toString();

        const currentScoringPeriodId = res.scoringPeriodId;

        const settings = res.settings;

        const firstScoringPeriodId = res.status.firstScoringPeriod;
        const finalScoringPeriodId = res.status.finalScoringPeriod;
        const matchupPeriodCount = res.settings.scheduleSettings.matchupPeriodCount;
        const leagueId = res.id.toString();

        return {
          leagueId,
          seasonId,
          currentScoringPeriodId,
          firstScoringPeriodId,
          finalScoringPeriodId,
          matchupPeriodCount,
          teams,
          schedule,
          settings,
          freeAgents: FantasyFootballService.transformEspnClientFreeAgentToFootballPlayer(res.players),
        };
      })
    );
  }

  /**
   * Return fantasy football league free agents
   * @param payload
   * @returns
   */
  footballFreeAgents(payload: { leagueId: string; scoringPeriodId: number; filter: PaginatedFilter | null }) {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.espnClient
      .espnFantasyFreeAgentsBySport(FantasySports.Football, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyFootballService.transformEspnClientFreeAgentToFootballPlayer(res.players)));
  }
}
