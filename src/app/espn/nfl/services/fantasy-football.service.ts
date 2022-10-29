import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { flattenPlayerStats } from '@app/espn/espn-helpers';
import { headshotImgBuilder, logoImgBuilder } from '@app/espn/espn.const';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import {
  EspnClientFootballLeague,
  EspnClientFootballTeam,
  EspnClientFreeAgentEntry,
  EspnClientLeague,
  EspnClientPaginatedFilter,
  EspnClientPlayer,
  EspnClientPlayerOutlooksMap,
} from '@espnClient/espn-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FOOTBALL_LINEUP_SLOT_MAP } from '../consts/lineup.const';
import { NFL_POSITION_MAP } from '../consts/position.const';
import { NFL_TEAM_MAP } from '../consts/team.const';
import { FantasyFootballLeague } from '../models/fantasy-football-league.model';
import { FootballPlayer, FootballPlayerFreeAgent } from '../models/football-player.model';
import { FootballTeam } from '../models/football-team.model';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballService {
  static transformOutlook(outlooks?: EspnClientPlayerOutlooksMap) {
    if (!exists(outlooks)) {
      return [];
    }

    if (!exists(outlooks.outlooksByWeek)) {
      return [];
    }

    const weeklyOutlook = outlooks.outlooksByWeek;

    return Object.keys(outlooks.outlooksByWeek)
      .map(k => {
        return {
          week: Number(k),
          outlook: weeklyOutlook[k],
        };
      })
      .sort((a, b) => b.week - a.week);
  }

  static transformEspnClientTeamPlayerToFootballPlayer(player: EspnClientPlayer): FootballPlayer {
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }

    const team = NFL_TEAM_MAP[player.playerPoolEntry.player.proTeamId];
    const isDST = player.playerPoolEntry.player.defaultPositionId === 16;
    const stats = flattenPlayerStats(player.playerPoolEntry.player.stats);
    const extendedStats = null;

    const { lineupSlotId } = player;
    const { percentOwned, percentChange, percentStarted } = player.playerPoolEntry.player.ownership;
    const { defaultPositionId, injuryStatus, outlooks } = player.playerPoolEntry.player;

    const outlookByWeek = FantasyFootballService.transformOutlook(outlooks);

    return {
      team,
      lineupSlotId,
      injuryStatus,
      defaultPositionId,
      percentChange,
      percentOwned,
      percentStarted,
      stats,
      extendedStats,
      outlookByWeek,
      id: player.playerId.toString(),
      name: player.playerPoolEntry.player.fullName,
      img: !isDST ? headshotImgBuilder(player.playerId, 'nfl') : logoImgBuilder(team, 'nfl'),
      teamId: player.playerPoolEntry.player.proTeamId.toString(),
      teamUid: `s:20~l:28~t:${player.playerPoolEntry?.player.proTeamId}`,
      position: NFL_POSITION_MAP[player.playerPoolEntry.player.defaultPositionId].abbrev,
      isInjured: player.playerPoolEntry.player.injured,
      lineupSlot: FOOTBALL_LINEUP_SLOT_MAP[player.lineupSlotId].abbrev,
      points: player.playerPoolEntry.appliedStatTotal,
    };
  }

  static transformEspnClientScheduleTeamListToTeamList(data: any[]) {
    return [];
  }

  static calculatePredictedWinPct(pointsScored: number, pointsAllowed: number, exp: number) {
    const R = pointsScored / pointsAllowed;

    if (pointsScored === 0 || pointsAllowed == 0) {
      return 0;
    }

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
    const roster = team.roster.entries.map(p => FantasyFootballService.transformEspnClientTeamPlayerToFootballPlayer(p));
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
      const extendedStats = null;

      const stats = flattenPlayerStats(p.player.stats);

      const { percentChange, percentOwned, percentStarted } = p.player.ownership;

      const outlookByWeek = FantasyFootballService.transformOutlook(p.player.outlooks);

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
        lineupSlot: FOOTBALL_LINEUP_SLOT_MAP[p.player.defaultPositionId].abbrev,
        points: 0, // p.player.appliedStatTotal,
        percentChange,
        percentOwned,
        percentStarted,
        stats,
        extendedStats,
        outlookByWeek,
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
    let headers = new HttpHeaders();

    // headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.espnClient
      .espnFantasyLeagueBySport<EspnClientFootballLeague>({ sport: FantasySports.Football, leagueId, year, headers })
      .pipe(
        map(res => {
          const { schedule, transactions, settings } = res;

          const teams = res.teams.map(t => FantasyFootballService.transformEspnClientTeamListToTeamList(t));
          const seasonId = res.seasonId.toString();

          const currentScoringPeriodId = res.scoringPeriodId;

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
            transactions,
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
  footballFreeAgents(payload: { leagueId: string; scoringPeriodId: number; filter: EspnClientPaginatedFilter | null }) {
    let headers = new HttpHeaders();
    headers = headers.append('X-Fantasy-Filter', JSON.stringify(payload.filter));
    headers = headers.append('X-Fantasy-Platform', 'kona-PROD-c4559dd8257df5bff411b011384d90d4d60fbafa');

    return this.espnClient
      .espnFantasyFreeAgentsBySport(FantasySports.Football, payload.leagueId, payload.scoringPeriodId, headers)
      .pipe(map(res => FantasyFootballService.transformEspnClientFreeAgentToFootballPlayer(res.players)));
  }
}
