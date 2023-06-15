import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { espnDateFormatter } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { SlateMasterMap } from '@dfsClient/daily-fantasy-client.model';
import { ClientSlateAttributes } from '@sports-ui/daily-fantasy-sdk/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-endpoint-builder';
import { SlatePlayer } from '../models/slate-player.model';
import { SlateTeam } from '../models/slate-team.model';
import { PlayerProfilerSeasonMap } from '../nfl/models/nfl-profiler.model';
import { DfsSlateTransformers } from '../transformers/dfs-transformers.m';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  private endpointBuilder: DailyFantasyEndpointBuilder;

  constructor(private apiService: ApiService) {
    this.endpointBuilder = new DailyFantasyEndpointBuilder();
  }

  slatesByDate({ sport }: { sport: string }): Observable<SlateMasterMap> {
    this.endpointBuilder.sport = sport;
    return this.apiService.get<SlateMasterMap>(this.endpointBuilder.slateMaster);
  }

  getGameAttrBySlateId(request: { sport: string; site: string; slate: string }): Observable<SlateAttributes> {
    this.endpointBuilder.sport = request.sport;

    let params = new HttpParams();
    params = params.append('date', espnDateFormatter({ delim: '-', date: new Date().getTime() }));
    params = params.append('site', request.site);
    params = params.append('slate_id', request.slate);
    return this.apiService.get<ClientSlateAttributes>(this.endpointBuilder.slateAttr, { params }).pipe(
      map(res => ({
        teams: DfsSlateTransformers.transformTeamSlateAttributes(res.teams),
        statGroups: DfsSlateTransformers.transformStatGroupsToProfiler(res?.stat_groups),
        players: DfsSlateTransformers.transformPlayerSlateAttributes(res.players, request.site),
        // weather: DfsSlateTransformers.transformWeather(res.games),
      }))
    );
  }
}

type SlateAttributes = {
  teams: SlateTeam[];
  players: SlatePlayer[];
  statGroups: PlayerProfilerSeasonMap | null;
  // weather: Weather[];
};

type DfsQueryParamAttributes = 'date' | 'site' | 'slate_id';
