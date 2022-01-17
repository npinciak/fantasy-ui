import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import { MLBClientSlateAttrTeam } from '../mlb/models/mlb-client.model';
import { SlateAttributes } from '../models/daily-fantasy-client-slate-sttr.model';
import { SlateMaster } from '../models/daily-fantasy-client.model';
import { NBAClientPlayerAttributes, NBAClientSlateAttrTeam } from '../nba/models/nba-client.model';
import { NFLClientPlayerAttributes, NFLClientSlateAttrTeam, NFLClientStatGroup } from '../nfl/models/nfl-client.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  constructor(private apiService: ApiService) {}

  static isNFL(team: SlateTeamAttributes): team is NFLClientSlateAttrTeam {
    return 'safpts' in team;
  }

  static isNFLStatGroup(statGroup: SlateStatGroups): statGroup is NFLClientStatGroup {
    return 'qb' in statGroup;
  }

  static isNFLPlayer(player: SlatePlayerAttributes): player is NFLClientPlayerAttributes {
    return 'ecr' in player;
  }

  static isNBA(team: SlateTeamAttributes): team is NBAClientSlateAttrTeam {
    return 'rest' in team;
  }

  static isNBAPlayer(player: SlatePlayerAttributes): player is NBAClientPlayerAttributes {
    return 'dvp' in player;
  }

  static transform(teamAttributes: SlateTeamAttributes) {
    if (SlateService.isNFL(teamAttributes)) {
      return {
        safpts: teamAttributes.safpts,
        outsiders: teamAttributes.outsiders,
      };
    }

    if (SlateService.isNBA(teamAttributes)) {
      return {
        rest: teamAttributes.rest,
      };
    }
  }

  static transformStatGroups(statGroup: SlateStatGroups) {
    if (SlateService.isNFLStatGroup(statGroup)) {
      return {
        ...(statGroup ?? null),
      };
    }
  }

  static transformTeamSlateAttributes(teams: SlateTeamAttributesMap) {
    return Object.entries(teams).map(([id, team]) => ({
      id,
      vegas: team.vegas,
      outsiders: SlateService.transform(team).outsiders ?? null,
      safpts: SlateService.transform(team).safpts ?? null,
      rest: SlateService.transform(team).rest ?? null,
    }));
  }

  static transformStatGroupSlateAttributes(statGroup: NFLClientStatGroup) {
    return SlateService.transformStatGroups(statGroup);
  }

  static transformPlayerSlateAttributes(players: SlatePlayerAttributesMap) {
    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff ?? null,
      slateOwn: player.slate_ownership ?? null,
      ownership: player.ownership ?? null,
      value: player.value_pct ?? null,
      smash: player.smash_pct ?? null,
      ecr: SlateService.isNFLPlayer(player) ?? null,
      dvp: SlateService.isNBAPlayer(player) ?? null,
    }));
  }

  slatesByDate(request: { sport: string }): Observable<SlateMaster> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);
    return this.apiService.get<SlateMaster>(endpoint.slateMaster);
  }

  getGameAttrBySlateId(request: {
    sport: string;
    site: string;
    slateId: string;
  }): Observable<{ teams: SlateTeamAttributes[]; players: any[] }> {
    const endpoint = new DailyFantasyEndpointBuilder(request.sport);

    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slateId);
    return this.apiService.get<SlateAttributes>(endpoint.slateAttr, { params }).pipe(
      map(res => ({
        teams: SlateService.transformTeamSlateAttributes(res.teams),
        statGroups: SlateService.transformStatGroupSlateAttributes(res.stat_groups),
        players: SlateService.transformPlayerSlateAttributes(res.players),
      }))
    );
  }
}

type SlateTeamAttributes = NFLClientSlateAttrTeam | MLBClientSlateAttrTeam | NBAClientSlateAttrTeam | null | undefined;
type SlateTeamAttributesMap = Record<string, SlateTeamAttributes>;

type SlateStatGroups = NFLClientStatGroup | null | undefined;

type SlatePlayerAttributes = NFLClientPlayerAttributes | NBAClientPlayerAttributes | null | undefined;
type SlatePlayerAttributesMap = Record<string, SlatePlayerAttributes>;
