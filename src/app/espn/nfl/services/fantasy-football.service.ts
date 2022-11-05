import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { flattenPlayerStats, transformIdToUid } from '@app/espn/espn-helpers';
import { headshotImgBuilder, logoImgBuilder } from '@app/espn/espn.const';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { EspnService } from '@app/espn/service/espn.service';
import {
  EspnClientFootballLeague,
  EspnClientFootballTeam,
  EspnClientFreeAgentEntry,
  EspnClientPaginatedFilter,
  EspnClientPlayer,
  EspnClientPlayerInfo,
  EspnClientPlayerOutlooksMap,
  EspnClientPlayerStatsByYearMap,
  EspnLeagueId,
  EspnPlayerInjuryStatus,
  EspnSport,
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
    const weeklyOutlook = outlooks?.outlooksByWeek;

    if (!exists(weeklyOutlook)) {
      return [];
    }

    return Object.keys(weeklyOutlook)
      .map(k => {
        return {
          week: Number(k),
          outlook: weeklyOutlook[k],
        };
      })
      .sort((a, b) => b.week - a.week);
  }

  static testTransform(playerInfo: EspnClientPlayerInfo): {
    id: string;
    name: string;
    teamId: string;
    teamUid: string;
    position: string;
    injured: boolean;
    team: string;
    isDST: boolean;
    injuryStatus: EspnPlayerInjuryStatus;
    defaultPositionId: number;
    percentOwned: number;
    percentChange: number;
    percentStarted: number;
    stats: EspnClientPlayerStatsByYearMap | null;
    outlookByWeek: {
      week: number;
      outlook: string;
    }[];
  } {
    const { defaultPositionId, injuryStatus, injured, outlooks, id } = playerInfo;

    const { percentOwned, percentChange, percentStarted } = playerInfo.ownership;

    const team = NFL_TEAM_MAP[playerInfo.proTeamId] as string;
    const stats = flattenPlayerStats(playerInfo.stats);

    const isDST = playerInfo.defaultPositionId === 16;

    const outlookByWeek = FantasyFootballService.transformOutlook(outlooks);

    return {
      id: id.toString(),
      name: playerInfo.fullName,
      teamId: playerInfo.proTeamId.toString(),
      teamUid: transformIdToUid(EspnSport.Football, EspnLeagueId.NFL, playerInfo.proTeamId),
      position: NFL_POSITION_MAP[playerInfo.defaultPositionId].abbrev,
      injured,
      stats,
      team,
      isDST,
      injuryStatus,
      defaultPositionId,
      outlookByWeek,
      percentOwned,
      percentChange,
      percentStarted,
    };
  }

  static transformEspnClientTeamPlayerToFootballPlayer(player: EspnClientPlayer): FootballPlayer {
    if (!exists(player.playerPoolEntry)) {
      throw new Error('player.playerPoolEntry must be defined');
    }

    const { lineupSlotId } = player;

    const playerInfo = FantasyFootballService.testTransform(player.playerPoolEntry.player);

    return {
      ...playerInfo,
      lineupSlotId,
      img: !playerInfo.isDST ? headshotImgBuilder(player.playerId, { league: 'nfl' }) : logoImgBuilder(playerInfo.team, 'nfl'),
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

    const { abbrev, logo } = team;
    const { wins, losses, ties, pointsAgainst } = team.record.overall;

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
      winPct: team.record.overall.percentage,
      pointsScored: team.record.overall.pointsFor,
      currentRank: team.playoffSeed,
    };
  }

  static transformEspnClientFreeAgentToFootballPlayer(data: EspnClientFreeAgentEntry[]): FootballPlayerFreeAgent[] {
    return data.map(p => {
      if (!exists(p)) {
        throw new Error('player must be defined');
      }

      const playerInfo = FantasyFootballService.testTransform(p.player);

      return {
        ...playerInfo,
        img: !playerInfo.isDST ? headshotImgBuilder(p.id, { league: 'nfl' }) : logoImgBuilder(playerInfo.team, 'nfl'),
        lineupSlotId: playerInfo.defaultPositionId,
        lineupSlot: FOOTBALL_LINEUP_SLOT_MAP[playerInfo.defaultPositionId].abbrev,
        points: 0, // p.player.appliedStatTotal,
      };
    });
  }

  constructor(private espnClient: EspnService) {}

  /**
   * Return fantasy football league
   * @param leagueId
   * @param year
   * @returns
   */
  footballLeague(leagueId: string, year: string): Observable<FantasyFootballLeague> {
    return this.espnClient.espnFantasyLeagueBySport<EspnClientFootballLeague>({ sport: FantasySports.Football, leagueId, year }).pipe(
      map(res => {
        const { schedule, transactions, settings } = res;

        const teams = res.teams.map(t => FantasyFootballService.transformEspnClientTeamListToTeamList(t));

        const { matchupPeriodCount } = settings.scheduleSettings;

        const seasonId = res.seasonId.toString();
        const leagueId = res.id.toString();

        const currentScoringPeriodId = res.scoringPeriodId;

        const firstScoringPeriodId = res.status.firstScoringPeriod;
        const finalScoringPeriodId = res.status.finalScoringPeriod;

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
