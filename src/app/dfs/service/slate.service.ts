import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { exists, normalizeStringToNumber, objectIsEmpty } from '@app/@shared/helpers/utils';
import { ApiService } from '@app/@shared/services/api.service';
import { SlateMasterMap } from '@dfsClient/daily-fantasy-client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DfsSiteToDfsSiteTypeMap } from 'sports-ui-sdk/lib/lib/dfs/site.const';
import {
  ClientSlateAttributes,
  ClientSlatePlayerAttributesMap,
  ClientSlateStatGroups,
  ClientSlateTeamAttributes,
  ClientSlateTeamAttributesMap,
} from '../../../dfs-client-models/daily-fantasy-client-slate-attr.model';
import { MLBClientTeamAttributes } from '../../../dfs-client-models/mlb-client.model';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-endpoint-builder';
import { SlatePlayer } from '../models/slate-player.model';
import { SlateTeam } from '../models/slate-team.model';
import { PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { DfsSlateHelpers } from '../slate.helpers';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  private endpointBuilder: DailyFantasyEndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpointBuilder = new DailyFantasyEndpointBuilder();
  }

  static transformNbaSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes) {
    console.log(teamAttributes);

    return null;
  }

  static transformNflSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes) {
    console.log(teamAttributes);

    return null;
  }

  static transformMlbSlateTeamAttributes(teamAttributes: ClientSlateTeamAttributes, site: string): MLBClientTeamAttributes {
    const obj = {} as MLBClientTeamAttributes;

    for (const prop in teamAttributes) {
      switch (prop) {
        case 'pitcher':
        case 'vegas':
          obj[prop] = teamAttributes[prop];
          break;
        default:
          obj[prop] = normalizeStringToNumber(teamAttributes[prop][site]);
          break;
      }
    }

    return obj;
  }

  static transformTeamSlateAttributes(teams: ClientSlateTeamAttributesMap) {
    if (objectIsEmpty(teams)) {
      return [];
    }

    return Object.entries(teams).map(([id, team]) => {
      const { vegas, outsiders, safpts } = DfsSlateHelpers.normalizeSlateTeamAttributes(team);
      return { id, vegas, outsiders, safpts };
    });
  }

  static transformStatGroupsToProfiler(statGroup: ClientSlateStatGroups): PlayerProfilerSeasonMap | null {
    // console.log('transformStatGroupsToProfiler', statGroup);
    if (objectIsEmpty(statGroup) || !exists(statGroup)) {
      return null;
    }

    // const qb = DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup.qb);
    // const rb = DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup.rb);
    // const wr = DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup.wr);
    // const te = DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup.te);

    return DfsSlateHelpers.normalizeStatGroupToProfiler(statGroup);
  }

  static transformPlayerSlateAttributes(players: ClientSlatePlayerAttributesMap, site: string): SlatePlayer[] {
    if (objectIsEmpty(players)) {
      return [];
    }

    const siteMap = DfsSiteToDfsSiteTypeMap[site];

    return Object.entries(players).map(([id, player]) => ({
      id,
      statGroup: player.stat_group ?? null,
      salaryDiff: player.salary_diff?.[siteMap] ?? null,
      slateOwn: player.slate_ownership?.[siteMap] ?? null,
      ownership: normalizeStringToNumber(player.ownership?.[siteMap]) ?? null,
      value: normalizeStringToNumber(player.value_pct?.[siteMap]) ?? null,
      smash: normalizeStringToNumber(player.smash_pct?.[siteMap]) ?? null,
    }));
  }

  slatesByDate(request: { sport: string }): Observable<SlateMasterMap> {
    this.endpointBuilder.sport = request.sport;
    return this.apiService.get<SlateMasterMap>(this.endpointBuilder.slateMaster);
  }

  getGameAttrBySlateId(request: { sport: string; site: string; slate: string }): Observable<SlateAttributes> {
    this.endpointBuilder.sport = request.sport;

    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slate);
    return this.apiService.get<ClientSlateAttributes>(this.endpointBuilder.slateAttr, { params }).pipe(
      map(res => ({
        teams: SlateService.transformTeamSlateAttributes(res.teams),
        statGroups: SlateService.transformStatGroupsToProfiler(res?.stat_groups),
        players: SlateService.transformPlayerSlateAttributes(res.players, request.site),
      }))
    );
  }
}

type SlateAttributes = {
  teams: SlateTeam[];
  players: SlatePlayer[];
  statGroups: PlayerProfilerSeasonMap | null;
};

type DfsQueryParamAttributes = 'date' | 'site' | 'slate_id';
