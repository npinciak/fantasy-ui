import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { DfsSlatePlayer } from '@app/dfs/mlb/models/dfsPlayer.interface';
import { SlateAttributes } from '@app/dfs/mlb/models/slate.interface';
import { DfsSlate, SlateMaster } from '@app/dfs/mlb/models/slateMaster.interface';
import { SiteSlateConfig } from '@app/dfs/mlb/models/slateSettings.interface';
import { Player } from '@app/dfs/models/player.model';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DfsUrlBuilder } from '../class/url-builder.class';
import { GridIronPlayer } from '../models/nfl-gridiron.model';
import { NFLClientSlateAttributes } from '../models/nfl-slate-attr.model';

@Injectable({
  providedIn: 'root',
})
export class DfsService {
  private API = new DfsUrlBuilder('nfl');

  constructor(private apiService: ApiService) {}

  fetchRoto = (sport: string, site: string, slate: DfsSlate) => {
    const $players = this.getPlayersBySlate(slate.slate_path);
    const $games = this.getGameAttrBySlateId(sport, site, slate.importId);
    return forkJoin([$players, $games]);
  };

  getPlayersBySlate(slatePath) {
    return this.apiService.get<DfsSlatePlayer[]>(slatePath, { params: this.httpParams });
  }

  getGameAttrBySlateId(sport: string, site: string, slateId: string) {
    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('timestamp', (+new Date()).toString());
    params = params.append('site', site ?? 'draftkings');
    params = params.append('slate_id', slateId);
    return this.apiService.get<NFLClientSlateAttributes>(this.API.slateAttr, {
      params,
    });
  }

  getSlatesByDate(site: string, sport: string) {
    return this.apiService.get<SlateMaster>(this.API.slateMaster);
  }

  getGridIronPlayers(site: string) {
    let params = new HttpParams();
    params = params.append('site', site ?? 'draftkings');
    return this.apiService.get<GridIronPlayer[]>(this.API.gridIron, { params });
  }

  // https://www.playerprofiler.com/api/v1/player/KO-0725(<player_id>)
  // https://www.playerprofiler.com/api/v1/players

  private get httpParams() {
    let params = new HttpParams();
    params = params.append('timestamp', `${+new Date()}`);
    return params;
  }
}
